"use client";
import { SimpleGrid, Text, Stack, Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import UploadIcon from "@/components/icons/UploadIcon";
export default function DropzoneImage() {
    return (
        <div className="h-full flex items-center justify-center">
            <Dropzone
                className="h-full flex items-center"
                accept={IMAGE_MIME_TYPE}
            >
                <Stack
                    className="w-full h-full"
                    justify="center"
                    align="center"
                >
                    <UploadIcon w={80} h={80} />
                    <Text className=" font-medium text-lg">
                        Silakan pilih file atau seret dan letakkan di sini
                    </Text>
                    <Text className="text-center text-sm">
                        Sebaiknya gunakan file JPG dengan kualitas tinggi, file
                        berukuran kurang 20 MB
                    </Text>
                    <Button variant="outline">Pilih File</Button>
                </Stack>
            </Dropzone>
        </div>
    );
}
