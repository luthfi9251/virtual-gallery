"use client";
import { SimpleGrid, Text, Stack, Button } from "@mantine/core";
import { forwardRef } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import UploadIcon from "@/components/icons/UploadIcon";

export const DropzoneImage = forwardRef(
    ({ setImage, setAspect, setExt, setFile }, ref) => {
        const getHeightAndWidthFromDataUrl = (dataURL) =>
            new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        height: img.height,
                        width: img.width,
                    });
                };
                img.src = dataURL;
            });

        return (
            <Dropzone
                className="grow flex items-center justify-center w-full lg:w-auto max-w-[1080]"
                accept={IMAGE_MIME_TYPE}
                multiple={false}
                openRef={ref}
                onDrop={async (files) => {
                    let imgUrl = URL.createObjectURL(files[0]);
                    let { width, height } = await getHeightAndWidthFromDataUrl(
                        imgUrl
                    );
                    let aspect =
                        width - height > 20
                            ? "3/2"
                            : width - height < -20
                            ? "4/5"
                            : "1/1";
                    setAspect(aspect);
                    setImage(imgUrl);
                    setExt(files[0].name.split(".")[1]);
                    setFile(files[0]);
                }}
            >
                <Stack
                    className="w-full h-full"
                    justify="center"
                    align="center"
                >
                    <UploadIcon w={80} h={80} />
                    <Text className=" font-medium text-lg text-center">
                        Silakan pilih file atau seret dan letakkan di sini
                    </Text>
                    <Text className="text-center text-sm">
                        Sebaiknya gunakan file JPG dengan kualitas tinggi, file
                        berukuran kurang 20 MB
                    </Text>
                </Stack>
            </Dropzone>
        );
    }
);
