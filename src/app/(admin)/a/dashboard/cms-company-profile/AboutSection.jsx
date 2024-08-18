"use client";
import {
    addAndUpdateAbout,
    addAndUpdateOwnerDesc,
    getAboutLP,
    updateImageAboutOwner,
} from "@/actions/admin";
import ImageModalSelection from "@/components/ImageModalSelection";
import { landingPageFeaturedLoader } from "@/loader/imageLoader";
import {
    Title,
    Textarea,
    Button,
    Space,
    TextInput,
    SimpleGrid,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function AboutSection({ text, ownerData }) {
    const imageOneDisclosure = useDisclosure(false);
    const [imageBlob, setImageBlob] = useState(ownerData.imageUrl);
    let [preview, setPreview] = useDebouncedState(text, 600);
    const handleSimpan = () => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menyimpan data",
        });
        addAndUpdateAbout(preview)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.update({
                    id,
                    title: "Berhasil",
                    message: "Berhasil mengupdate data!",
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

    const form = useForm({
        name: "owner-desc",
        mode: "uncontrolled",
        initialValues: {
            deskripsi: ownerData?.deskripsi || "",
            nama: ownerData?.nama || "",
        },
        validate: {
            deskripsi: isNotEmpty("Tidak Boleh Kosong!"),
            nama: isNotEmpty("Tidak Boleh Kosong!"),
        },
    });

    const handleSubmitOwner = (data) => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menyimpan data",
        });

        addAndUpdateOwnerDesc(data)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.update({
                    id,
                    title: "Berhasil",
                    message: "Berhasil mengubah deskripsi!",
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

    const onImageChange = (canvas) => {
        setImageBlob(canvas.toDataURL());
        canvas.toBlob((blob) => {
            if (blob) {
                let formData = new FormData();
                formData.append("image", blob);

                const id = notifications.show({
                    color: "gray",
                    loading: true,
                    autoClose: false,
                    withCloseButton: false,
                    title: "Loading",
                    message: "Menyimpan data",
                });

                updateImageAboutOwner(formData)
                    .then((res) => {
                        if (res.isError) throw new Error(res.error);
                        notifications.update({
                            id,
                            title: "Berhasil",
                            message: "Berhasil mengubah foto!",
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
        });
    };

    return (
        <div className=" p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black">
                Tentang Kami
            </Title>
            <Title order={4} className="mt-5">
                Deskripsi Umum
            </Title>
            <form className="flex flex-col gap-5">
                <Textarea
                    onChange={(e) => setPreview(e.target.value)}
                    label="Tentang kami"
                    description="Disarankan untuk menuliskan deskripsi tidak lebih dari 100 kata"
                    withAsterisk
                    defaultValue={text}
                    rows={4}
                />
                <Button className="self-start" onClick={handleSimpan}>
                    Simpan
                </Button>
            </form>
            <Title order={3} className="text-center my-5">
                Preview
            </Title>
            <div className="bg-tanArtBlue-600 flex flex-col text-white items-center justify-center text-center p-5 gap-5 ">
                <h2 className="font-bold text-2xl md:text-4xl max-w-[1100px]">
                    Tentang Kami
                </h2>
                <p className="md:leading-8 max-w-[1100px] md:text-base text-sm">
                    {preview}
                </p>
            </div>
            <Space h="xl" />
            <Title order={4} className="my-5">
                Deskripsi Pemilik
            </Title>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <div>
                    <form
                        className="flex flex-col gap-5 p-5 border"
                        onSubmit={form.onSubmit(handleSubmitOwner)}
                    >
                        <Textarea
                            key={form.key("deskripsi")}
                            {...form.getInputProps("deskripsi")}
                            label="Tentang Pemilik"
                            description="Disarankan untuk menuliskan deskripsi tidak lebih dari 50 kata"
                            withAsterisk
                            rows={2}
                        />
                        <TextInput
                            key={form.key("nama")}
                            {...form.getInputProps("nama")}
                            label="Nama"
                            description="Akan ditampilkan dibawah informasi pemilik"
                            withAsterisk
                            className=""
                        />
                        <Button className="self-start" type="submit">
                            Simpan
                        </Button>
                    </form>
                </div>
                <div className="group relative w-full aspect-[3/4] max-w-[400px] mx-auto">
                    <div className=" backdrop-blur-sm group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                        <Button onClick={imageOneDisclosure[1].open}>
                            Ubah Gambar
                        </Button>
                    </div>
                    <Image
                        fill
                        src={imageBlob || "/default/3.png"}
                        loader={imageBlob && landingPageFeaturedLoader}
                        className="object-cover"
                    />
                    <ImageModalSelection
                        opened={imageOneDisclosure[0]}
                        close={imageOneDisclosure[1].close}
                        stencilProps={{
                            aspectRatio: 3 / 4,
                        }}
                        handleOnCrop={onImageChange}
                    />
                </div>
            </SimpleGrid>
        </div>
    );
}
