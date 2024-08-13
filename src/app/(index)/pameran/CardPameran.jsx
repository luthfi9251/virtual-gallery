import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Title, Group } from "@mantine/core";
import { AvatarProfileSmall } from "@/components/AvatarNavbar";
import { MdOutlineCalendarMonth } from "react-icons/md";
import {
    pameranBannerLoader,
    profileLoaderFotoProfil,
} from "@/loader/imageLoader";
import { formatTanggalMulaiSelesai } from "@/lib/formatter";
import { capitalizeFirstLetterOfEachWord } from "@/lib/formatter";

import Link from "next/link";
import { URL_TANART } from "@/variables/url";

export default function CardPameran({ dataPameran, isMostViewed = false }) {
    return (
        <div className="shadow flex flex-col rounded-xl overflow-hidden">
            <Image
                width={800}
                height={800}
                alt={dataPameran?.slug}
                src={dataPameran?.banner_url}
                loader={pameranBannerLoader}
                className="w-full aspect-[5/2] object-cover"
            />
            <div className="flex flex-col px-2 md:px-3 xl:px-5 pb-5 h-full">
                <Title
                    order={3}
                    className={twMerge(
                        "grow my-5 block hover:underline",
                        isMostViewed
                            ? "text-lg md:text-2xl"
                            : " text-md md:text-lg"
                    )}
                    component={Link}
                    href={URL_TANART.PAMERAN_VIEW(dataPameran?.slug)}
                >
                    {capitalizeFirstLetterOfEachWord(
                        dataPameran?.nama_pameran || ""
                    )}
                </Title>
                <div className="w-full flex justify-between">
                    <Group className="gap-0 md:gap-2">
                        <AvatarProfileSmall
                            src={dataPameran?.foto_profil}
                            alt="it's me"
                            size={30}
                        />
                        <p className="text-xs capitalize">
                            {dataPameran?.nama_lengkap}
                        </p>
                    </Group>
                    <div className="flex items-center gap-2">
                        <MdOutlineCalendarMonth className="text-tanArtBlue-600 h-2 w-2 lg:h-7 lg:w-7 inline-block" />
                        <span className="text-tanArtBlue-600 font-bold text-xs">
                            {formatTanggalMulaiSelesai(
                                dataPameran?.tgl_mulai,
                                dataPameran?.tgl_selesai
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
