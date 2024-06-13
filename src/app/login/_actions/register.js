"use server";

import { hashPassword } from "@/lib/bcrypt";
import { signIn } from "@/auth";
import prisma from "@/lib/prisma";

export const loginPelukis = async (data) => {
    data["login_as"] = "PELUKIS";
    console.log({ data });
    return await signIn("credentials", data);
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
        return { success: true, message: "Berhasil registrasi" };
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
