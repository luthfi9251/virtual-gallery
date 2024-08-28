"use server";
import prisma from "@/lib/prisma";
import { uploadImageToBackend } from "./image";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { URL_TANART } from "@/variables/url";
import { serverResponseFormat } from "@/lib/utils";

export const unggahKaryaPelukis = async (formData) => {
    try {
        let session = await auth();

        if (!session.user.Seniman) {
            throw new Error("Anda tidak memiliki akun seniman!");
        }

        let imageServiceBody = new FormData();
        imageServiceBody.append("type", "thumbnail");
        imageServiceBody.append("ext", formData.get("ext"));
        imageServiceBody.append("image", formData.get("karya"));
        let upload = await uploadImageToBackend(imageServiceBody);

        if (!upload?.filename) {
            throw new Error("Gagal saat upload karya!");
        }

        let uploadKarya = await prisma.Karya.create({
            data: {
                judul: formData.get("judul"),
                deskripsi: formData.get("deskripsi"),
                aliran: formData.get("aliran"),
                media: formData.get("media"),
                teknik: formData.get("teknik"),
                panjang: formData.get("panjang"),
                lebar: formData.get("lebar"),
                status: "DIKURASI",
                lukisan_url: upload.filename,
                Seniman: {
                    connect: {
                        id: session.user.Seniman.id,
                    },
                },
            },
        });
        revalidatePath(URL_TANART.PELUKIS_KARYA);
        return uploadKarya;
    } catch (err) {
        throw err;
    }
};

export const getAllKaryaNotYetCurratedByCurrentUser = async () => {
    try {
        let session = await auth();

        let kurator_karya = await prisma.Kurator.findUnique({
            where: {
                id: session.user.Kurator.id,
            },
            select: {
                id: true,
                KurasiKarya: {
                    select: {
                        id: true,
                        Karya: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });

        let karyaIds = kurator_karya.KurasiKarya.map((item) => item.Karya.id);
        let karyaUncurrated = await prisma.Karya.findMany({
            orderBy: {
                KurasiKarya: {
                    _count: "asc",
                },
            },
            where: {
                id: {
                    not: {
                        in: karyaIds,
                    },
                },
            },
            select: {
                id: true,
                judul: true,
                deskripsi: true,
                aliran: true,
                media: true,
                teknik: true,
                harga: true,
                created_at: true,
                panjang: true,
                lebar: true,
                status: true,
                lukisan_url: true,
                _count: {
                    select: {
                        KurasiKarya: true,
                    },
                },
                Seniman: {
                    select: {
                        User: {
                            select: {
                                nama_lengkap: true,
                                foto_profil: true,
                            },
                        },
                    },
                },
            },
        });
        // console.log(karyaUncurrated);
        return karyaUncurrated.map((item) => {
            if (item._count.KurasiKarya < 3) {
                return {
                    id: item.id,
                    judul: item.judul,
                    deskripsi: item.deskripsi,
                    aliran: item.aliran,
                    media: item.media,
                    teknik: item.teknik,
                    harga: parseInt(item.harga),
                    created_at: item.created_at,
                    status: item.status,
                    lukisan_url: item.lukisan_url,
                    panjang: item.panjang + "",
                    lebar: item.lebar + "",
                    kurasi_count: item._count.KurasiKarya,
                    id_karya: item.id,
                    nama_lengkap: item.Seniman.User.nama_lengkap,
                    foto_profil: item.Seniman.User.foto_profil,
                };
            }
        });
    } catch (err) {
        throw err;
    }
};

export const getAllKaryaAlreadyCurrated = async () => {
    try {
        let session = await auth();

        if (!session.user) {
            return [];
        }

        let karya = await prisma.Karya.findMany({
            where: {},
            select: {
                id: true,
                judul: true,
                deskripsi: true,
                aliran: true,
                media: true,
                teknik: true,
                harga: true,
                created_at: true,
                panjang: true,
                lebar: true,
                status: true,
                lukisan_url: true,
                _count: {
                    select: {
                        KurasiKarya: true,
                    },
                },
                KurasiKarya: {
                    select: {
                        Kurator: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                Seniman: {
                    select: {
                        User: {
                            select: {
                                nama_lengkap: true,
                                foto_profil: true,
                            },
                        },
                    },
                },
            },
        });

        let result = karya.map((item) => {
            let data = {
                judul: item.judul,
                deskripsi: item.deskripsi,
                aliran: item.aliran,
                media: item.media,
                teknik: item.teknik,
                harga: parseInt(item.harga),
                created_at: item.created_at,
                status: item.status,
                lukisan_url: item.lukisan_url,
                panjang: item.panjang + "",
                lebar: item.lebar + "",
                kurasi_count: item._count.KurasiKarya,
                id_karya: item.id,
                nama_lengkap: item.Seniman.User.nama_lengkap,
                foto_profil: item.Seniman.User.foto_profil,
            };

            if (item._count.KurasiKarya === 3) {
                return data;
            }

            if (
                item.KurasiKarya.some(
                    (kurasi) => kurasi.Kurator.id === session.user.Kurator.id
                )
            ) {
                return data;
            }
        });
        // console.log({ result });
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getMinAndMaxHarga = async (idKarya) => {
    try {
        let kurasiKarya = await prisma.Karya.findUnique({
            where: {
                id: idKarya,
            },
            select: {
                KurasiKarya: true,
            },
        });

        let { harga_maks, harga_min } = kurasiKarya.KurasiKarya.reduce(
            (accumulator, currval) => {
                if (accumulator.harga_maks < currval.harga_maks) {
                    accumulator.harga_maks = currval.harga_maks;
                } else if (accumulator.harga_min > currval.harga_min) {
                    accumulator.harga_min = currval.harga_min;
                }
                return accumulator;
            },
            { harga_maks: 0, harga_min: 0 }
        );

        return {
            harga_maks: parseInt(harga_maks),
            harga_min: parseInt(harga_min),
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const updateKaryaSetharga = async (idKarya, harga) => {
    try {
        console.log("harga terbaca server : " + harga);
        let updateKarya = await prisma.Karya.update({
            where: {
                id: idKarya,
            },
            data: {
                harga: parseInt(harga),
                status: "SELESAI",
            },
        });
        revalidatePath(URL_TANART.PELUKIS_KARYA);
        return "Success";
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getKaryaByID = async (idKarya) => {
    try {
        let karya = await prisma.Karya.findUnique({
            where: {
                id: idKarya,
            },
            include: {
                Seniman: {
                    select: {
                        User: {
                            select: {
                                id: true,
                                nama_lengkap: true,
                                foto_profil: true,
                            },
                        },
                        id: true,
                    },
                },
            },
        });

        let mappedResponse = {
            ...karya,
            lebar: parseFloat(karya.lebar),
            panjang: parseFloat(karya.panjang),
            harga: parseInt(karya.harga),
            id_seniman: karya.Seniman.id,
            id_user: karya.Seniman.User.id,
            nama_lengkap: karya.Seniman.User.nama_lengkap,
            foto_profil: karya.Seniman.User.foto_profil,
        };
        return serverResponseFormat(mappedResponse, false, null);
    } catch (err) {
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};
