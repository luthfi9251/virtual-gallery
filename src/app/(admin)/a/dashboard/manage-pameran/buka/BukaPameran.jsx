"use client";
import Image from "next/image";
import {
    Grid,
    GridCol,
    Stack,
    TextInput,
    Textarea,
    Text,
    Group,
    Button,
    Title,
    SimpleGrid,
    Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import CrossIcon from "@/components/icons/CrossIcon";
import "dayjs/locale/id";
import { PameranContext } from "./PameranProvider";
import { useContext, useMemo, useState, useRef } from "react";
import { usePameranFormContext } from "./PameranProvider";
import ImageModalSelection from "@/components/ImageModalSelection";
import KaryaSection from "./KaryaSection";

export default function BukaPameran({ senimanAll }) {
    const {
        pameranData,
        setPameranData,
        error,
        setHeroBlob,
        setSampulBlob,
        loading,
    } = useContext(PameranContext);
    const form = usePameranFormContext();

    //BAnner itu landscape atas
    //sampul foto profil dari pamerannya

    const heroModalDisclosure = useDisclosure(false);
    const sampulModalDisclosure = useDisclosure(false);

    const handleOnCropSampul = (canvas) => {
        setPameranData((prev) => {
            prev.image.sampul = canvas.toDataURL();
            return prev;
        });
        canvas.toBlob((blob) => {
            if (blob) {
                setSampulBlob(blob);
            }
        });
    };
    const handleOnCropHero = (canvas) => {
        setPameranData((prev) => {
            prev.image.hero = canvas.toDataURL();
            return prev;
        });
        canvas.toBlob((blob) => {
            if (blob) {
                setHeroBlob(blob);
            }
        });
    };

    return (
        <div className="w-full flex justify-center">
            <Stack className="w-full max-w-[1100px] rounded md:p-3 shadow-lg gap-5">
                <div className=" group relative w-full  aspect-[5/2]">
                    <div className=" backdrop-blur-md group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                        <Button onClick={heroModalDisclosure[1].open}>
                            Ubah Gambar
                        </Button>
                    </div>
                    <Image
                        fill
                        objectFit="cover"
                        src={pameranData.image.hero || "/bg-login.jpg"}
                        alt="foto-background"
                        loading="eager"
                    />
                    <ImageModalSelection
                        opened={heroModalDisclosure[0]}
                        close={heroModalDisclosure[1].close}
                        stencilProps={{
                            aspectRatio: 5 / 2,
                        }}
                        handleOnCrop={handleOnCropHero}
                    />
                </div>
                <div className="self-center mt-5">
                    <Title order={3}>Informasi Pameran</Title>
                </div>
                <Grid columns={12} className="w-full static  p-3">
                    <GridCol
                        span={{ base: 12, sm: 5 }}
                        className="flex justify-center"
                    >
                        <div className="group aspect-[5/6] w-3/4 relative">
                            <div className=" backdrop-blur-md group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                                <Button onClick={sampulModalDisclosure[1].open}>
                                    Ubah Gambar
                                </Button>
                            </div>
                            <Image
                                fill
                                objectFit="cover"
                                src={
                                    pameranData.image.sampul || "/bg-login.jpg"
                                }
                                className="z-10"
                                alt="foto-sampul"
                                loading="eager"
                            />
                            <ImageModalSelection
                                opened={sampulModalDisclosure[0]}
                                close={sampulModalDisclosure[1].close}
                                stencilProps={{
                                    aspectRatio: 5 / 6,
                                }}
                                handleOnCrop={handleOnCropSampul}
                            />
                        </div>
                    </GridCol>

                    <GridCol
                        span={{ base: 12, sm: 7 }}
                        className="flex flex-col gap-3"
                    >
                        <TextInput
                            key={form.key("nama_pameran")}
                            label="Nama Pameran"
                            placeholder="Ex. Pameran Pertamaku"
                            withAsterisk
                            {...form.getInputProps("nama_pameran")}
                        />
                        <Textarea
                            key={form.key("deskripsi")}
                            label="Deskripsi"
                            className="grow"
                            styles={{
                                root: {
                                    display: "flex",
                                    flexDirection: "column",
                                },
                                wrapper: {
                                    flexGrow: 1,
                                },
                                input: {
                                    height: "100%",
                                },
                            }}
                            withAsterisk
                            {...form.getInputProps("deskripsi")}
                        />
                        <DatePickerInput
                            key={form.key("tanggal")}
                            {...form.getInputProps("tanggal")}
                            type="range"
                            label="Jadwal Pameran"
                            placeholder="Pilih rentang waktu pameran"
                            locale="id"
                            valueFormat="DD MMMM YYYY"
                            withAsterisk
                        />
                        <Select
                            key={form.key("initiator_id")}
                            {...form.getInputProps("initiator_id")}
                            label="Pameran Diinisiasi Oleh"
                            placeholder="Pilih Pelukis"
                            data={senimanAll}
                            searchable
                        />
                    </GridCol>
                </Grid>
                <div className="self-center mt-5">
                    <Title order={3}>Pilih Karya</Title>
                </div>
                <KaryaSection />
                {error && (
                    <Group
                        className="bg-red-100 rounded-md py-2 px-2 border-red-300 border-2 self-center"
                        data-cy="error-message"
                    >
                        <CrossIcon w={20} h={20} />
                        <Text size="xs" color="red" className=" cursor-default">
                            {error}
                        </Text>
                    </Group>
                )}
                <SimpleGrid
                    cols={2}
                    className="w-full md:w-[400px] self-center p-3"
                >
                    <Button color="red" variant="outline" onClick={form.reset}>
                        Bersihkan
                    </Button>
                    <Button type="submit" loading={loading}>
                        Buka Pameran
                    </Button>
                </SimpleGrid>
            </Stack>
        </div>
    );
}
