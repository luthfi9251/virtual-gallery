"use client";
import Image from "next/image";
import { Title, Text, TextInput, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import ImageModalSelection from "@/components/ImageModalSelection";
import { useProfileFormContext } from "./ProfileProvider";
import { ProfileContext } from "./ProfileProvider";
import { useContext } from "react";
import {
    profileLoaderFotoProfil,
    profileLoaderFotoSampul,
} from "@/loader/imageLoader";

export default function HeadEditSection() {
    const sampulModalDisclosure = useDisclosure(false);
    const heroModalDisclosure = useDisclosure(false);
    const form = useProfileFormContext();
    const {
        setProfilBlob,
        setSampulBlob,
        fotoProfil,
        fotoSampul,
        setFotoProfil,
        setFotoSampul,
    } = useContext(ProfileContext);

    const handleOnCropSampul = (canvas) => {
        setFotoSampul(canvas.toDataURL());
        canvas.toBlob((blob) => {
            if (blob) {
                setSampulBlob(blob);
            }
        });
    };
    const handleOnCropProfil = (canvas) => {
        setFotoProfil(canvas.toDataURL());
        canvas.toBlob((blob) => {
            if (blob) {
                setProfilBlob(blob);
            }
        });
    };

    return (
        <div className="w-full rounded-lg relative shadow-lg">
            <div className="group w-full aspect-[3/1] md:aspect-[5/1] relative rounded-lg">
                <div className=" backdrop-blur-sm group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                    <Button onClick={heroModalDisclosure[1].open}>
                        Ubah Gambar
                    </Button>
                </div>
                <Image
                    fill
                    src={fotoSampul || "/default/2.jpg"}
                    loader={fotoSampul && profileLoaderFotoSampul}
                    className="object-cover rounded-lg bg-slate-200"
                    loading="eager"
                    alt="foto-background"
                />
                <ImageModalSelection
                    opened={heroModalDisclosure[0]}
                    close={heroModalDisclosure[1].close}
                    stencilProps={{
                        aspectRatio: 5 / 1,
                    }}
                    handleOnCrop={handleOnCropSampul}
                />
            </div>
            <div className="flex flex-col items-center relative">
                <div className="group relative md:absolute md:-top-1/3 aspect-square w-52 z-40">
                    <div className=" rounded-[50%] backdrop-blur-sm group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-50 inset-0  justify-center items-center">
                        <Button onClick={sampulModalDisclosure[1].open}>
                            Ubah Gambar
                        </Button>
                    </div>
                    <Image
                        fill
                        loading="eager"
                        src={fotoProfil || "/default/1.jpg"}
                        loader={fotoProfil && profileLoaderFotoProfil}
                        className="object-cover rounded-[50%] p-2 bg-white shadow-lg"
                        alt="foto-profil"
                    />
                    <ImageModalSelection
                        opened={sampulModalDisclosure[0]}
                        close={sampulModalDisclosure[1].close}
                        stencilProps={{
                            aspectRatio: 1 / 1,
                        }}
                        handleOnCrop={handleOnCropProfil}
                    />
                </div>
                <div className="w-full h-24 hidden md:block"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 p-3 md:p-10">
                    <TextInput
                        className=""
                        label="Nama Lengkap"
                        withAsterisk
                        key={form.key("nama_lengkap")}
                        {...form.getInputProps("nama_lengkap")}
                    />
                    <TextInput
                        className=""
                        label="Username"
                        leftSection="@"
                        withAsterisk
                        key={form.key("username")}
                        {...form.getInputProps("username")}
                    />
                    <Group grow align="flex-start">
                        <TextInput
                            label="Tempat Lahir"
                            name="tempat_lhr"
                            withAsterisk
                            key={form.key("tempat_lhr")}
                            {...form.getInputProps("tempat_lhr")}
                        />
                        <DateInput
                            label="Tanggal Lahir"
                            valueFormat="DD MMMM YYYY"
                            maxDate={new Date()}
                            withAsterisk
                            key={form.key("tgl_lhr")}
                            {...form.getInputProps("tgl_lhr")}
                        />
                    </Group>
                </div>
            </div>
        </div>
    );
}
