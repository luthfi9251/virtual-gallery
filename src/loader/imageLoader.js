"use client";

function classifiedImageSize(width) {
    if (width < 300) {
        return "square100";
    } else {
        return "square300";
    }
}
// const IMAGE_SERVICE_URL = "http://imageservice.luthficode.my.id/img";
const IMAGE_SERVICE_URL = process.env.NEXT_PUBLIC_IMAGE_SERVICE_URL;

export default function myImageLoader({ src, width, quality }) {
    // if (src.includes("picsum.photos")) {
    //     return src;
    // }
    // let classifiedFolder = classifiedImageSize(width);
    // return `${IMAGE_SERVICE_URL}/${classifiedFolder}/${src}`;
    return src;
}

export const karyaImageLoader = ({ src, width, quality }) => {
    // if (src.includes("picsum.photos")) {
    //     return src;
    // }

    // if (quality < 50) {
    //     return `${IMAGE_SERVICE_URL}/thumbnailBase/${src}`;
    // } else {
    //     return `${IMAGE_SERVICE_URL}/original/${src}`;
    // }
    return src;
};

export const pameranSampulLoader = ({ src, quality }) => {
    // if (src.includes("picsum.photos")) {
    //     return src;
    // }
    // if (quality < 50) {
    //     return `${IMAGE_SERVICE_URL}/250x334/${src}`;
    // } else {
    //     return `${IMAGE_SERVICE_URL}/original/${src}`;
    // }
    return src;
};

export const pameranBannerLoader = ({ src, quality }) => {
    // if (src.includes("picsum.photos")) {
    //     return src;
    // }
    // if (quality < 50) {
    //     return `${IMAGE_SERVICE_URL}/1000x334/${src}`;
    // } else {
    //     return `${IMAGE_SERVICE_URL}/original/${src}`;
    // }
    return src;
};

export const profileLoaderFotoProfil = ({ src, quality }) => {
    return src;
};
export const profileLoaderFotoSampul = ({ src, quality }) => {
    return src;
};

export const landingPageFeaturedLoader = ({ src }) => {
    return src;
};
