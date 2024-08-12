"use client";
import { profileLoaderFotoProfil } from "@/loader/imageLoader";
import Image from "next/image";
import clsx from "clsx";
import { forwardRef } from "react";

const Avatar = forwardRef((props, ref) => {
    let { src, width = 40, height = 40 } = props;
    return (
        <Image
            width={width}
            height={height}
            src={src}
            loading="eager"
            alt="profilepict"
            ref={ref}
            {...props}
            className={clsx("rounded-full", props.className)}
        />
    );
});

export default Avatar;
