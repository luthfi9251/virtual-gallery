"use server";

export const uploadImageToBackend = async (formData) => {
    try {
        let response = await fetch(`${process.env.IMAGE_SERVICE_URL}/upload`, {
            headers: {
                Authorization: `Bearer ${process.env.IMAGE_SERVICE_SECRET}`,
            },
            method: "POST",
            body: formData,
        });
        let jsonRes = await response.json();

        return jsonRes;
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
        let response = await fetch(
            `${process.env.IMAGE_SERVICE_URL}/v2/upload?width=${width}&height=${height}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.IMAGE_SERVICE_SECRET}`,
                },
                method: "POST",
                body: formData,
            }
        );
        let jsonRes = await response.json();
        return jsonRes;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
