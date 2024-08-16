"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { serverResponseFormat } from "@/lib/utils";
import { uploadImageToBackendWithSize } from "./image";
import { revalidatePath } from "next/cache";
import { URL_TANART } from "@/variables/url";

const CMS_VIRTUAL_GALLERY = "CMS_VIRTUAL_GALLERY";
const CMS_COMPANY_PROFILE = "CMS_COMPANY_PROFILE";

export const updateCMSVirtualGallery = async (dataText, formDataGambar) => {
    try {
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }

        let kuratorFotoFile = formDataGambar.get("foto_kurator");
        let pelukisFotoFile = formDataGambar.get("foto_pelukis");

        const TAG_CMS_VIRTUAL_GALLERY = {
            JUMLAH_KURATOR: dataText.jumlah_kurator,
            JUMLAH_PELUKIS: dataText.jumlah_pelukis,
            NAMA_FEATURED_KURATOR: dataText.nama_kurator,
            NAMA_FEATURED_PELUKIS: dataText.nama_pelukis,
            BIO_FEATURED_KURATOR: dataText.bio_kurator,
            BIO_FEATURED_PELUKIS: dataText.bio_pelukis,
        };

        const imageUploadBody = (buffer, extension) => {
            let formData = new FormData();
            formData.append("image", buffer);
            formData.append("ext", extension);
            return formData;
        };

        if (kuratorFotoFile) {
            let uploadBody = imageUploadBody(
                kuratorFotoFile,
                kuratorFotoFile.type.split("/")[1]
            );
            let urlResponse = await uploadImageToBackendWithSize(uploadBody, {
                width: 300,
                height: 375,
            });
            TAG_CMS_VIRTUAL_GALLERY["FOTO_FEATURED_KURATOR"] =
                urlResponse.resizedPath;
        }

        if (pelukisFotoFile) {
            let uploadBody = imageUploadBody(
                pelukisFotoFile,
                pelukisFotoFile.type.split("/")[1]
            );
            let urlResponse = await uploadImageToBackendWithSize(uploadBody, {
                width: 300,
                height: 375,
            });
            TAG_CMS_VIRTUAL_GALLERY["FOTO_FEATURED_PELUKIS"] =
                urlResponse.resizedPath;
        }

        const PAGE_GROUP = CMS_VIRTUAL_GALLERY;

        let tagList = Object.keys(TAG_CMS_VIRTUAL_GALLERY);
        let prismaPromList = tagList.map((item) => {
            return prisma.CMSPageVariable.upsert({
                where: {
                    tag: item,
                },
                update: {
                    value: "" + TAG_CMS_VIRTUAL_GALLERY[item],
                    page_group: PAGE_GROUP,
                    UpdatedBy: {
                        connect: {
                            id: session.user.id,
                        },
                    },
                },
                create: {
                    tag: item,
                    value: "" + TAG_CMS_VIRTUAL_GALLERY[item],
                    page_group: PAGE_GROUP,
                    UpdatedBy: {
                        connect: {
                            id: session.user.id,
                        },
                    },
                },
            });
        });

        let result = await Promise.all(prismaPromList);
        return serverResponseFormat("Success", false, null);
    } catch (err) {
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};

export const getCMSVirtualGalleryData = async () => {
    const PAGE_GROUP = CMS_VIRTUAL_GALLERY;

    let pageData = await prisma.CMSPageVariable.findMany({
        where: {
            page_group: PAGE_GROUP,
        },
    });

    const dataCMS = {};

    pageData.forEach((item) => {
        dataCMS[item.tag] = item.value;
    });

    const MAPPED_DATA = {
        JUMLAH_KURATOR: dataCMS.JUMLAH_KURATOR,
        JUMLAH_PELUKIS: dataCMS.JUMLAH_PELUKIS,
        NAMA_FEATURED_KURATOR: dataCMS.NAMA_FEATURED_KURATOR,
        NAMA_FEATURED_PELUKIS: dataCMS.NAMA_FEATURED_PELUKIS,
        BIO_FEATURED_KURATOR: dataCMS.BIO_FEATURED_KURATOR,
        BIO_FEATURED_PELUKIS: dataCMS.BIO_FEATURED_PELUKIS,
        FOTO_FEATURED_KURATOR: dataCMS.FOTO_FEATURED_KURATOR,
        FOTO_FEATURED_PELUKIS: dataCMS.FOTO_FEATURED_PELUKIS,
    };

    return MAPPED_DATA;
};

export const addHeroCarrouselData = async (formData) => {
    try {
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }

        let imageCarrousel = formData.get("image");
        let tagCarrousel = formData.get("tag");

        const PREFIX_HERO_CARROUSEL = "HERO_CARROUSEL";
        const imageUploadBody = (buffer, extension) => {
            let formData = new FormData();
            formData.append("image", buffer);
            formData.append("ext", extension);
            return formData;
        };

        if (!imageCarrousel || !tagCarrousel) {
            throw new Error("Harus disertai gambar dan tag!");
        }

        let uploadBody = imageUploadBody(
            imageCarrousel,
            imageCarrousel.type.split("/")[1]
        );
        let urlResponse = await uploadImageToBackendWithSize(uploadBody, {
            width: 1440,
            height: 800,
        });

        let formatTag = tagCarrousel.toUpperCase().split(" ").join("_");

        let addToDb = await prisma.CMSPageVariable.upsert({
            where: {
                tag: PREFIX_HERO_CARROUSEL + "_" + formatTag,
            },
            update: {
                value: urlResponse.resizedPath,
                page_group: CMS_COMPANY_PROFILE,
                UpdatedBy: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
            create: {
                tag: PREFIX_HERO_CARROUSEL + "_" + formatTag,
                value: urlResponse.resizedPath,
                page_group: CMS_COMPANY_PROFILE,
                UpdatedBy: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
        return serverResponseFormat("OK", false, null);
    } catch (err) {
        console.log(err);
        return serverResponseFormat(null, true, err.message);
    }
};

export const getHeroCarrouselData = async () => {
    try {
        let getAllHeroData = await prisma.CMSPageVariable.findMany({
            where: {
                tag: {
                    startsWith: "HERO_CARROUSEL",
                },
                page_group: CMS_COMPANY_PROFILE,
            },
            select: {
                id: true,
                tag: true,
                value: true,
            },
        });

        getAllHeroData = getAllHeroData.map((item) => {
            return {
                ...item,
                tag: item.tag.replace("HERO_CARROUSEL_", ""),
            };
        });
        return serverResponseFormat(getAllHeroData, false, null);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

export const deleteHeroCarrouselData = async (idTag) => {
    try {
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }

        let deleteData = await prisma.CMSPageVariable.delete({
            where: {
                id: idTag,
            },
        });
        return serverResponseFormat("OK", false, null);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

export const addAndUpdateAbout = async (text) => {
    try {
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }
        const ABOUT_TAG_NAME = "ABOUT_US_LANDING_PAGE";
        let addAbout = await prisma.CMSPageVariable.upsert({
            where: {
                tag: ABOUT_TAG_NAME,
            },
            update: {
                value: text,
                page_group: CMS_COMPANY_PROFILE,
                UpdatedBy: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
            create: {
                tag: ABOUT_TAG_NAME,
                value: text,
                page_group: CMS_COMPANY_PROFILE,
                UpdatedBy: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
        return serverResponseFormat("OK", false, null);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

export const getAboutLP = async () => {
    let data = await prisma.CMSPageVariable.findUnique({
        where: {
            tag: "ABOUT_US_LANDING_PAGE",
        },
    });

    return serverResponseFormat(data, false, null);
};

export const addAndUpdateGallery = async (imageType, formData) => {
    try {
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }
        const GALLERY_LANDING_PAGE = "GALLERY_LANDING_PAGE";

        let imageBlob = formData.get("image");

        const imageUploadBody = (buffer, extension) => {
            let formData = new FormData();
            formData.append("image", buffer);
            formData.append("ext", extension);
            return formData;
        };

        if (!imageBlob || !imageType) {
            throw new Error("Harus disertai gambar dan tag!");
        }

        let uploadBody = imageUploadBody(
            imageBlob,
            imageBlob.type.split("/")[1]
        );

        const IMAGE_SIZE = {
            imageOne: {
                width: 860,
                height: 880,
            },
            imageTwo: {
                width: 560,
                height: 420,
            },
            imageThree: {
                width: 560,
                height: 420,
            },
        };

        let urlResponse = await uploadImageToBackendWithSize(
            uploadBody,
            IMAGE_SIZE[imageType]
        );
        let formatTag = imageType.toUpperCase();

        let addToDb = await prisma.CMSPageVariable.upsert({
            where: {
                tag: GALLERY_LANDING_PAGE + "_" + formatTag,
            },
            update: {
                value: urlResponse.resizedPath,
                page_group: CMS_COMPANY_PROFILE,
                UpdatedBy: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
            create: {
                tag: GALLERY_LANDING_PAGE + "_" + formatTag,
                value: urlResponse.resizedPath,
                page_group: CMS_COMPANY_PROFILE,
                UpdatedBy: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
        return serverResponseFormat("OK", false, null);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

export const getGalleryData = async () => {
    try {
        let getAllGalleryData = await prisma.CMSPageVariable.findMany({
            where: {
                tag: {
                    startsWith: "GALLERY_LANDING_PAGE",
                },
                page_group: CMS_COMPANY_PROFILE,
            },
            select: {
                id: true,
                tag: true,
                value: true,
            },
        });

        let responseData = {};
        getAllGalleryData.forEach((item) => {
            responseData[item.tag.replace("GALLERY_LANDING_PAGE_", "")] =
                item.value;
        });
        return serverResponseFormat(responseData, false, null);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

export const addAndUpdateActivity = async (tag, name, formData) => {
    try {
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }
        const ACTIVITY_LANDING_PAGE = "ACTIVITY_LANDING_PAGE";
        let imageBlob = formData.get("image");

        if (!imageBlob || !tag || !name) {
            throw new Error("Harus disertai gambar dan tag!");
        }

        const imageUploadBody = (buffer, extension) => {
            let formData = new FormData();
            formData.append("image", buffer);
            formData.append("ext", extension);
            return formData;
        };
        let uploadBody = imageUploadBody(
            imageBlob,
            imageBlob.type.split("/")[1]
        );
        let urlResponse = await uploadImageToBackendWithSize(uploadBody, {
            width: 370,
            height: 444,
        });
        let formatTag = tag.toUpperCase();

        let stringifyData = JSON.stringify({
            tag,
            name,
            imageUrl: urlResponse.resizedPath,
        });

        let addToDb = await prisma.CMSPageVariable.upsert({
            where: {
                tag: ACTIVITY_LANDING_PAGE + "_" + formatTag,
            },
            update: {
                value: stringifyData,
                page_group: CMS_COMPANY_PROFILE,
                UpdatedBy: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
            create: {
                tag: ACTIVITY_LANDING_PAGE + "_" + formatTag,
                value: stringifyData,
                page_group: CMS_COMPANY_PROFILE,
                UpdatedBy: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
        revalidatePath(URL_TANART.ADMIN_CMS_COMPANY_PROFILE);
        return serverResponseFormat(
            { tag, name, imageUrl: urlResponse.resizedPath },
            false,
            null
        );
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

export const getActivityData = async () => {
    try {
        let getAllGalleryData = await prisma.CMSPageVariable.findMany({
            where: {
                tag: {
                    startsWith: "ACTIVITY_LANDING_PAGE",
                },
                page_group: CMS_COMPANY_PROFILE,
            },
            select: {
                id: true,
                tag: true,
                value: true,
            },
        });

        getAllGalleryData = getAllGalleryData.map((item) => {
            let itemParsed = JSON.parse(item.value);
            itemParsed["id"] = item.id;
            return itemParsed;
        });
        return serverResponseFormat(getAllGalleryData, false, null);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

export const deleteActivityData = async (idTag) => {
    try {
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }

        let deleteData = await prisma.CMSPageVariable.delete({
            where: {
                id: idTag,
            },
        });
        return serverResponseFormat("OK", false, null);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

export const addAndUpdateContact = async (data) => {
    try {
        let session = await auth();
        if (session.user?.role !== "ADMIN") {
            throw new Error("Anda tidak memiliki akses");
        }
        const CONTACT_LANDING_PAGE = "CONTACT_LANDING_PAGE";

        let dataMapped = {
            instagram: data?.instagram || "null",
            x: data?.x || "null",
            gmail: data?.gmail || "null",
            alamat: data?.alamat || "null",
        };
        let stringifyData = JSON.stringify(dataMapped);
        let addToDb = await prisma.CMSPageVariable.upsert({
            where: {
                tag: CONTACT_LANDING_PAGE,
            },
            update: {
                value: stringifyData,
                page_group: CMS_COMPANY_PROFILE,
                UpdatedBy: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
            create: {
                tag: CONTACT_LANDING_PAGE,
                value: stringifyData,
                page_group: CMS_COMPANY_PROFILE,
                UpdatedBy: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });

        return serverResponseFormat("OK", false, null);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};

export const getContact = async () => {
    try {
        let getContactData = await prisma.CMSPageVariable.findUnique({
            where: {
                tag: "CONTACT_LANDING_PAGE",
                page_group: CMS_COMPANY_PROFILE,
            },
            select: {
                id: true,
                tag: true,
                value: true,
            },
        });

        let parsed = JSON.parse(getContactData.value);
        return serverResponseFormat(parsed, false, null);
    } catch (err) {
        return serverResponseFormat(null, true, err.message);
    }
};
