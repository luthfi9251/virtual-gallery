"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { URL_TANART } from "@/variables/url";

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

export const addUser = async (data) => {
    try {
        const {
            username,
            email,
            password,
            nama_lengkap,
            tgl_lhr,
            tempat_lhr,
            role,
        } = data;

        let addQuery = await prisma.User.create({
            data: {
                username,
                email,
                password,
                nama_lengkap,
                tgl_lhr: new Date(tgl_lhr).toISOString(),
                tempat_lhr,
                role,
            },
        });
        return addQuery;
    } catch (err) {
        console.log(err);
        switch (err.meta.target) {
            case "User_username_key":
                throw new Error("Username telah digunakan!");
            case "User_email_key":
                throw new Error("Email telah digunakan!");
            default:
                throw new Error("Gagal Registrasi Akun!");
        }
    }
};

export const addPelukisOrKurator = async (data, mode) => {
    try {
        const { user_id, deskripsi, is_verified = false } = data;
        if (mode === "PELUKIS") {
            let addPelukis = await prisma.Seniman.create({
                data: {
                    User: {
                        connect: {
                            id: user_id,
                        },
                    },
                    deskripsi,
                    is_verified,
                    verified_at: new Date().toISOString(),
                },
            });
            return addPelukis;
        } else if (mode === "KURATOR") {
            let addKurator = await prisma.Kurator.create({
                data: {
                    User: {
                        connect: {
                            id: user_id,
                        },
                    },
                    deskripsi,
                    is_verified,
                    verified_at: new Date().toISOString(),
                },
            });
            return addKurator;
        }

        throw new Error("Kesalahan dalam menambahkan kurator atau pelukis!");
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const adminAddUser = async (dataUser, aksesAkun) => {
    try {
        let user = await addUser(dataUser);
        if (aksesAkun.length > 0) {
            let dataAkses = {
                user_id: user.id,
                deskripsi: "Akun dibuat oleh admin",
                is_verified: true,
            };
            let query = aksesAkun.map((mode) => {
                return addPelukisOrKurator(dataAkses, mode);
            });
            await Promise.all(query);
        }
        revalidatePath(URL_TANART.ADMIN_DASHBOARD_AKUN);
        let dataUser1 = await getUserDataById(user.id);
        return dataUser1;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const deleteUser = async (idUser) => {
    try {
        let deleteUser = await prisma.User.delete({
            where: {
                id: idUser,
            },
        });
        revalidatePath(URL_TANART.ADMIN_DASHBOARD_AKUN);
        return "Berhasil delete user!";
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const updateUser = async (data) => {
    try {
        const { nama_lengkap, username, email, tempat_lhr, tgl_lhr, role } =
            data;
        let update = await prisma.User.update({
            where: {
                id: data.id,
            },
            data: {
                nama_lengkap,
                username,
                email,
                tempat_lhr,
                tgl_lhr: new Date(tgl_lhr).toISOString(),
                role,
            },
        });
        revalidatePath(URL_TANART.ADMIN_DASHBOARD_AKUN_EDIT(data.id));
        return "Berhasil menimpan perubahan";
    } catch (err) {
        console.log(err);
        throw err;
    }
};
