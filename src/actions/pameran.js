"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { uploadImageToBackendWithSize } from "./image";
import { generateSlug } from "@/lib/utils";
import { serverResponseFormat } from "@/lib/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { URL_TANART } from "@/variables/url";
import dayjs from "dayjs";

export const createPameran = async (formData) => {
    try {
        let session = await auth();
        if (!session.user?.Seniman) {
            throw new Error("Anda tidak memiliki akses!");
        }
        let dataPameran = JSON.parse(formData.get("dataPameran"));
        let karyaList = JSON.parse(formData.get("karyaList"));
        let sampulBlob = formData.get("sampulBlob");
        let bannerBlob = formData.get("bannerBlob");

        if (karyaList.length == 0) {
            throw new Error("Anda belum memilih karya!");
        }

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
            let addOneDay = dayjs(item.tgl_selesai).add(1, "day").toDate();
            if (addOneDay < currentDate) {
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
                        gte: dayjs(new Date()).subtract(1, "day").toDate(),
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
                        lt: dayjs(new Date()).subtract(1, "day").toDate(),
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

export const getPameranOpen = async () => {
    try {
        let SELECT_QUERY = {
            id: true,
            nama_pameran: true,
            banner_url: true,
            tgl_mulai: true,
            tgl_selesai: true,
            status: true,
            slug: true,
            Seniman: {
                select: {
                    User: {
                        select: {
                            id: true,
                            nama_lengkap: true,
                            foto_profil: true,
                        },
                    },
                },
            },
        };

        let pameran = await prisma.Pameran.findMany({
            where: {
                tgl_mulai: {
                    lte: new Date(),
                },
                tgl_selesai: {
                    gte: dayjs(new Date()).subtract(1, "day").toDate(),
                },
            },
            select: SELECT_QUERY,
        });
        return serverResponseFormat(
            pameran.map((item) => {
                return {
                    nama_pameran: item.nama_pameran,
                    banner_url: item.banner_url,
                    tgl_mulai: item.tgl_mulai,
                    tgl_selesai: item.tgl_selesai,
                    status: item.status,
                    slug: item.slug,
                    id_user: item.Seniman.User.id,
                    nama_lengkap: item.Seniman.User.nama_lengkap,
                    foto_profil: item.Seniman.User.foto_profil,
                };
            })
        );
    } catch (err) {
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};

export const getMostViewedPameranOpen = async () => {
    try {
        let SELECT_QUERY = {
            id: true,
            nama_pameran: true,
            banner_url: true,
            tgl_mulai: true,
            tgl_selesai: true,
            status: true,
            slug: true,
            Seniman: {
                select: {
                    User: {
                        select: {
                            id: true,
                            nama_lengkap: true,
                            foto_profil: true,
                        },
                    },
                },
            },
        };

        let pameran = await prisma.Pameran.findMany({
            orderBy: {
                views: "desc",
            },
            take: 4,
            where: {
                tgl_mulai: {
                    lte: new Date(),
                },
                tgl_selesai: {
                    gte: dayjs(new Date()).subtract(1, "day").toDate(),
                },
            },
            select: SELECT_QUERY,
        });
        return serverResponseFormat(
            pameran.map((item) => {
                return {
                    nama_pameran: item.nama_pameran,
                    banner_url: item.banner_url,
                    tgl_mulai: item.tgl_mulai,
                    tgl_selesai: item.tgl_selesai,
                    status: item.status,
                    slug: item.slug,
                    id_user: item.Seniman.User.id,
                    nama_lengkap: item.Seniman.User.nama_lengkap,
                    foto_profil: item.Seniman.User.foto_profil,
                };
            })
        );
    } catch (err) {
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};

export const getPameranBySlug = async (slug) => {
    try {
        let SELECT_QUERY = {
            id: true,
            nama_pameran: true,
            deskripsi: true,
            sampul_url: true,
            banner_url: true,
            tgl_mulai: true,
            tgl_selesai: true,
            status: true,
            slug: true,
            Seniman: {
                select: {
                    User: {
                        select: {
                            id: true,
                            username: true,
                            created_at: true,
                            nama_lengkap: true,
                            foto_profil: true,
                            Profile: {
                                select: {
                                    bio: true,
                                },
                            },
                        },
                    },
                },
            },
            KaryaPameran: {
                select: {
                    Karya: {
                        select: {
                            id: true,
                            lukisan_url: true,
                            judul: true,
                            deskripsi: true,
                            created_at: true,
                            aliran: true,
                        },
                    },
                },
            },
        };

        let pameran = prisma.Pameran.findUnique({
            where: {
                slug,
            },
            select: SELECT_QUERY,
        });

        let incrementView = prisma.Pameran.update({
            where: { slug },
            data: { views: { increment: 1 } },
        });

        let promAll = await Promise.all([pameran, incrementView]);
        pameran = promAll[0];

        if (!pameran) {
            throw "Pameran Tidak ditemukan!";
        }
        let check = checkIsPameranOpen(pameran.tgl_mulai, pameran.tgl_selesai);
        if (check) {
            return serverResponseFormat({
                id_pameran: pameran.id,
                nama_pameran: pameran.nama_pameran,
                sampul_url: pameran.sampul_url,
                banner_url: pameran.banner_url,
                deskripsi: pameran.deskripsi,
                tgl_mulai: pameran.tgl_mulai,
                tgl_selesai: pameran.tgl_selesai,
                status: pameran.status,
                slug: pameran.slug,
                user: {
                    id_user: pameran.Seniman.User.id,
                    nama_lengkap: pameran.Seniman.User.nama_lengkap,
                    foto_profil: pameran.Seniman.User.foto_profil,
                    username: pameran.Seniman.User.username,
                    bio:
                        pameran.Seniman.User.Profile?.bio ||
                        "Tidak ada Biografi",
                    created_at: pameran.Seniman.User.created_at,
                },
                karya: pameran.KaryaPameran.map((item) => {
                    return {
                        id_karya: item.Karya.id,
                        lukisan_url: item.Karya.lukisan_url,
                        judul: item.Karya.judul,
                        deskripsi: item.Karya.deskripsi,
                        created_at: item.Karya.created_at,
                        aliran: item.Karya.aliran,
                    };
                }),
            });
        } else {
            throw "Pameran Telah ditutup!";
        }
    } catch (err) {
        console.log({ err });
        return serverResponseFormat(null, true, err.message);
    }
};

export const getPameranById = async (idPameran) => {
    try {
        let SELECT_QUERY = {
            id: true,
            nama_pameran: true,
            deskripsi: true,
            sampul_url: true,
            banner_url: true,
            tgl_mulai: true,
            tgl_selesai: true,
            status: true,
            slug: true,
            Seniman: {
                select: {
                    User: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
            KaryaPameran: {
                select: {
                    Karya: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
        };

        let pameran = await prisma.Pameran.findUnique({
            where: {
                id: idPameran,
            },
            select: SELECT_QUERY,
        });
        if (!pameran) {
            throw "Pameran Tidak ditemukan!";
        }
        return serverResponseFormat(pameran);
    } catch (err) {
        console.log({ err });
        return serverResponseFormat(null, true, err.message);
    }
};

export const updatePameranById = async (idPameran, formData) => {
    try {
        let session = await auth();
        if (!session.user?.Seniman) {
            throw new Error("Anda tidak memiliki akses!");
        }
        let dataPameran = JSON.parse(formData.get("dataPameran"));
        let karyaList = JSON.parse(formData.get("karyaList"));
        let sampulBlob = formData.get("sampulBlob");
        let bannerBlob = formData.get("bannerBlob");

        if (karyaList.length == 0) {
            throw new Error("Anda belum memilih karya!");
        }

        const imageUploadBody = (buffer, extension) => {
            let formData = new FormData();
            formData.append("image", buffer);
            formData.append("ext", extension);
            return formData;
        };

        let resSampul;
        let resBanner;

        if (sampulBlob !== "null") {
            let sampulBody = imageUploadBody(
                sampulBlob,
                sampulBlob.type.split("/")[1]
            );
            resSampul = await uploadImageToBackendWithSize(sampulBody, {
                width: 250,
                height: 334,
            });
        }

        if (bannerBlob !== "null") {
            let bannerBody = imageUploadBody(
                bannerBlob,
                bannerBlob.type.split("/")[1]
            );
            resBanner = await uploadImageToBackendWithSize(bannerBody, {
                width: 1000,
                height: 334,
            });
        }

        const generateSlugPameran =
            generateSlug(dataPameran.nama_pameran) +
            "-" +
            session.user.Seniman.id.slice(-6);

        let DELETE_RELATED_QUERY = {
            KaryaPameran: {
                deleteMany: {},
            },
        };

        let UPDATE_QUERY = {
            nama_pameran: dataPameran.nama_pameran,
            deskripsi: dataPameran.deskripsi,
            tgl_mulai: new Date(dataPameran.tanggal[0]).toISOString(),
            tgl_selesai: new Date(dataPameran.tanggal[1]).toISOString(),
            slug: generateSlugPameran,
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
        };

        if (resSampul) {
            UPDATE_QUERY.sampul_url = resSampul.filename;
        }
        if (resBanner) {
            UPDATE_QUERY.banner_url = resBanner.filename;
        }

        let deleteKaryaPameran = prisma.Pameran.update({
            where: {
                id: idPameran,
            },
            data: DELETE_RELATED_QUERY,
        });

        let updatePameran = prisma.Pameran.update({
            where: {
                id: idPameran,
            },
            data: UPDATE_QUERY,
        });

        let transaction = await prisma.$transaction([
            deleteKaryaPameran,
            updatePameran,
        ]);
        // console.log(bukaPameran);
        revalidatePath(URL_TANART.PELUKIS_PAMERAN_EDIT(idPameran));
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

export const checkIsPameranOpen = (tglMulai, tglSelesai) => {
    let today = dayjs();
    let mulaiDate = new Date(tglMulai);
    let selesaiDate = new Date(tglSelesai);
    let addOneDayToSelesaiDate = dayjs(selesaiDate).add(1, "day").toDate();

    if (mulaiDate <= today) {
        if (addOneDayToSelesaiDate >= today) {
            return true;
        }
    }

    return false;
};
