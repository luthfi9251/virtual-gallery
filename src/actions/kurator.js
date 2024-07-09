"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { URL_TANART } from "@/variables/url";

export const kurasiKarya = async (data) => {
    try {
        let session = await auth();

        if (!session.user.Kurator) {
            throw Error("Anda tidak memiliki akun kurator!");
        }

        let findKarya = await prisma.Karya.findUnique({
            where: {
                id: data.id_karya,
            },
            select: {
                _count: {
                    select: {
                        KurasiKarya: true,
                    },
                },
            },
        });

        let addKurasiKarya = await prisma.KurasiKarya.create({
            data: {
                Kurator: {
                    connect: {
                        id: session.user.Kurator.id,
                    },
                },
                Karya: {
                    connect: {
                        id: data.id_karya,
                    },
                },
                komentar: data.komentar,
                harga_maks: data.harga_maks,
                harga_min: data.harga_min,
            },
        });

        if (findKarya._count.KurasiKarya < 1) {
            let updateKarya = await prisma.Karya.update({
                where: {
                    id: data.id_karya,
                },
                data: {
                    status: "TERKURASI",
                },
            });
        }

        revalidatePath(URL_TANART.KURATOR_DASHBOARD_KURASI);
        return addKurasiKarya;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getAllKurasiKaryaComment = async (idKarya) => {
    try {
        let data = await prisma.Karya.findUnique({
            where: {
                id: idKarya,
            },
            select: {
                KurasiKarya: {
                    select: {
                        komentar: true,
                        harga_maks: true,
                        harga_min: true,
                        Kurator: {
                            select: {
                                verified_at: true,
                                User: {
                                    select: {
                                        id: true,
                                        nama_lengkap: true,
                                        foto_profil: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        return data.KurasiKarya.map((item) => {
            let userInfo = {
                id: item.Kurator.User.id,
                nama_lengkap: item.Kurator.User.nama_lengkap,
                foto_profil: item.Kurator.User.foto_profil,
                verified_at: item.Kurator.verified_at,
            };

            let kurasiData = {
                komentar: item.komentar,
                harga_maks: parseInt(item.harga_maks),
                harga_min: parseInt(item.harga_min),
            };

            return {
                userInfo,
                kurasiData,
            };
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
};
