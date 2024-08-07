"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { serverResponseFormat } from "@/lib/utils";
import { URL_TANART } from "@/variables/url";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

export const getCheckoutPageData = async (pameranId, karyaId) => {
    try {
        let session = await auth();
        if (!session.user) {
            throw new Error("Sesi anda telah habis!");
        }

        let karyaInformation = await prisma.Karya.findUnique({
            where: {
                id: karyaId,
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
        let expiredDateCompute = createdAt.add(30, "minute");

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
            },
        });

        // Step 2
        let updateTagId = [];
        let responseData = [];
        let todayDate = dayjs();
        if (checkoutData) {
            checkoutData.forEach((item) => {
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
        let shouldUpdate = false;

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
