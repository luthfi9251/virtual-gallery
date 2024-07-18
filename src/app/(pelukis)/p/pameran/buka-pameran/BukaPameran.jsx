"use client";
import Image from "next/image";
import { Grid, GridCol, Stack, TextInput, Textarea, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "dayjs/locale/id";

export default function BukaPameran() {
    return (
        <div className="w-full flex justify-center">
            <Stack className="w-full max-w-[1100px] rounded md:p-3 shadow-lg">
                <div className="relative w-full bg-red-500 h-[200px] lg:h-[350px]">
                    <Image fill objectFit="cover" src="/bg-login.jpg" />
                </div>
                <Grid columns={12} className="w-full static  p-3">
                    <GridCol
                        span={{ base: 12, md: 5 }}
                        className="flex justify-center"
                    >
                        <div className="aspect-[3/4] w-full relative">
                            <Image fill objectFit="cover" src="/bg-login.jpg" />
                        </div>
                    </GridCol>
                    <GridCol
                        span={{ base: 12, md: 7 }}
                        className="0"
                        component={Stack}
                    >
                        <TextInput
                            label="Nama Pameran"
                            placeholder="Ex. Pameran Pertamaku"
                        />
                        <Textarea label="Deskripsi" />
                        <DatePickerInput
                            type="range"
                            label="Pick dates range"
                            placeholder="Pick dates range"
                            locale="id"
                            valueFormat="DD MMMM YYYY"
                        />
                    </GridCol>
                </Grid>
                <p>adadha</p>
            </Stack>
        </div>
    );
}
