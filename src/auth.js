import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { comparePassword } from "@/lib/bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: true,
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
                login_as: {},
            },
            authorize: async (credentials) => {
                let user = null;

                let findUser = await prisma.User.findUnique({
                    where: {
                        email: credentials.email,
                    },
                    include: {
                        Seniman: true,
                        Kurator: true,
                    },
                });

                switch (credentials.login_as) {
                    case "PELUKIS":
                        if (findUser.Seniman) {
                            user = findUser;
                            user.login_as = "PELUKIS";
                        } else {
                            throw new Error(
                                "Anda tidak memiliki akun Pelukis!"
                            );
                        }
                        break;
                    case "KURATOR":
                        if (findUser.Kurator) {
                            user = findUser;
                            user.login_as = "KURATOR";
                        } else {
                            throw new Error(
                                "Anda tidak memiliki akun Pelukis!"
                            );
                        }
                        break;
                    case "USER":
                        if (findUser) {
                            user = findUser;
                            user.login_as = findUser.role;
                        } else {
                            throw new Error("Akun tidak ditemukan!");
                        }
                        break;
                    default:
                        throw new Error("Kesalahan saat registrasi!");
                        break;
                }

                let checkPassword = comparePassword(
                    credentials.password,
                    user.password
                );

                if (!checkPassword) {
                    throw new Error("Password salah!");
                }
                console.log({ user });
                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.login_as = user.login_as;
            }
            return token;
        },
        async session({ session, token }) {
            let findUser = await prisma.User.findUnique({
                where: {
                    id: token.id,
                },
                include: {
                    Seniman: true,
                    Kurator: true,
                },
            });
            session.user.id = token.id;
            session.user.username = findUser.username;
            session.user.email = findUser.email;
            session.user.nama_lengkap = findUser.nama_lengkap;
            session.user.role = findUser.role;
            session.user.login_as = token.login_as;
            if (token.login_as === "PELUKIS") {
                session.user.pelukis = findUser.Seniman;
            } else if (token.login_as === "KURATOR") {
                session.user.pelukis = findUser.Kurator;
            }
            return session;
        },
    },
});
