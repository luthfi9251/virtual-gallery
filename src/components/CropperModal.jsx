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
import { uploadProfilePicture } from "@/actions/user";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";

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
    idUser,
    opened,
    open,
    close,
    type,
    setPreview,
}) {
    const inputRef = useRef(null);
    const cropperRef = useRef(null);
    const [image, setImage] = useState(null);
    const [imageExt, setImageExt] = useState(null);

    const onCrop = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            const form = new FormData();
            canvas.toBlob((blob) => {
                if (blob) {
                    form.append("image", blob);
                    form.append("ext", imageExt);
                    form.append("type", "profile");
                    uploadProfilePicture(form, idUser)
                        .then((res) => {
                            notifications.show({
                                title: "Berhasil",
                                message: "Berhasil memperbaharui foto profil!",
                            });
                        })
                        .catch((err) => {
                            notifications.show({
                                color: "red",
                                title: "Gagal",
                                message: "Gagal memperbaharui foto profil!",
                            });
                        });
                }
            }, "image/jpeg");
            setPreview(canvas.toDataURL());
            setImage(null);
            setImageExt(null);
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
                            console.log({ file, ext: file.name.split(".")[1] });
                            setImageExt(file.name.split(".")[1]);
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
