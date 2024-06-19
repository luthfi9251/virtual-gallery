"use server";
import prisma from "@/lib/prisma";

export const getUnverifiedKurator = async () => {
    let data = await prisma.Kurator.findMany({
        orderBy: [
            {
                is_verified: "asc",
            },
            {
                created_at: "desc",
            },
        ],
        select: {
            id: true,
            deskripsi: true,
            created_at: true,
            is_verified: true,
            User: {
                select: {
                    nama_lengkap: true,
                    email: true,
                },
            },
        },
    });

    return data.map((item) => {
        return {
            id: item.id,
            nama_lengkap: item.User.nama_lengkap,
            email: item.User.email,
            tgl_pengajuan: new Date(item.created_at).toLocaleString(),
            is_verified: item.is_verified,
            deskripsi: item.deskripsi,
        };
    });
};

export const getUnverifiedPelukis = async () => {
    let data = await prisma.Seniman.findMany({
        orderBy: [
            {
                is_verified: "asc",
            },
            {
                created_at: "desc",
            },
        ],
        select: {
            id: true,
            deskripsi: true,
            created_at: true,
            is_verified: true,
            User: {
                select: {
                    nama_lengkap: true,
                    email: true,
                },
            },
        },
    });

    return data.map((item) => {
        return {
            id: item.id,
            nama_lengkap: item.User.nama_lengkap,
            email: item.User.email,
            tgl_pengajuan: new Date(item.created_at).toLocaleString(),
            is_verified: item.is_verified,
            deskripsi: item.deskripsi,
        };
    });
};

export const verifKurator = async (idKurator) => {
    let update = await prisma.Kurator.update({
        where: {
            id: idKurator,
        },
        data: {
            is_verified: true,
            verified_at: new Date().toISOString(),
        },
    });

    return update;
};
export const verifPelukis = async (idSeniman) => {
    let update = await prisma.Seniman.update({
        where: {
            id: idSeniman,
        },
        data: {
            is_verified: true,
            verified_at: new Date().toISOString(),
        },
    });

    return update;
};
