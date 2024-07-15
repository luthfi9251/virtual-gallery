"use client";
import {
    Card,
    CardSection,
    Text,
    Stack,
    Container,
    Overlay,
    Group,
    Avatar,
} from "@mantine/core";
import Image from "next/image";
import myImageLoader, { karyaImageLoader } from "@/loader/imageLoader";

function Status({ status }) {
    if (status === "DIKURASI") {
        return (
            <Text
                data-cy="text-status"
                className="absolute bg-tanArt-greyLight ronded top-1 right-1 text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white cursor-default"
            >
                Pending
            </Text>
        );
    } else if (status === "TERKURASI") {
        return (
            <Text
                data-cy="text-status"
                className="absolute bg-tanArt-yellow ronded top-1 right-1 text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white cursor-default"
            >
                Terkurasi
            </Text>
        );
    } else if (status === "SELESAI") {
        return (
            <Text
                data-cy="text-status"
                className="absolute bg-tanArt-green ronded top-1 right-1 text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white cursor-default"
            >
                Selesai
            </Text>
        );
    } else if (status === "TERJUAL") {
        return (
            <>
                <Text
                    data-cy="text-status"
                    className="absolute inset-0 text-centerS flex justify-center items-center font-bold text-white z-20 text-3xl cursor-default"
                >
                    Terjual
                </Text>
                <Overlay
                    color="#000"
                    backgroundOpacity={0.5}
                    className="rounded z-10"
                />
            </>
        );
    } else {
        return null;
    }
}
let STATUS_DEF = ["PENDING", "TERKURASI", "SELESAI", "TERJUAL"];

export default function CardKarya({
    data,
    index,
    clickHandler,
    statusSection = null,
}) {
    return (
        <Card
            className="p-3 shadow border min-w-[150px] w-full max-w-[300px] min-h-[200px] h-full max-h-96 flex flex-col items-center hover:bg-slate-100 transition-all cursor-pointer"
            onClick={() => clickHandler(data)}
            data-cy="card-karya"
        >
            <CardSection className=" rounded aspect-[4/5] w-full max-h-[230px] m-0 p-10 relative bg-tanArt-greyDark">
                <Image
                    fill
                    src={data?.lukisan_url}
                    loader={karyaImageLoader}
                    quality={30}
                    className=" object-cover"
                    loading={index < 6 ? "eager" : "lazy"}
                    alt="thumbnail"
                />
                {statusSection ? (
                    statusSection
                ) : (
                    <Status status={data?.status} />
                )}
            </CardSection>
            <Group gap="xs" className="my-1 self-start">
                <Avatar
                    src={
                        data?.foto_profil
                            ? myImageLoader({
                                  src: data?.foto_profil,
                                  width: 100,
                                  quality: 75,
                              })
                            : "/EMPTY_USER_PROFILE.png"
                    }
                    variant="transparent"
                    size="xs"
                    alt="Image"
                />
                <Text
                    data-cy="text-nama_lengkap"
                    className="max-w-[170px] line-clamp-1 font-light text-[10px] text-tanArt-grey"
                >
                    {data?.nama_lengkap}
                </Text>
            </Group>
            <Stack gap={5} className=" grow self-start" justify="space-between">
                <Text
                    className=" font-medium line-clamp-1"
                    data-cy="text-judul"
                >
                    {data?.judul}
                </Text>
                <Text className="grow text-[10px] line-clamp-3">
                    {data?.deskripsi}
                </Text>
                <Group className=" justify-self-end">
                    <Text className="font-light text-[10px] text-tanArt-grey">
                        {data?.created_at
                            ? new Date(data?.created_at).getFullYear()
                            : null}
                    </Text>
                    <Text className="font-light text-[10px] text-tanArt-grey">
                        {data?.panjang + ""} x {data?.lebar + ""} cm
                    </Text>
                </Group>
            </Stack>
        </Card>
    );
}
