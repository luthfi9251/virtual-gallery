"use client";
import {
    Modal,
    SimpleGrid,
    Stack,
    Title,
    Group,
    Text,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
} from "@mantine/core";
import Image from "next/image";
import { AvatarProfileSmall } from "./AvatarNavbar";
import { useState } from "react";
import { karyaImageLoader } from "@/loader/imageLoader";

export default function BaseModalKarya({
    disclosure,
    children,
    imageSrc = null,
}) {
    let [opened, { open, close }] = disclosure;

    return (
        <Modal
            opened={opened}
            onClose={close}
            size="auto"
            centered
            styles={{ body: { padding: 0 } }}
        >
            <SimpleGrid
                cols={{ base: 1, sm: 2 }}
                className="w-[90vw] md:w-[70vw] max-w-[1100px] px-3 md:px-5 py-1 md:py-3 md:pt-1 md:gap-7"
            >
                <div className="relative h-fit md:sticky top-0">
                    <Image
                        src={imageSrc}
                        loader={karyaImageLoader}
                        quality={100}
                        width={600}
                        height={600}
                        loading="eager"
                        alt="preview"
                        className="aspect-[4/5] object-contain rounded bg-slate-100"
                    />
                </div>
                {children}
            </SimpleGrid>
        </Modal>
    );
}
