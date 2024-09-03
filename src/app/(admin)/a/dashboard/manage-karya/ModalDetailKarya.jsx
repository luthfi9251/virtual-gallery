"use client";

import {
    Title,
    Stack,
    Text,
    Group,
    NumberFormatter,
    Spoiler,
    SimpleGrid,
    UnstyledButton,
    Button,
    ActionIcon,
} from "@mantine/core";
import BaseModalKarya, { KuratorCommentV2 } from "@/components/BaseModalKarya";
import { useQuery } from "@tanstack/react-query";
import { getKaryaByID } from "@/actions/karya";
import { AvatarProfileSmall } from "@/components/AvatarNavbar";
import { getAllKurasiKaryaComment } from "@/actions/kurator";
import LoadingWrapper from "@/components/LoadingWrapper";
import { useEffect, useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import clsx from "clsx";
import Link from "next/link";
import { URL_TANART } from "@/variables/url";

export default function ModalDetailKarya({ disclosure, karyaId }) {
    const [kurasiShow, setKurasiShow] = useState(false);
    const { data, isLoading } = useQuery({
        queryKey: ["karya_by_id", karyaId],
        queryFn: async () => {
            if (karyaId) {
                let response = await getKaryaByID(karyaId);
                if (!response.isError) {
                    return response.data;
                } else {
                    throw response.error;
                }
            }
        },
        staleTime: 1000 * 60 * 3,
    });

    return (
        <BaseModalKarya
            disclosure={disclosure}
            imageSrc={data?.lukisan_url}
            isLoading={isLoading}
        >
            <Stack gap="xs" className="h-full md:overflow-y-auto">
                <ActionIcon
                    variant="transparent"
                    radius="lg"
                    className={clsx("mb-5", !kurasiShow && "hidden")}
                    size="lg"
                    onClick={() => setKurasiShow(false)}
                >
                    <FaRegArrowAltCircleLeft className="w-full h-full" />
                </ActionIcon>
                <Group>
                    <AvatarProfileSmall size={30} src={data?.foto_profil} />
                    <Text className="text-sm">{data?.nama_lengkap}</Text>
                </Group>
                <Title className="font-medium text-lg md:text-2xl xl:text-4xl">
                    {data?.judul}
                </Title>
                {kurasiShow ? (
                    <KurasiKuratorSection data={data} />
                ) : (
                    <>
                        <KaryaInformationSection data={data} />
                        <SimpleGrid cols={{ base: 1, md: 2 }}>
                            <p className="font-medium text-lg md:text-2xl xl:text-3xl">
                                <span className="block font-light text-base">
                                    Harga
                                </span>
                                <NumberFormatter
                                    prefix="Rp. "
                                    value={data?.harga}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    className="font-bold"
                                />
                            </p>
                            <div className="flex flex-col md:flex-row md:items-end gap-3">
                                <UnstyledButton
                                    className="text-sm underline w-[80px] text-center"
                                    onClick={() => setKurasiShow(!kurasiShow)}
                                >
                                    {kurasiShow ? "Kembali" : "Lihat Kurasi"}
                                </UnstyledButton>
                            </div>
                        </SimpleGrid>
                    </>
                )}
            </Stack>
        </BaseModalKarya>
    );
}

function KaryaInformationSection({ data }) {
    return (
        <>
            <Spoiler
                maxHeight={40}
                className="font-light text-sm xl:text-md"
                showLabel={<p className="text-xs">Show More</p>}
                hideLabel={<p className="text-xs">Hide</p>}
            >
                {data?.deskripsi}
            </Spoiler>
            <div className="grow">
                <table className="font-light text-sm xl:text-md">
                    <tbody>
                        <tr className="h-[20px]">
                            <td className="w-[90px]">Tahun</td>
                            <td>{new Date(data?.created_at).getFullYear()}</td>
                        </tr>
                        <tr className="h-[20px]">
                            <td className="w-[90px]">Media</td>
                            <td>{data?.media}</td>
                        </tr>
                        <tr className="h-[20px]">
                            <td className="w-[90px]">Teknik</td>
                            <td>{data?.teknik}</td>
                        </tr>
                        <tr className="h-[20px]">
                            <td className="w-[90px]">Aliran</td>
                            <td>{data?.aliran}</td>
                        </tr>
                        <tr className="h-[20px]">
                            <td className="w-[90px]">Ukuran</td>
                            <td>
                                {data?.panjang}x{data?.lebar} cm
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

function KurasiKuratorSection({ data }) {
    const kuratorQuery = useQuery({
        queryKey: ["kurator", "comment", data.id],
        queryFn: async () => await getAllKurasiKaryaComment(data.id),
    });

    return (
        <LoadingWrapper isLoading={kuratorQuery.isLoading}>
            <div className="grow overflow-x-auto">
                {kuratorQuery.data?.length == 0 && <p>Tidak ada kurasi</p>}
                {kuratorQuery.data?.map((item, key) => {
                    return (
                        <KuratorCommentV2
                            key={key}
                            userInfo={item.userInfo}
                            kurasiData={item.kurasiData}
                        />
                    );
                })}
            </div>
        </LoadingWrapper>
    );
}
