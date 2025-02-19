"use server";
import { cloudinary } from "@/lib/cloudinary";

const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
};

export const uploadImageToBackend = async (formData) => {
    try {
        // let response = await fetch(`${process.env.IMAGE_SERVICE_URL}/upload`, {
        //     headers: {
        //         Authorization: `Bearer ${process.env.IMAGE_SERVICE_SECRET}`,
        //     },
        //     method: "POST",
        //     body: formData,
        // });
        // let jsonRes = await response.json();
        let image = formData.get("image");
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer).toString("base64");
        const dataUri = `data:${image.type};base64,${buffer}`;
        const res = await cloudinary.uploader.upload(dataUri, {
            folder: "tanart",
        });

        return {
            filename: res.secure_url,
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const uploadImageToBackendWithSize = async (
    formData,
    { width, height }
) => {
    try {
        let image = formData.get("image");
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer).toString("base64");
        const dataUri = `data:${image.type};base64,${buffer}`;
        const res = await cloudinary.uploader.upload(dataUri, {
            folder: "tanart",
        });

        return {
            resizedPath: res.secure_url,
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
};
