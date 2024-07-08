"use server";
import prisma from "@/lib/prisma";
import { uploadImageToBackend } from "./image";
import { auth } from "@/auth";

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
            return {
                id: item.id,
                judul: item.judul,
                deskripsi: item.deskripsi,
                aliran: item.aliran,
                media: item.media,
                teknik: item.teknik,
                harga: item.harga,
                created_at: item.created_at,
                status: item.status,
                lukisan_url: item.lukisan_url,
                panjang: item.panjang + "",
                lebar: item.lebar + "",
                id_karya: item.id,
                nama_lengkap: item.Seniman.User.nama_lengkap,
                foto_profil: item.Seniman.User.foto_profil,
            };
        });
    } catch (err) {
        throw err;
    }
};
