"use client";
import {
    addHeroCarrouselData,
    deleteHeroCarrouselData,
    getHeroCarrouselData,
} from "@/actions/admin";
import { landingPageFeaturedLoader } from "@/loader/imageLoader";
import {
    Title,
    TextInput,
    FileInput,
    Button,
    Space,
    TableTbody,
    TableThead,
    TableTr,
    TableTh,
    TableCaption,
    Text,
    TableTd,
    ActionIcon,
} from "@mantine/core";
import { Table, TableData } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";

export default function HeroSection() {
    const queryClient = useQueryClient();
    const form = useForm({
        name: "hero-section",
        mode: "uncontrolled",
        initialValues: {
            tag: "",
            gambar: null,
        },
        validate: {
            tag: isNotEmpty("Tidak Boleh Kosong!"),
            gambar: isNotEmpty("Tidak Boleh Kosong!"),
        },
    });
    const heroQuery = useQuery({
        queryKey: ["hero_carrousel"],
        queryFn: async () => {
            let res = await getHeroCarrouselData();
            if (res.isError) {
                throw res.error;
            }
            return res.data;
        },
        staleTime: 1000 * 60 * 5,
    });
    const mutation = useMutation({
        mutationFn: (data) => {
            return addHeroCarrouselData(data);
        },
    });

    const handleSubmit = (data) => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menyimpan data",
        });
        let formData = new FormData();
        formData.append("tag", data.tag);
        formData.append("image", data.gambar);
        mutation
            .mutateAsync(formData)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                queryClient.invalidateQueries({ queryKey: ["hero_carrousel"] });
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

    const deleteModal = (id) =>
        modals.openConfirmModal({
            title: "Please confirm your action",
            children: (
                <Text size="sm">Apakah anda yakin untuk menghapus item?</Text>
            ),
            labels: { confirm: "Confirm", cancel: "Cancel" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => handleDelete(id),
        });

    const handleDelete = (idTag) => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menghapus Data",
        });

        deleteHeroCarrouselData(idTag)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                queryClient.invalidateQueries({ queryKey: ["hero_carrousel"] });
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

    return (
        <div className=" p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black">
                Hero Carrousel
            </Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className="flex gap-5 flex-col md:flex-row">
                    <TextInput
                        key={form.key("tag")}
                        {...form.getInputProps("tag")}
                        label="Tag"
                        description="Tag digunakan untuk menandai item hero"
                        withAsterisk
                        className=""
                    />
                    <FileInput
                        key={form.key("gambar")}
                        {...form.getInputProps("gambar")}
                        label="Gambar Hero"
                        withAsterisk
                        description="Gunakan gambar dengan aspect ratio 3:2 serta minimal ukuran 1440 x 800 px "
                        placeholder="Unggah Gambar"
                        accept="image/png,image/jpeg"
                    />
                    <Button className="self-end" type="submit">
                        Tambah
                    </Button>
                </div>
            </form>
            <Space h="xl" />
            <div className="">
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh>Tag</TableTh>
                            <TableTh>Image URL</TableTh>
                            <TableTh>Action</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        {heroQuery.data?.map((element, idx) => (
                            <TableTr key={idx}>
                                <TableTd>{element.tag}</TableTd>
                                <TableTd>
                                    <Link
                                        href={landingPageFeaturedLoader({
                                            src: element.value,
                                        })}
                                        target="_blank"
                                        className="underline text-blue-600"
                                        prefetch={false}
                                    >
                                        Lihat Gambar
                                    </Link>
                                </TableTd>
                                <TableTd>
                                    <ActionIcon
                                        variant="filled"
                                        color="red"
                                        aria-label="Delete"
                                        onClick={() => deleteModal(element.id)}
                                    >
                                        <FaRegTrashAlt
                                            style={{
                                                width: "60%",
                                                height: "60%",
                                            }}
                                            stroke={1.5}
                                        />
                                    </ActionIcon>
                                </TableTd>
                            </TableTr>
                        ))}
                    </TableTbody>
                </Table>
            </div>
        </div>
    );
}
