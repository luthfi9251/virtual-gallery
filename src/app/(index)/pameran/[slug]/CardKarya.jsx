"use client";
import Image from "next/image";
import { SimpleGrid, Stack, Text, Group, Modal } from "@mantine/core";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ModalDetailKarya from "./ModalDetailKarya";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { karyaImageLoader } from "@/loader/imageLoader";

function CardKarya({ src, data, openModal }) {
    return (
        <div
            className="w-full shadow rounded-lg overflow-hidden relative group"
            onClick={() => openModal(data.id_karya)}
        >
            <Image
                width={400}
                height={600}
                src={src}
                loader={karyaImageLoader}
                className="w-full"
                alt={data.judul}
                loading="eager"
            />
            <Stack className="p-2">
                <Text order={4} className="font-medium line-clamp-1">
                    {data.judul}
                </Text>
                <Text className="text-[10px] line-clamp-2">
                    {data.deskripsi}
                </Text>
                <Group className=" justify-self-end">
                    <Text className="font-light text-[10px] text-tanArt-grey">
                        {data?.created_at
                            ? new Date(data?.created_at).getFullYear()
                            : null}
                    </Text>
                    <Text className="font-light text-[10px] text-tanArt-grey">
                        {data.aliran}
                    </Text>
                </Group>
            </Stack>
            <div className="absolute inset-0 top-0 opacity-0 transition-all cursor-pointer group-hover:bg-black group-hover:opacity-20"></div>
        </div>
    );
}

export default function CardKaryaWrapper({ karya, idPameran }) {
    // karya = DUMMY_ARRAY;
    // const COLUMN = 4;
    const [selectedKarya, setSelectedKarya] = useState(null);
    const params = useSearchParams();
    const disclosure = useDisclosure();

    let handleOpenModal = (karyaId) => {
        setSelectedKarya(karyaId);
        disclosure[1].open();
    };

    let calculatedKarya = useMemo(() => {
        let resultColumn = [[], [], [], []];
        karya.forEach((item, i) => resultColumn[i % 4].push(item));
        return resultColumn;
    }, []);

    return (
        <>
            <SimpleGrid cols={{ base: 2, md: 4 }}>
                {calculatedKarya.map((item, i) => {
                    return (
                        <Stack key={i}>
                            {item.map((item2, idx) => (
                                <CardKarya
                                    key={idx}
                                    src={item2.lukisan_url}
                                    data={item2}
                                    openModal={handleOpenModal}
                                />
                            ))}
                        </Stack>
                    );
                })}
            </SimpleGrid>
            <ModalDetailKarya
                disclosure={disclosure}
                karyaId={selectedKarya}
                idPameran={idPameran}
            />
        </>
    );
}
