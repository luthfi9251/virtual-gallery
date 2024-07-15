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
    ScrollAreaAutosize,
    Button,
    ActionIcon,
} from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import Image from "next/image";
import { AvatarProfileSmall } from "./AvatarNavbar";
import { useState } from "react";
import { karyaImageLoader } from "@/loader/imageLoader";
import { SlSizeFullscreen } from "react-icons/sl";
import { monthAndyearFormatter, formatToRupiah } from "@/lib/formatter";

export const KuratorComment = ({ userInfo, kurasiData }) => {
    return (
        <div
            className="flex gap-2 shadow-lg border p-2 rounded"
            data-cy="card-komen"
        >
            <AvatarProfileSmall size="md" />
            <Stack gap="xs">
                <Group>
                    <Text
                        className="text-sm font-medium"
                        data-cy="text-nama_lengkap"
                    >
                        {userInfo.nama_lengkap}
                    </Text>
                    <div className="h-2 w-2 rounded-[50%] bg-black"> </div>
                    <Text className="text-[10px]">
                        Kurator sejak{" "}
                        {monthAndyearFormatter(userInfo.verified_at)}
                    </Text>
                </Group>
                <Text className="text-xs font-light" data-cy="text-komentar">
                    {kurasiData.komentar}
                </Text>
                <Stack gap={0} className="cursor-default">
                    <Text className=" font-medium text-xs">Nilai</Text>
                    <Text
                        className=" font-medium text-xs p-1 border border-black  rounded self-start "
                        data-cy="text-range_harga"
                    >
                        {formatToRupiah(kurasiData.harga_min)} -{" "}
                        {formatToRupiah(kurasiData.harga_maks)}
                    </Text>
                </Stack>
            </Stack>
        </div>
    );
};

// export default function BaseModalKarya({
//     disclosure,
//     children,
//     imageSrc = null,
// }) {
//     let [opened, { open, close }] = disclosure;

//     return (
//         <Modal
//             opened={opened}
//             onClose={close}
//             size="auto"
//             centered
//             styles={{ body: { padding: 0 } }}
//         >
//             <SimpleGrid
//                 cols={{ base: 1, sm: 2 }}
//                 className="w-[90vw] min-h-[80vh] md:w-[80vw] md:h-[80vh] max-w-[1100px] px-3 md:px-5 py-1 md:py-3 md:pt-1 md:gap-7"
//             >
//                 <div className="relative w-full h-[400px] md:h-[400px] md:sticky md:top-14">
//                     <Image
//                         src={imageSrc}
//                         loader={karyaImageLoader}
//                         quality={100}
//                         fill
//                         loading="eager"
//                         alt="preview"
//                         className="object-contain rounded bg-slate-100"
//                     />
//                 </div>
//                 {children}
//             </SimpleGrid>
//         </Modal>
//     );
// }
export default function BaseModalKarya({
    disclosure,
    children,
    imageSrc = null,
}) {
    let [opened, { open, close }] = disclosure;
    const { ref, toggle, fullscreen } = useFullscreen();

    return (
        <Modal
            opened={opened}
            onClose={close}
            size="1300px"
            styles={{
                content: { overflowY: "visible", height: "90vh" },
                body: { height: "calc(100% - 60px)", overflowY: "visible" },
            }}
        >
            <div className="h-full md:overflow-visible overflow-y-auto">
                <div className="h-full w-full p-1 md:overflow-visible md:flex-1 md:flex items-start flex-col md:flex-row gap-4">
                    <div className="h-[400px] md:h-full w-full relative">
                        <Image
                            ref={ref}
                            src={imageSrc}
                            loader={karyaImageLoader}
                            quality={100}
                            fill
                            loading="eager"
                            alt="preview"
                            className="object-contain rounded bg-slate-100"
                        />
                        <ActionIcon
                            variant="filled"
                            aria-label="Settings"
                            className="absolute bottom-1 right-1"
                            onClick={toggle}
                        >
                            <SlSizeFullscreen
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </div>
                    <div className="mt-4 md:mt-0 md:h-full w-full">
                        {children}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
