"use client";

function classifiedImageSize(width) {
    if (width < 300) {
        return "square100";
    } else {
        return "square300";
    }
}
const IMAGE_SERVICE_URL = "http://imageservice.luthficode.my.id/img";

export default function myImageLoader({ src, width, quality }) {
    let classifiedFolder = classifiedImageSize(width);
    return `${IMAGE_SERVICE_URL}/${classifiedFolder}/${src}`;
}

export const karyaImageLoader = ({ src, width, quality }) => {
    if (quality < 50) {
        return `${IMAGE_SERVICE_URL}/thumbnailBase/${src}`;
    } else {
        return `${IMAGE_SERVICE_URL}/original/${src}`;
    }
};
