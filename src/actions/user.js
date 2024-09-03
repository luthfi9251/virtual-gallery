"use server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";
import { revalidatePath } from "next/cache";
import { URL_TANART } from "@/variables/url";
import { uploadImageToBackend, uploadImageToBackendWithSize } from "./image";
import { auth, signIn } from "@/auth";
import { serverResponseFormat } from "@/lib/utils";

export const getAllUserAccount = async () => {
    let session = await auth();
    if (session.user?.role !== "ADMIN") {
        throw new Error("Anda tidak memiliki akses");
    }
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
        switch (err?.meta.target) {
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
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }
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
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }
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
        let session = await auth();
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

export const uploadProfilePicture = async (formdataProfile, idUser) => {
    try {
        const imageUploadBody = (buffer, extension) => {
            let formData = new FormData();
            formData.append("image", buffer);
            formData.append("ext", extension);
            return formData;
        };
        let uploadBody = imageUploadBody(
            formData.get("image"),
            formData.get("image").type.split("/")[1]
        );
        let uploadProfil = await uploadImageToBackendWithSize(uploadBody, {
            width: 200,
            height: 200,
        });
        await prisma.User.update({
            where: {
                id: idUser,
            },
            data: {
                foto_profil: uploadProfil.filename,
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
                    fotoProfil: data.foto_profil,
                    fotoSampul: data.Profile?.foto_sampul,
                    nama_lengkap: data.nama_lengkap,
                    username: data.username,
                    bio: data.Profile ? data.Profile.bio : "-",
                    created_at: data.created_at,
                },
                sosial_media: {
                    instagram_id: data.Profile
                        ? data.Profile.instagram_id
                        : "-",
                    x_id: data.Profile ? data.Profile.x_id : "-",
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
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};

export const getUserProfileEdit = async () => {
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
                tgl_lhr: true,
                tempat_lhr: true,
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
            },
        });
        let preparedData = (data) => {
            return {
                profile: {
                    tgl_lhr: data.tgl_lhr,
                    tempat_lhr: data.tempat_lhr,
                    fotoProfil: data.foto_profil,
                    fotoSampul: data.Profile && data.Profile.foto_sampul,
                    nama_lengkap: data.nama_lengkap,
                    username: data.username,
                    bio: data.Profile ? data.Profile.bio : "",
                    created_at: data.created_at,
                },
                sosial_media: {
                    instagram_id: data.Profile && data.Profile.instagram_id,
                    x_id: data.Profile && data.Profile.x_id,
                    email: data.email,
                },
            };
        };

        return preparedData(userProfile);
    } catch (err) {
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};

export const editProfile = async (formData) => {
    try {
        let session = await auth();
        if (!session?.user) {
            throw "Sesi anda telah habis!";
        }

        let editQuery = {
            username: formData.get("username"),
            email: formData.get("email"),
            nama_lengkap: formData.get("nama_lengkap"),
            tgl_lhr: new Date(formData.get("tgl_lhr")).toISOString(),
            tempat_lhr: formData.get("tempat_lhr"),
            Profile: {
                upsert: {
                    create: {
                        bio: formData.get("bio"),
                        instagram_id: formData.get("instagram_id"),
                        x_id: formData.get("x_id"),
                    },
                    update: {
                        bio: formData.get("bio"),
                        instagram_id: formData.get("instagram_id"),
                        x_id: formData.get("x_id"),
                    },
                },
            },
        };

        const imageUploadBody = (buffer, extension) => {
            let formData = new FormData();
            formData.append("image", buffer);
            formData.append("ext", extension);
            return formData;
        };

        if (formData.get("fotoSampul")) {
            let sampulBody = imageUploadBody(
                formData.get("fotoSampul"),
                formData.get("fotoSampul").type.split("/")[1]
            );
            let uploadBanner = await uploadImageToBackendWithSize(sampulBody, {
                width: 1200,
                height: 240,
            });
            editQuery.Profile.upsert.create.foto_sampul = uploadBanner.filename;
            editQuery.Profile.upsert.update.foto_sampul = uploadBanner.filename;
        }
        if (formData.get("fotoProfil")) {
            let profilBody = imageUploadBody(
                formData.get("fotoProfil"),
                formData.get("fotoProfil").type.split("/")[1]
            );
            let uploadProfil = await uploadImageToBackendWithSize(profilBody, {
                width: 200,
                height: 200,
            });
            editQuery.foto_profil = uploadProfil.filename;
        }

        let editData = await prisma.User.update({
            where: {
                id: session.user.id,
            },
            data: editQuery,
        });
        revalidatePath("/", "layout");
        return serverResponseFormat("success", false, null);
    } catch (err) {
        let errMessage = err.message;
        switch (err.meta.target) {
            case "User_username_key":
                errMessage = "Username telah digunakan!";
                break;
            case "User_email_key":
                errMessage = "Email telah digunakan!";
                break;
            default:
                break;
        }
        return serverResponseFormat(null, true, errMessage);
    }
};
