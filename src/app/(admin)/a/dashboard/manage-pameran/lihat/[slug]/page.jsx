import Image from "next/image";
import { Title, Spoiler, Text, Stack } from "@mantine/core";
import { pameranBannerLoader, pameranSampulLoader } from "@/loader/imageLoader";
import { capitalizeFirstLetterOfEachWord } from "@/lib/formatter";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { formatTanggalMulaiSelesai } from "@/lib/formatter";
import InformationSection from "./InformationSection";
import KaryaSection from "./KaryaSection";
import { profileLoaderFotoProfil } from "@/loader/imageLoader";
import { getPameranBySlugAdmin } from "@/actions/admin";

export default async function Page(props) {
    let dataPameran = await getPameranBySlugAdmin(props.params.slug);

    if (dataPameran.isError) {
        return (
            <div className=" w-full flex justify-center h-full">
                <div className="w-full max-w-[1300px] flex flex-col p-1 md:p-2 items-center justify-center h-full">
                    <p>Maaf, Pameran telah ditutup!</p>
                </div>
            </div>
        );
    }
    dataPameran = dataPameran.data;
    return (
        <div className=" w-full flex justify-center">
            <div className="w-full max-w-[1300px] flex flex-col p-1 md:p-2 mt-[60px]">
                <Image
                    width={1300}
                    height={520}
                    alt={props.params.slug}
                    src={dataPameran?.banner_url}
                    loader={pameranBannerLoader}
                    className="w-full aspect-[5/2] object-cover"
                />
                <div className="flex md:justify-between items-start md:items-center flex-col md:flex-row text-white bg-tanArtBlue-600 p-3 md:p-10 gap-6 md:gap-2">
                    <Title className="font-semibold text-2xl md:text-4xl grow">
                        {capitalizeFirstLetterOfEachWord(
                            dataPameran?.nama_pameran || ""
                        )}
                    </Title>
                    <div className="flex items-center justify-center gap-2 basis-1/3">
                        <MdOutlineCalendarMonth className=" h-4 w-4 lg:h-8 lg:w-8 inline-block" />
                        <span className=" font-bold text-sm md:text-md inline-block">
                            {formatTanggalMulaiSelesai(
                                dataPameran?.tgl_mulai,
                                dataPameran?.tgl_selesai
                            )}
                        </span>
                    </div>
                </div>
                <InformationSection dataPameran={dataPameran} />
                <KaryaSection
                    listKarya={dataPameran.karya}
                    idPameran={dataPameran.id_pameran}
                />
                <div className=" flex flex-col lg:flex-row items-center bg-tanArtBlue-600 p-3 lg:py-0 lg:px-5 mt-[75px] lg:mt-[150px]">
                    <Image
                        width={300}
                        height={300}
                        alt="profile"
                        src={
                            dataPameran.user.foto_profil ||
                            "/EMPTY_USER_PROFILE.png"
                        }
                        loader={
                            dataPameran.user.foto_profil &&
                            profileLoaderFotoProfil
                        }
                        className=" object-cover aspect-aquare rounded-[50%] w-[150px] h-[150px] lg:w-[250px] lg:h-[250px] p-2 bg-white lg:self-start lg:-translate-y-1/2"
                    />
                    <Spoiler
                        maxHeight={150}
                        className=" py-2 mx-2 lg:mx-5 lg:px-0 lg:py-5 text-white flex flex-col gap-5 items-center lg:items-start"
                        showLabel={
                            <p className=" text-sm text-white">Show More</p>
                        }
                        hideLabel={<p className=" text-sm text-white">Hide</p>}
                    >
                        <Stack className="gap-2">
                            <Title className="text-2xl md:text-4xl text-center lg:text-left">
                                {dataPameran.user.nama_lengkap}
                            </Title>
                            <Text className="text-center lg:text-left font-light text-sm">
                                @{dataPameran.user.username}
                            </Text>
                            <p className="text-sm font-light">
                                {dataPameran.user.bio}
                            </p>
                        </Stack>
                    </Spoiler>
                </div>
            </div>
        </div>
    );
}
