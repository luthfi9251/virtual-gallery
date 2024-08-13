import { getMostViewedPameranOpen } from "@/actions/pameran";
import {
    capitalizeFirstLetterOfEachWord,
    formatTanggalMulaiSelesaiLandingPage,
} from "@/lib/formatter";
import { pameranBannerLoader } from "@/loader/imageLoader";
import { URL_TANART } from "@/variables/url";
import { SimpleGrid, Title, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default async function PameranFeaturedSection() {
    let dataPameran = await getMostViewedPameranOpen();
    if (!dataPameran.isError) {
        dataPameran = dataPameran.data;
        return (
            <div className="flex flex-col justify-center items-center p-5 md:p-10 gap-10 bg-tanArtBlue-600 text-white">
                <Title className="text-center">PAMERAN BERLANGSUNG</Title>
                {dataPameran.slice(0, 2).map((item, i) => {
                    return (
                        <SimpleGrid
                            className="w-full max-w-[1000px]"
                            cols={{ base: 1, md: 2 }}
                            key={i}
                        >
                            <div className="w-full">
                                <Image
                                    alt={item?.slug}
                                    src={item?.banner_url}
                                    loader={pameranBannerLoader}
                                    width={800}
                                    height={800}
                                    className="w-full aspect-[3/2] object-cover max-w-[600px]"
                                />
                            </div>
                            <div className="p-5 flex flex-col justify-center border-b-2 border-white gap-5">
                                <Text
                                    className="text-3xl font-semibold hover:underline"
                                    component={Link}
                                    href={URL_TANART.PAMERAN_VIEW(item?.slug)}
                                >
                                    {capitalizeFirstLetterOfEachWord(
                                        item?.nama_pameran || ""
                                    )}
                                </Text>
                                <Text className="font-light text-lg">
                                    {formatTanggalMulaiSelesaiLandingPage(
                                        item?.tgl_mulai,
                                        item?.tgl_selesai
                                    )}
                                </Text>
                            </div>
                        </SimpleGrid>
                    );
                })}
            </div>
        );
    }
}
