import Image from "next/image";
import { Title, Text } from "@mantine/core";
import dayjs from "dayjs";
import {
    profileLoaderFotoProfil,
    profileLoaderFotoSampul,
} from "@/loader/imageLoader";

export default function HeadSection({ data }) {
    return (
        <div className="w-full rounded-lg relative shadow-lg">
            <div className="w-full aspect-[3/1] md:aspect-[5/1] relative rounded-lg">
                <Image
                    fill
                    src={data?.fotoSampul || "/default/2.jpg"}
                    loader={data?.fotoSampul && profileLoaderFotoSampul}
                    className="object-cover rounded-lg"
                    loading="eager"
                />
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-end -translate-y-[25%] md:-translate-y-[50%] md:translate-x-10">
                <div className="relative aspect-square w-52">
                    <Image
                        fill
                        loading="eager"
                        src={data?.fotoProfil || "/default/1.jpg"}
                        loader={data?.fotoProfil && profileLoaderFotoProfil}
                        className="object-cover rounded-[50%] p-2 bg-white shadow-lg"
                    />
                </div>
                <div className="flex flex-col gap-3 md:block">
                    <div className="flex items-center md:gap-3 flex-col md:flex-row">
                        <Title>{data?.nama_lengkap}</Title>
                        <span className="w-2 h-2 bg-black rounded-[50%] hidden md:block"></span>
                        <span className="font-light text-sm text-center">
                            Bergabung sejak{" "}
                            {dayjs(data?.created_at).format("MMMM YYYY")}
                        </span>
                    </div>
                    <p className="font-light text-sm text-center md:text-left bg-tanArtBlue-600 rounded-sm md:inline-block p-1 text-white">
                        @{data?.username}
                    </p>
                    <p className="text-md font-light text-center md:text-left">
                        Semarang, Jawa Tengah
                    </p>
                </div>
            </div>
        </div>
    );
}
