"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { uploadImageToBackendWithSize } from "./image";
import { generateSlug } from "@/lib/utils";
import { serverResponseFormat } from "@/lib/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createPameran = async (formData) => {
    try {
        let session = await auth();
        if (!session.user?.Seniman) {
            throw new Error("Anda tidak memiliki akses!");
        }
        let dataPameran = JSON.parse(formData.get("dataPameran"));
        let karyaList = JSON.parse(formData.get("karyaList"));
        let sampulBlob = formData.get("heroBlob");
        let bannerBlob = formData.get("sampulBlob");

        const imageUploadBody = (buffer, extension) => {
            let formData = new FormData();
            formData.append("image", buffer);
            formData.append("ext", extension);
            return formData;
        };

        let sampulBody = imageUploadBody(
            sampulBlob,
            sampulBlob.type.split("/")[1]
        );
        let bannerBody = imageUploadBody(
            bannerBlob,
            bannerBlob.type.split("/")[1]
        );

        let uploadBanner = uploadImageToBackendWithSize(bannerBody, {
            width: 1000,
            height: 334,
        });
        let uploadSampul = uploadImageToBackendWithSize(sampulBody, {
            width: 250,
            height: 334,
        });

        let [resSampul, resBanner] = await Promise.all([
            uploadSampul,
            uploadBanner,
        ]);

        const generateSlugPameran =
            generateSlug(dataPameran.nama_pameran) +
            "-" +
            session.user.Seniman.id.slice(-6);

        let bukaPameran = await prisma.Pameran.create({
            data: {
                nama_pameran: dataPameran.nama_pameran,
                deskripsi: dataPameran.deskripsi,
                banner_url: resBanner.filename,
                sampul_url: resSampul.filename,
                tgl_mulai: new Date(dataPameran.tanggal[0]).toISOString(),
                tgl_selesai: new Date(dataPameran.tanggal[1]).toISOString(),
                slug: generateSlugPameran,
                status: "OPEN",
                Seniman: {
                    connect: {
                        id: session.user.Seniman.id,
                    },
                },
                KaryaPameran: {
                    create: karyaList.map((item) => {
                        return {
                            Karya: {
                                connect: {
                                    id: item,
                                },
                            },
                        };
                    }),
                },
            },
        });
        // console.log(bukaPameran);
        return serverResponseFormat("success");
    } catch (err) {
        console.log(err);
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.meta.target === "Pameran_slug_key") {
                return serverResponseFormat(
                    null,
                    true,
                    "Anda telah memiliki pameran dengan nama yang sama!"
                );
            }
        }
        return serverResponseFormat(null, true, err.message);
    }
};

export const getPameranBaseOnFilter = async (filter) => {
    try {
        let computeStatus = (item) => {
            let currentDate = new Date();
            if (item.tgl_selesai < currentDate) {
                item.statusComputed = "CLOSE";
            } else if (item.tgl_mulai > currentDate) {
                item.statusComputed = "SCHEDULED";
            } else {
                item.statusComputed = "OPEN";
            }

            return item;
        };
        let SELECT_QUERY = {
            id: true,
            nama_pameran: true,
            deskripsi: true,
            sampul_url: true,
            tgl_mulai: true,
            tgl_selesai: true,
            status: true,
            slug: true,
        };
        let session = await auth();
        let pameran = [];
        if (filter === "SEMUA") {
            pameran = await prisma.Pameran.findMany({
                where: {
                    Seniman: {
                        id: session.user.Seniman.id,
                    },
                },
                select: SELECT_QUERY,
            });
        } else if (filter === "OPEN") {
            pameran = await prisma.Pameran.findMany({
                where: {
                    Seniman: {
                        id: session.user.Seniman.id,
                    },
                    tgl_mulai: {
                        lte: new Date(),
                    },
                    tgl_selesai: {
                        gte: new Date(),
                    },
                },
                select: SELECT_QUERY,
            });
        } else if (filter === "CLOSE") {
            pameran = await prisma.Pameran.findMany({
                where: {
                    Seniman: {
                        id: session.user.Seniman.id,
                    },
                    tgl_selesai: {
                        lt: new Date(),
                    },
                },
                select: SELECT_QUERY,
            });
        }
        return serverResponseFormat(pameran.map((item) => computeStatus(item)));
    } catch (err) {
        console.log(err);
    }
};
