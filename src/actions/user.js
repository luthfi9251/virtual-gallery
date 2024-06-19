"use server";
import prisma from "@/lib/prisma";

export const getAllUserAccount = async () => {
    let data = await prisma.User.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            nama_lengkap: true,
            created_at: true,
            tempat_lhr: true,
            tgl_lhr: true,
            role: true,
            Seniman: {
                select: {
                    is_verified: true,
                    verified_at: true,
                    deskripsi: true,
                },
            },
            Kurator: {
                select: {
                    is_verified: true,
                    verified_at: true,
                    deskripsi: true,
                },
            },
        },
    });

    return data;
};

export const getUserDataById = async (id) => {
    if (!id) {
        return null;
    }
    let data = await prisma.User.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            email: true,
            username: true,
            nama_lengkap: true,
            created_at: true,
            tempat_lhr: true,
            tgl_lhr: true,
            role: true,
            Seniman: {
                select: {
                    is_verified: true,
                    verified_at: true,
                    deskripsi: true,
                },
            },
            Kurator: {
                select: {
                    is_verified: true,
                    verified_at: true,
                    deskripsi: true,
                },
            },
        },
    });

    return data;
};
