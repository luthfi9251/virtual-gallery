"use client";

function classifiedImageSize(width) {
    if (width < 300) {
        return "square100";
    } else {
        return "square300";
    }
}

export default function myImageLoader({ src, width, quality }) {
    let classifiedFolder = classifiedImageSize(width);
    let IMAGE_SERVICE_URL = "http://imageservice.luthficode.my.id/img";
    return `${IMAGE_SERVICE_URL}/${classifiedFolder}/${src}`;
}
