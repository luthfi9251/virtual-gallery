"use server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";
import { revalidatePath } from "next/cache";
import { URL_TANART } from "@/variables/url";
import { uploadImageToBackend } from "./image";
import { auth, signIn } from "@/auth";
import { serverResponseFormat } from "@/lib/utils";

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
            foto_profil: true,
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
        let hashedPassword = hashPassword(password);
        let addQuery = await prisma.User.create({
            data: {
                username,
                email,
                password: hashedPassword,
                nama_lengkap,
                tgl_lhr: new Date(tgl_lhr).toISOString(),
                tempat_lhr,
                role,
            },
        });
        await loginUser({ email, password });
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

export const loginUser = async (data) => {
    try {
        let authSignIn = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        return {
            success: true,
            message: "Berhasil Log In",
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.cause?.err?.message,
            data: null,
        };
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

export const isEmailUsed = async (email) => {
    let data = await prisma.User.findFirst({
        where: {
            email,
        },
        include: {
            Seniman: true,
            Kurator: true,
        },
    });

    if (data) {
        return [true, data];
    } else {
        return [false, data];
    }
};

export const addpelukisOrKuratorFromEmail = async (mode, data) => {
    try {
        const { email, deskripsi } = data;
        let query = {
            data: {
                deskripsi,
                is_verified: false,
                User: {
                    connect: {
                        email,
                    },
                },
            },
        };

        if (mode === "pelukis") {
            return await prisma.Seniman.create(query);
        } else {
            return await prisma.Kurator.create(query);
        }
    } catch (err) {
        throw err;
    }
};

export const pengajuanAkun = async (mode, data) => {
    try {
        let { user } = data;

        let pengajuan = await addpelukisOrKuratorFromEmail(mode, user);
        return pengajuan;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const uploadProfilePicture = async (formdata, idUser) => {
    try {
        let upload = await uploadImageToBackend(formdata);
        await prisma.User.update({
            where: {
                id: idUser,
            },
            data: {
                foto_profil: upload.filename,
            },
        });
        return "Success";
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getUserProfile = async () => {
    try {
        let session = await auth();
        if (!session?.user) {
            throw "Sesi anda telah habis!";
        }

        let userProfile = await prisma.User.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                nama_lengkap: true,
                foto_profil: true,
                created_at: true,
                Profile: {
                    select: {
                        foto_sampul: true,
                        bio: true,
                        instagram_id: true,
                        x_id: true,
                    },
                },
                Seniman: {
                    select: {
                        is_verified: true,
                        created_at: true,
                    },
                },
                Kurator: {
                    select: {
                        is_verified: true,
                        created_at: true,
                    },
                },
            },
        });
        let preparedData = (data) => {
            return {
                profile: {
                    fotoProfil: data.foto_profile,
                    fotoSampul: data.Profile
                        ? data.profile.foto_sampul
                        : "DEFAULT",
                    nama_lengkap: data.nama_lengkap,
                    username: data.username,
                    bio: data.Profile ? data.profile.bio : "-",
                    created_at: data.created_at,
                },
                sosial_media: {
                    instagram_id: data.Profile ? data.instagram_id : "-",
                    x_id: data.Profile ? data.x_id : "-",
                    email: data.email,
                },
                pengajuan_akun: {
                    seniman: data.Seniman,
                    kurator: data.Kurator,
                },
            };
        };

        return preparedData(userProfile);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};
