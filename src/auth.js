import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { comparePassword } from "@/lib/bcrypt";
import { ROLE } from "./variables/page";

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
            },
            authorize: async (credentials) => {
                let findUser = await prisma.User.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!findUser) {
                    throw new Error("Akun tidak ditemukan!");
                }
                let checkPassword = comparePassword(
                    credentials.password,
                    findUser.password
                );

                if (!checkPassword) {
                    throw new Error("Password salah!");
                }
                return findUser;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
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
            session.user.Seniman = findUser.Seniman;
            session.user.Kurator = findUser.Kurator;
            let userAccess = [];

            if (findUser.Seniman) {
                userAccess.push(ROLE.PELUKIS);
            }
            if (findUser.Kurator) {
                userAccess.push(ROLE.KURATOR);
            }
            userAccess.push(findUser.role);
            session.user.accessRole = userAccess;

            return session;
        },
    },
});
