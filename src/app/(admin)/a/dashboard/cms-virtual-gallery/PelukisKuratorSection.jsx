"use client";
import {
    FileInput,
    NumberInput,
    SimpleGrid,
    Stack,
    TextInput,
    Textarea,
    Title,
} from "@mantine/core";
import { useCMSFormContext } from "./FormProvider";

export default function PelukisKuratorSection() {
    const form = useCMSFormContext();
    return (
        <div className=" p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black">
                Pelukis & Kurator
            </Title>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <NumberInput
                    label="Jumlah Pelukis"
                    key={form.key("jumlah_pelukis")}
                    {...form.getInputProps("jumlah_pelukis")}
                />
                <NumberInput
                    label="Jumlah Kurator"
                    key={form.key("jumlah_kurator")}
                    {...form.getInputProps("jumlah_kurator")}
                />
                <Stack>
                    <Title order={4}>Featured Pelukis</Title>
                    <TextInput
                        label="Nama Pelukis"
                        key={form.key("nama_pelukis")}
                        {...form.getInputProps("nama_pelukis")}
                    />
                    <Textarea
                        label="Biografi"
                        description="Maksimal 200 karakter"
                        key={form.key("bio_pelukis")}
                        rows={4}
                        {...form.getInputProps("bio_pelukis")}
                    />
                    <FileInput
                        key={form.key("foto_pelukis")}
                        {...form.getInputProps("foto_pelukis")}
                        label="Foto Pelukis"
                        description="Disarankan untuk menggunakan foto dengan ratio 4:5"
                        placeholder="Unggah Gambar"
                        accept="image/png,image/jpeg"
                    />
                </Stack>
                <Stack>
                    <Title order={4}>Featured Kurator</Title>
                    <TextInput
                        label="Nama Kurator"
                        key={form.key("nama_kurator")}
                        {...form.getInputProps("nama_kurator")}
                    />
                    <Textarea
                        label="Biografi"
                        description="Maksimal 200 karakter"
                        key={form.key("bio_kurator")}
                        rows={4}
                        {...form.getInputProps("bio_kurator")}
                    />
                    <FileInput
                        key={form.key("foto_kurator")}
                        {...form.getInputProps("foto_kurator")}
                        label="Foto Kurator"
                        description="Disarankan untuk menggunakan foto dengan ratio 4:5"
                        placeholder="Unggah Gambar"
                        accept="image/png,image/jpeg"
                    />
                </Stack>
            </SimpleGrid>
        </div>
    );
}
