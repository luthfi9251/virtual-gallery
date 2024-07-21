"use client";

import {
    Modal,
    FileInput,
    Button,
    SimpleGrid,
    Stack,
    ScrollArea,
} from "@mantine/core";
import {
    Cropper,
    FixedCropper,
    CircleStencil,
    ImageRestriction,
} from "react-advanced-cropper";
import { useEffect, useRef, useState, forwardRef } from "react";

export default function ImageModalSelection({
    opened,
    open,
    close,
    stencilProps,
    handleOnCrop,
}) {
    const cropperRef = useRef(null);
    const [image, setImage] = useState(null);

    const onCrop = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            handleOnCrop(canvas);
            close();
        }
    };

    return (
        <Modal opened={opened} onClose={close} title="Pilih Gambar">
            {!image ? (
                <div> </div>
            ) : (
                <Cropper
                    ref={cropperRef}
                    className="example__cropper"
                    backgroundClassName="example__cropper-background"
                    src={image}
                    stencilProps={stencilProps}
                />
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
                    label="Unggah Gambar"
                    accept="image/png,image/jpeg"
                    description="Foto maksimal berukuran 2 MB"
                    placeholder="Pilih Foto"
                />
                <Button onClick={onCrop} size="sm" className="self-center">
                    Simpan
                </Button>
            </Stack>
        </Modal>
    );
}
