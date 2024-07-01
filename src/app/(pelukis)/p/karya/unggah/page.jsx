import { SimpleGrid, Text, Stack, Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import UploadIcon from "@/components/icons/UploadIcon";
import DropzoneImage from "./DropzoneImage";

export default function Page() {
    return (
        <SimpleGrid cols={2} className="min-h-[calc(100vh-100px)]">
            <DropzoneImage />
            <div className="h-full">2</div>
        </SimpleGrid>
    );
}
