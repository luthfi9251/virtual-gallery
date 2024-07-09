"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const getAllKaryaCurrentPelukis = async () => {
    try {
        let session = await auth();
        let karyaPelukis = await prisma.Seniman.findUnique({
            where: {
                id: session.user.Seniman.id,
            },
            select: {
                Karya: {
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
                    },
                },
                User: {
                    select: {
                        nama_lengkap: true,
                        foto_profil: true,
                    },
                },
            },
        });
        // console.log(karyaPelukis);
        return karyaPelukis.Karya.map((item) => {
            return {
                ...item,
                harga: parseInt(item.harga),
                panjang: item.panjang + "",
                lebar: item.lebar + "",
                id_karya: item.id,
                nama_lengkap: karyaPelukis.User.nama_lengkap,
                foto_profil: karyaPelukis.User.foto_profil,
            };
        });
    } catch (err) {
        throw err;
    }
};
