"use server";
import prisma from "@/lib/prisma";
import { uploadImageToBackend } from "./image";
import { auth } from "@/auth";

export const unggahKaryaPelukis = async (formData) => {
    try {
        let session = await auth();

        if (!session.user.Seniman) {
            throw new Error("Anda tidak memiliki akun seniman!");
        }

        let imageServiceBody = new FormData();
        console.log({ ext: formData.get("ext"), karya: formData.get("karya") });
        imageServiceBody.append("type", "thumbnail");
        imageServiceBody.append("ext", formData.get("ext"));
        imageServiceBody.append("image", formData.get("karya"));
        let upload = await uploadImageToBackend(imageServiceBody);

        if (!upload?.filename) {
            throw new Error("Gagal saat upload karya!");
        }

        let uploadKarya = await prisma.Karya.create({
            data: {
                judul: formData.get("judul"),
                deskripsi: formData.get("deskripsi"),
                keterangan: formData.get("keterangan"),
                panjang: formData.get("panjang"),
                lebar: formData.get("lebar"),
                status: "DIKURASI",
                lukisan_url: upload.filename,
                Seniman: {
                    connect: {
                        id: session.user.Seniman.id,
                    },
                },
            },
        });

        return uploadKarya;
    } catch (err) {
        throw err;
    }
};
