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

        let uploadSampul = uploadImageToBackendWithSize(sampulBody, {
            width: 1000,
            height: 334,
        });
        let uploadBody = uploadImageToBackendWithSize(bannerBody, {
            width: 250,
            height: 334,
        });

        let [resSampul, resBody] = await Promise.all([
            uploadSampul,
            uploadBody,
        ]);

        const generateSlugPameran =
            generateSlug(dataPameran.nama_pameran) +
            "-" +
            session.user.Seniman.id.slice(-6);

        let bukaPameran = await prisma.Pameran.create({
            data: {
                nama_pameran: dataPameran.nama_pameran,
                deskripsi: dataPameran.deskripsi,
                banner_url: resBody.resizedPath,
                sampul_url: resSampul.resizedPath,
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
