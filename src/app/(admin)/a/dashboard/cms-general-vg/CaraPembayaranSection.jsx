"use client";
import BaseRichTextEditor from "@/components/RichTextEditor";
import { Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function CaraPembayaran() {
    return (
        <div className="p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black">
                Cara Pembayaran
            </Title>
            <div>
                <BaseRichTextEditor />
            </div>
            <Button>Ubah</Button>
        </div>
    );
}
