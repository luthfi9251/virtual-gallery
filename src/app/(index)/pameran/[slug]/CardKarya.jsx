"use client";
import Image from "next/image";
import { SimpleGrid, Stack, Text, Group, Modal } from "@mantine/core";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function CardKarya({ src, data }) {
    const pathname = usePathname();
    return (
        <Link
            href={`${pathname}?karyaId=${data.id_karya}`}
            scroll={false}
            className="w-full shadow rounded-lg overflow-hidden relative group"
        >
            <Image
                width={400}
                height={600}
                src={src}
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
        </Link>
    );
}

export default function CardKaryaWrapper({ karya }) {
    // karya = DUMMY_ARRAY;
    // const COLUMN = 4;
    const params = useSearchParams();
    const karyaId = params.get("karyaId");

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
                                />
                            ))}
                        </Stack>
                    );
                })}
            </SimpleGrid>
        </>
    );
}
