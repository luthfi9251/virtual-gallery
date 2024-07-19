"use client";
import Image from "next/image";
import {
    Grid,
    GridCol,
    Stack,
    TextInput,
    Textarea,
    Group,
    Button,
    Title,
    SimpleGrid,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "dayjs/locale/id";
import KaryaSection from "./KaryaSection";
import { PameranContext } from "./PameranProvider";
import { useContext, useMemo, useState } from "react";

export default function BukaPameran() {
    const { pameranData } = useContext(PameranContext);
    const form = pameranData.form;
    return (
        <div className="w-full flex justify-center">
            <Stack className="w-full max-w-[1100px] rounded md:p-3 shadow-lg gap-5">
                <div className="relative w-full h-[200px] lg:h-[350px]">
                    <Image fill objectFit="cover" src="/bg-login.jpg" />
                </div>
                <div className="self-center mt-5">
                    <Title order={3}>Informasi Pameran</Title>
                </div>
                <Grid columns={12} className="w-full static  p-3">
                    <GridCol
                        span={{ base: 12, md: 5 }}
                        className="flex justify-center"
                    >
                        <div className="group aspect-[5/6] w-3/4 relative">
                            <div className=" backdrop-blur-md group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                                <Button>Pilih Foto Sampul</Button>
                            </div>
                            <Image
                                fill
                                objectFit="cover"
                                src="/bg-login.jpg"
                                className="z-10"
                            />
                        </div>
                    </GridCol>

                    <GridCol
                        span={{ base: 12, md: 7 }}
                        className="flex flex-col gap-3"
                        // component={Stack}
                    >
                        <TextInput
                            {...form.getInputProps("nama_pameran")}
                            key={form.key("nama_pameran")}
                            label="Nama Pameran"
                            placeholder="Ex. Pameran Pertamaku"
                            withAsterisk
                        />
                        <Textarea
                            {...form.getInputProps("deskripsi")}
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
                        />
                        <DatePickerInput
                            key={form.key("tanggal")}
                            {...form.getInputProps("tanggal")}
                            onChange={(tgl) => {
                                form.setFieldValue("tanggal.mulai", tgl[0]);
                                form.setFieldValue("tanggal.selesai", tgl[1]);
                            }}
                            value={[
                                form.getValues().tanggal.mulai,
                                form.getValues().tanggal.selesai,
                            ]}
                            type="range"
                            label="Jadwal Pameran"
                            placeholder="Pilih renatng waktu pameran"
                            locale="id"
                            valueFormat="DD MMMM YYYY"
                            withAsterisk
                        />
                    </GridCol>
                </Grid>
                <div className="self-center mt-5">
                    <Title order={3}>Pilih Karya</Title>
                </div>
                <KaryaSection />
                <SimpleGrid
                    cols={2}
                    className="w-full md:w-[400px] self-center"
                >
                    <Button color="red" variant="outline">
                        Bersihkan
                    </Button>
                    <Button
                        onClick={() =>
                            form.onSubmit((data) => console.log({ data }))()
                        }
                    >
                        Buka Pameran
                    </Button>
                </SimpleGrid>
            </Stack>
        </div>
    );
}
