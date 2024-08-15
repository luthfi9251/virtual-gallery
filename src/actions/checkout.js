"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { serverResponseFormat } from "@/lib/utils";
import { URL_TANART } from "@/variables/url";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export const getCheckoutPageData = async (pameranId, karyaId) => {
    try {
        let session = await auth();
        if (!session.user) {
            throw new Error("Sesi anda telah habis!");
        }

        //lakukan pengecekan sebelum bisa checkout

        let karyaInformation = await prisma.Karya.findUnique({
            where: {
                id: karyaId,
                checkoutHistory: {
                    none: {
                        status: {
                            in: ["SUCCESS", "PENDING", "VALIDATING"],
                        },
                    },
                },
                status: {
                    not: "TERJUAL",
                },
            },
            select: {
                judul: true,
                lukisan_url: true,
                aliran: true,
                media: true,
                teknik: true,
                harga: true,
                panjang: true,
                lebar: true,
                created_at: true,
                Seniman: {
                    select: {
                        User: {
                            select: {
                                nama_lengkap: true,
                                email: true,
                            },
                        },
                    },
                },
                KaryaPameran: {
                    where: {
                        Pameran: {
                            id: pameranId,
                        },
                    },
                    select: {
                        Pameran: {
                            select: {
                                nama_pameran: true,
                            },
                        },
                    },
                },
            },
        });

        if (!karyaInformation) {
            throw new Error(
                "Maaf anda tidak dapat melakukan pemelian pada karya ini"
            );
        }

        let dataResponse = {
            dataKarya: {
                judul: karyaInformation.judul,
                lukisan_url: karyaInformation.lukisan_url,
                aliran: karyaInformation.aliran,
                media: karyaInformation.media,
                teknik: karyaInformation.teknik,
                harga: parseInt(karyaInformation.harga),
                dimensi: `${karyaInformation.panjang} x ${karyaInformation.lebar} cm`,
                nama_seniman: karyaInformation.Seniman.User.nama_lengkap,
                tahun: new Date(karyaInformation.created_at).getFullYear(),
            },
            dataPameran: {
                nama_pameran:
                    karyaInformation.KaryaPameran[0].Pameran.nama_pameran,
            },
            dataUser: {
                email: session.user.email,
                nama_lengkap: session.user.nama_lengkap,
            },
        };
        return serverResponseFormat(dataResponse, false, null);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

export const checkoutKarya = async (data) => {
    let { id_karya, id_pameran, no_whatsapp } = data;
    /**
     * Algoritma Checkout
     *
     * Chekout tidak bergantung dengan tabel KurasiKarya
     * Langkah-langkah:
     *  1. Cek apakah sudah adad record pada tabel CheckoutHistory yang masih berjalan
     *  2. Jika tidak ada maka lanjut ke langkah selanjutnya, jika ada maka akan ditampilkan error
     *  3. Compute expired Date sesuai dengan waktu yang telah ditentukan
     *  4. Masukkan kedalam database
     */
    try {
        let session = await auth();
        if (!session.user) {
            throw new Error("Sesi anda telah habis!");
        }

        // Step 1 : mengecek karya

        let isAlreadyChekout = await prisma.CheckoutHistory.findFirst({
            where: {
                expiredDate: {
                    gte: dayjs().toISOString(),
                },
                Pameran: {
                    id: id_pameran,
                },
                Karya: {
                    id: id_karya,
                },
                status: {
                    in: ["SUCCESS", "PENDING", "VALIDATING"],
                },
            },
            select: {
                id: true,
            },
        });

        if (isAlreadyChekout) {
            throw new Error("Maaf, Karya sedang dalam transaksi lain!");
        }

        // Step 3 : compute Expire Date
        let createdAt = dayjs();
        let expiredDateCompute = createdAt.add(3, "day");

        let createCheckoutOrder = prisma.CheckoutHistory.create({
            data: {
                Pameran: {
                    connect: {
                        id: id_pameran,
                    },
                },
                Karya: {
                    connect: {
                        id: id_karya,
                    },
                },
                expiredDate: expiredDateCompute.toISOString(),
                created_at: createdAt.toISOString(),
                Buyer: {
                    connect: {
                        id: session.user.id,
                    },
                },
                status: "PENDING",
            },
        });

        let updateProfile = prisma.User.update({
            where: {
                id: session.user.id,
            },
            data: {
                Profile: {
                    upsert: {
                        create: {
                            no_whatsapp: no_whatsapp,
                        },
                        update: {
                            no_whatsapp: no_whatsapp,
                        },
                    },
                },
            },
        });

        await Promise.all([createCheckoutOrder, updateProfile]);
        revalidatePath(URL_TANART.USER_STATUS_PEMBAYARAN);
        return serverResponseFormat("Order Berhasil", false, null);
    } catch (err) {
        console.log(err.message);
        return serverResponseFormat(null, true, err.message);
    }
};

export const getStatusPembayaranAll = async () => {
    /**
     *  Endpoint akan digunakan untuk menampilkan status pembayaran user naumun pada tabel
     *  Hal yang akan terjadi:
     * 1. Update status menjaddi Expired jika gagal membayar sesuai expired date
     *
     * algoritma
     * 1. Get semua data checkout user
     * 2. Check semua record yang ada dan bandingkan waktu dengan waktu expired
     * 3. Jika ada data yang EXPIRED, maka data tersebut akan diupdate pada database
     * 4. Kembalikan data yang telah dicompute
     *
     *
     */
    try {
        let session = await auth();
        if (!session.user) {
            throw new Error("Sesi anda telah habis!");
        }

        // Step 1
        let checkoutData = await prisma.CheckoutHistory.findMany({
            orderBy: {
                created_at: "desc",
            },
            where: {
                Buyer: {
                    id: session.user.id,
                },
            },
            include: {
                Buyer: true,
                Karya: true,
                Pameran: true,
                PaymentDetails: true,
            },
        });

        // Step 2
        let updateTagId = [];
        let responseData = [];
        let todayDate = dayjs();
        if (checkoutData) {
            checkoutData.forEach((item) => {
                item.Karya.harga = parseInt(item.Karya.harga);
                let currDateData = dayjs(item.expiredDate);
                if (
                    todayDate.isAfter(currDateData) &&
                    item.status === "PENDING"
                ) {
                    updateTagId.push(item.id);
                    item.status = "EXPIRED";
                }
                responseData.push(item);
            });
        }

        // Step 3
        let updateExpired = await prisma.CheckoutHistory.updateMany({
            where: {
                id: {
                    in: updateTagId,
                },
            },
            data: {
                status: "EXPIRED",
            },
        });
        return serverResponseFormat(responseData, false, null);
    } catch (err) {
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};

export const getDataBayarPage = async (chekoutId) => {
    try {
        let session = await auth();
        if (!session.user) {
            throw new Error("Sesi anda telah habis!");
        }

        // Step 1
        let checkoutData = await prisma.CheckoutHistory.findUnique({
            where: {
                id: parseInt(chekoutId),
            },
            include: {
                Buyer: true,
                Karya: true,
                Pameran: {
                    select: {
                        nama_pameran: true,
                        Seniman: {
                            select: {
                                User: {
                                    select: {
                                        nama_lengkap: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        // Step 2

        if (checkoutData) {
            let todayDate = dayjs();
            let currDateData = dayjs(checkoutData.expiredDate);

            if (checkoutData.status === "PENDING") {
                if (todayDate.isBefore(currDateData)) {
                    return serverResponseFormat(checkoutData, false, null);
                } else {
                    // Step 3
                    await prisma.CheckoutHistory.update({
                        where: {
                            id: parseInt(chekoutId),
                        },
                        data: {
                            status: "EXPIRED",
                        },
                    });
                }
            }
        }
        throw new Error(
            "Tidak dapat melakukan pembayaran karena Invoice sudah tidak berlaku!"
        );
    } catch (err) {
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};

export const bayarTagihanCheckout = async (formData) => {
    try {
        /**
         * Pada pembayaran akan diberi tambahan waktu sebesar 5 menit dari expired time
         *
         * 1. Cek expired time + 5 menit
         * 2. Insert database
         *
         */

        let session = await auth();
        if (!session.user) {
            throw new Error("Sesi anda telah habis!");
        }

        let checkoutId = formData.get("checkoutId");

        // Step 1
        let checkoutData = await prisma.CheckoutHistory.findUnique({
            where: {
                id: parseInt(checkoutId),
            },
            select: {
                id: true,
                expiredDate: true,
                status: true,
            },
        });

        if (checkoutData) {
            let todayDate = dayjs();
            let expDateExtended = dayjs(checkoutData.expiredDate).add(
                5,
                "minute"
            );

            if (checkoutData.status === "PENDING") {
                if (todayDate.isBefore(expDateExtended)) {
                    let buktiSavedPath = await saveBuktiTransfer(
                        formData.get("bukti_transfer")
                    );

                    //bayuar disini

                    await prisma.CheckoutHistory.update({
                        where: {
                            id: parseInt(checkoutId),
                        },
                        data: {
                            status: "VALIDATING",
                            PaymentDetails: {
                                create: {
                                    nama_pemilik_rekening: formData.get(
                                        "nama_pemilik_rekening"
                                    ),
                                    bank_pengirim:
                                        formData.get("bank_pengirim"),
                                    bank_tujuan: formData.get("bank_tujuan"),
                                    bukti_transfer_url: buktiSavedPath,
                                },
                            },
                        },
                    });
                    revalidatePath(URL_TANART.USER_STATUS_PEMBAYARAN);
                    return serverResponseFormat(
                        "Berhasil menyimpan",
                        false,
                        null
                    );
                } else {
                    await prisma.CheckoutHistory.update({
                        where: {
                            id: parseInt(checkoutId),
                        },
                        data: {
                            status: "EXPIRED",
                        },
                    });
                    throw new Error(
                        "Waktu anda telah habis, silahkan hubungi Admin"
                    );
                }
            }

            throw new Error("Pembayaran anda sudah tidak pada status Pending!");
        }
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

const saveBuktiTransfer = async (file) => {
    try {
        // Generate nama file baru dengan UUID dan ekstensi asli
        let arrayBuffer = await file.arrayBuffer();
        let buffer = new Uint8Array(arrayBuffer);

        const newFileName = `${uuidv4()}${path.extname(file.name)}`;
        const destination = path.join(
            process.cwd(),
            "public",
            "bukti_transfer",
            newFileName
        );

        // Pindahkan file ke lokasi baru
        fs.writeFileSync(destination, buffer, "base64");

        return "/api/bukti_transfer/" + newFileName;
    } catch (error) {
        console.error("Error saving file:", error);
        return null;
    }
};

export const getAllCheckoutHistoryData = async () => {
    try {
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }

        let allCheckoutHistory = await prisma.PaymentDetails.findMany({
            orderBy: {
                created_at: "desc",
            },
            include: {
                Checkout: {
                    select: {
                        id: true,
                        status: true,
                        updated_at: true,
                        rejectionReason: true,
                        Buyer: {
                            select: {
                                nama_lengkap: true,
                                username: true,
                                Profile: {
                                    select: {
                                        no_whatsapp: true,
                                    },
                                },
                            },
                        },
                        Pameran: {
                            select: {
                                nama_pameran: true,
                            },
                        },
                        Karya: {
                            select: {
                                judul: true,
                                harga: true,
                                Seniman: {
                                    select: {
                                        User: {
                                            select: {
                                                nama_lengkap: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        let mappedData = allCheckoutHistory.map((item) => {
            return {
                no_invoice: item.Checkout.id,
                nama_pembeli: item.Checkout.Buyer.nama_lengkap,
                judul_karya: item.Checkout.Karya.judul,
                tgl_bayar: dayjs(item.created_at)
                    .locale("id")
                    .format("DD/MM/YYYY HH:mm:ss"),
                status: item.Checkout.status,
                verified_at: dayjs(item.Checkout.updated_at)
                    .locale("id")
                    .format("DD/MM/YYYY HH:mm:ss"),
                rejectionReason: item.Checkout.rejectionReason,
                dataPayment: {
                    id: item.id,
                    nama_pemilik_rekening: item.nama_pemilik_rekening,
                    bank_pengirim: item.bank_pengirim,
                    bank_tujuan: item.bank_tujuan,
                    bukti_transfer_url: item.bukti_transfer_url,
                    no_whatsapp: item.Checkout.Buyer.Profile?.no_whatsapp,
                    username: item.Checkout.Buyer.username,
                },
                dataCheckout: {
                    id: item.Checkout.id,
                    status: item.Checkout.status,
                },
                dataOrder: {
                    judul_karya: item.Checkout.Karya.judul,
                    harga: parseInt(item.Checkout.Karya.harga),
                    nama_pameran: item.Checkout.Pameran.nama_pameran,
                    nama_seniman: item.Checkout.Karya.Seniman.User.nama_lengkap,
                },
            };
        });
        return serverResponseFormat(mappedData, false, null);
    } catch (err) {
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};

export const validasiPembayaran = async (
    chekoutId,
    isApproved,
    rejectionReaseon = null
) => {
    try {
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }

        let updateCheckout = await prisma.CheckoutHistory.update({
            where: {
                id: parseInt(chekoutId),
            },
            data: {
                status: isApproved ? "SUCCESS" : "REJECTED",
                rejectionReason: isApproved ? null : rejectionReaseon,
                Karya: {
                    update: {
                        status: isApproved ? "TERJUAL" : "SELESAI",
                    },
                },
            },
        });
        revalidatePath(URL_TANART.ADMIN_VALIDASI_PEMBAYARAN);
        return serverResponseFormat("Success update checkout", false, null);
    } catch (err) {
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};
