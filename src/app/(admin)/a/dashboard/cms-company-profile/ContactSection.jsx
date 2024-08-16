"use client";
import { addAndUpdateContact } from "@/actions/admin";
import { Button, Textarea, TextInput, Title } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

export default function ContactSection({ data }) {
    const form = useForm({
        name: "contact",
        mode: "uncontrolled",
        initialValues: {
            instagram: data?.instagram === "null" ? "" : data?.instagram,
            x: data?.x === "null" ? "" : data?.x,
            gmail: data?.gmail === "null" ? "" : data?.gmail,
            alamat: data?.alamat === "null" ? "" : data?.alamat,
        },
        validate: {
            alamat: isNotEmpty("Tidak Boleh Kosong!"),
        },
    });

    const handleSubmit = async (data) => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menyimpan data",
        });
        addAndUpdateContact(data)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.update({
                    id,
                    title: "Berhasil",
                    message: "Berhasil menyimpan data!",
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
    };

    return (
        <div className=" p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black">
                Informasi Kontak
            </Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className="flex gap-5 flex-col ">
                    <TextInput
                        key={form.key("instagram")}
                        {...form.getInputProps("instagram")}
                        label="Instagram"
                        description="Dapat dikosongi bila tidak ada"
                        className=""
                    />
                    <TextInput
                        key={form.key("x")}
                        {...form.getInputProps("x")}
                        label="X"
                        description="Dapat dikosongi bila tidak ada"
                        className=""
                    />
                    <TextInput
                        key={form.key("gmail")}
                        {...form.getInputProps("gmail")}
                        label="Gmail"
                        description="Dapat dikosongi bila tidak ada"
                        className=""
                    />
                    <Textarea
                        key={form.key("alamat")}
                        {...form.getInputProps("alamat")}
                        label="Alamat"
                        description="Alamat akan ditampilkan pada bagian Footer"
                        withAsterisk
                        rows={4}
                    />
                    <Button className="self-start" type="submit">
                        Simpan
                    </Button>
                </div>
            </form>
        </div>
    );
}
