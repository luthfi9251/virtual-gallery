"use client";
import { addFAQAdmin } from "@/actions/admin";
import BaseRichTextEditor from "@/components/RichTextEditor";
import { URL_TANART } from "@/variables/url";
import { Select, SimpleGrid, TextInput, Text, Stack } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function FormAdd() {
    const router = useRouter();
    let form = useForm({
        name: "unggah-karya",
        mode: "uncontrolled",
        initialValues: {
            pertanyaan: "",
            jenis: "",
        },
        validate: {
            pertanyaan: isNotEmpty("Tidak boleh kosong!"),
            jenis: isNotEmpty("Tidak boleh kosong!"),
        },
    });

    const onSimpanHandler = (html) => {
        form.validate();
        if (form.isValid()) {
            const id = notifications.show({
                color: "gray",
                loading: true,
                autoClose: false,
                withCloseButton: false,
                title: "Loading",
                message: "Menyimpan data",
            });
            let formData = form.getValues();

            addFAQAdmin({
                pertanyaan: formData.pertanyaan,
                deskripsi: html,
                jenis: formData.jenis,
            })
                .then((res) => {
                    if (res.isError) throw new Error(res.error);
                    router.push(URL_TANART.ADMIN_FAQ_LIST);
                    notifications.update({
                        id,
                        title: "Berhasil",
                        message: "Berhasil menambahkan data!",
                        loading: false,
                        autoClose: 2000,
                        icon: null,
                        color: "teal",
                    });
                })
                .catch((err) => {
                    notifications.update({
                        id,
                        color: "red",
                        title: "Gagal",
                        message: err.message,
                        loading: false,
                        autoClose: 2000,
                        icon: null,
                    });
                });
        }
    };

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <TextInput
                    label="Pertanyaan"
                    withAsterisk
                    radius="md"
                    description="Tuliskan dalam bentuk pertanyaan"
                    {...form.getInputProps("pertanyaan")}
                />
                <Select
                    label="Jenis pertanyaan"
                    placeholder="Pilih"
                    withAsterisk
                    description="Pilih jenis petanyaan"
                    data={["UMUM", "PELUKIS", "KURATOR"]}
                    {...form.getInputProps("jenis")}
                />
            </SimpleGrid>
            <Stack>
                <Text className="text-sm font-medium">Penjelasan</Text>
                <BaseRichTextEditor getValue={onSimpanHandler} />
            </Stack>
        </>
    );
}
