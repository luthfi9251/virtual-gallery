"use client";
import {
    Modal,
    FileInput,
    Button,
    SimpleGrid,
    Stack,
    ScrollArea,
} from "@mantine/core";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import {
    Cropper,
    FixedCropper,
    CircleStencil,
    ImageRestriction,
} from "react-advanced-cropper";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

const ProfilePictureCropper = forwardRef(({ image }, ref) => {
    return (
        <FixedCropper
            ref={ref}
            stencilComponent={CircleStencil}
            className="example__cropper"
            backgroundClassName="example__cropper-background"
            src={image}
            stencilSize={{
                width: 280,
                height: 280,
            }}
            imageRestriction={ImageRestriction.stencil}
        />
    );
});

const CropperWrapper = forwardRef(({ type, image }, ref) => {
    if (type === "PROFILE_PICTURE") {
        return <ProfilePictureCropper ref={ref} image={image} />;
    } else {
        return (
            <Cropper
                ref={ref}
                className="example__cropper"
                backgroundClassName="example__cropper-background"
                src={image}
            />
        );
    }
});

export default function CropperModal({
    opened,
    open,
    close,
    type,
    setPreview,
}) {
    const inputRef = useRef(null);
    const cropperRef = useRef(null);
    const [image, setImage] = useState(null);

    const onCrop = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            // const newTab = window.open();
            // if (newTab && canvas) {
            //     newTab.document.body.innerHTML = `<img src="${canvas.toDataURL()}"></img>`;
            // }
            setPreview(canvas.toDataURL());
            setImage(null);
            close();
        }
    };

    return (
        <Modal opened={opened} onClose={close} title="Pilih Foto Profil">
            {!image ? (
                <div> </div>
            ) : (
                <CropperWrapper type={type} ref={cropperRef} image={image} />
            )}
            <Stack align="flex-start" w={"100%"}>
                <FileInput
                    onChange={(file) => {
                        if (file) {
                            let URLIMG = URL.createObjectURL(file);
                            setImage(URLIMG);
                        } else {
                            setImage("/EMPTY_USER_PROFILE.jpg");
                        }
                    }}
                    w="100%"
                    label="Unggah Foto Profil"
                    accept="image/png,image/jpeg"
                    description="Foto maksimal berukuran 2 MB"
                    placeholder="Pilih Foto"
                />
                <Button onClick={onCrop} size="sm">
                    Simpan
                </Button>
            </Stack>
        </Modal>
    );
}
