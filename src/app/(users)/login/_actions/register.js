"use server";
import { hashPassword } from "@/lib/bcrypt";
import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const testData = async (data) => {
    return {
        success: true,
        message: "Berhasil test",
        data: { nama_lengkap: "Luthfi" },
    };
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

export const loginPelukis = async (data) => {
    try {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            login_as: "PELUKIS",
            redirect: false,
        });

        return {
            success: true,
            message: "Berhasil Log In",
            data: {
                redirect_to: "/",
            },
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

export const registerPelukis = async (data) => {
    let {
        nama_lengkap,
        username,
        email,
        tempat_lhr,
        tgl_lhr,
        password,
        deskripsi,
    } = data;

    let hashedPassword = hashPassword(password);
    try {
        let createUser = await prisma.User.create({
            data: {
                username,
                email,
                password: hashedPassword,
                nama_lengkap,
                tgl_lhr: new Date(tgl_lhr).toISOString(),
                tempat_lhr,
                role: "USER",
                Seniman: {
                    create: {
                        deskripsi,
                    },
                },
            },
        });
        return {
            success: true,
            message: "Berhasil registrasi",
            data: { nama_lengkap: createUser.nama_lengkap },
        };
    } catch (err) {
        console.log(err);
        switch (err.meta.target) {
            case "User_username_key":
                return { success: false, message: "Username telah digunakan!" };
                break;
            case "User_email_key":
                return { success: false, message: "Email telah digunakan!" };
                break;
            default:
                return { success: false, message: "Gagal registrasi" };
        }
    }
};
