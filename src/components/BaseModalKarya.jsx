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
    ScrollArea,
} from "@mantine/core";
import Image from "next/image";
import { AvatarProfileSmall } from "./AvatarNavbar";
import { useState } from "react";
import { karyaImageLoader } from "@/loader/imageLoader";

export const KuratorComment = (props) => {
    return (
        <div className="flex gap-2 shadow-lg border p-2 rounded">
            <AvatarProfileSmall size="md" />
            <Stack gap="xs">
                <Group>
                    <Text className="text-sm font-medium">Ahmad Sukri</Text>
                    <div className="h-2 w-2 rounded-[50%] bg-black"> </div>
                    <Text className="text-[10px]">
                        Kurator sejak Oktober 2024
                    </Text>
                </Group>
                <Text className="text-xs font-light">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean feugiat arcu eget luctus pulvinar. Sed faucibus
                    egestas lacus. Mauris tempor tristique dolor et
                    pellentesque. Cras et viverra velit. Vivamus scelerisque ut
                    mi et posuere.
                </Text>
                <Stack gap={0} className="cursor-default">
                    <Text className=" font-medium text-xs">Nilai</Text>
                    <Text className=" font-medium text-xs p-1 border border-black  rounded self-start ">
                        Rp. 1.000.000 - Rp. 1.500.000
                    </Text>
                </Stack>
            </Stack>
        </div>
    );
};

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
                className="w-[90vw] min-h-[80vh] md:w-[80vw] md:h-[80vh] max-w-[1100px] px-3 md:px-5 py-1 md:py-3 md:pt-1 md:gap-7"
            >
                <div className="relative w-full h-[400px] md:h-[400px] md:sticky md:top-14">
                    <Image
                        src={imageSrc}
                        loader={karyaImageLoader}
                        quality={100}
                        fill
                        loading="eager"
                        alt="preview"
                        className="object-contain rounded bg-slate-100"
                    />
                </div>
                {children}
            </SimpleGrid>
        </Modal>
    );
}
