"use client";
import { addAndUpdateActivity, deleteActivityData } from "@/actions/admin";
import {
    ActionIcon,
    Button,
    FileInput,
    Select,
    Table,
    TableTbody,
    TableTd,
    TableTh,
    TableThead,
    TableTr,
    TextInput,
    Space,
    Title,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { landingPageFeaturedLoader } from "@/loader/imageLoader";
import Link from "next/link";

//aspect 5/6 370x444

export default function ActivitySection({ data }) {
    const [activityList, setActivityList] = useState(data);
    const handleUpdateState = (itemToUpdate) => {
        let updateIndex = activityList.findIndex(
            (item) => item.tag === itemToUpdate.tag
        );
        let temp = [...activityList];
        if (updateIndex < 0) {
            temp.push(itemToUpdate);
        } else {
            temp[updateIndex] = itemToUpdate;
        }

        setActivityList([...temp]);
    };

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
        formData.append("image", data.gambar);

        addAndUpdateActivity(data.tag, data.name, formData)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.update({
                    id,
                    title: "Berhasil",
                    message: "Berhasil mengubah Gallery!",
                    loading: false,
                    autoClose: 2000,
                    icon: null,
                    color: "teal",
                });
                handleUpdateState(res.data);
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

    const handleDelete = (idTag) => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menghapus data",
        });
        deleteActivityData(idTag)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.update({
                    id,
                    title: "Berhasil",
                    message: "Berhasil menghapus Gallery!",
                    loading: false,
                    autoClose: 2000,
                    icon: null,
                    color: "teal",
                });
                let filtered = activityList.filter((item) => item.id !== idTag);
                setActivityList([...filtered]);
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
        name: "activity-list",
        mode: "uncontrolled",
        initialValues: {
            tag: "CARD 1",
            name: "",
            gambar: null,
        },
        validate: {
            name: isNotEmpty("Tidak Boleh Kosong!"),
            gambar: isNotEmpty("Tidak Boleh Kosong!"),
        },
    });

    return (
        <div className=" p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black">
                Aktivitas
            </Title>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.onSubmit(handleSubmit)}
            >
                <div className="flex gap-5 flex-col md:flex-row">
                    <Select
                        key={form.key("tag")}
                        {...form.getInputProps("tag")}
                        label="Pilih Card"
                        description="Hanya dapat menampilkan 3 buah aktifitas"
                        data={["CARD 1", "CARD 2", "CARD 3"]}
                    />
                    <TextInput
                        key={form.key("name")}
                        {...form.getInputProps("name")}
                        label="Nama Kegiatan"
                        description="Disarankan untuk menggunakan 2-3 kata saja"
                        withAsterisk
                        className=""
                    />
                    <FileInput
                        key={form.key("gambar")}
                        {...form.getInputProps("gambar")}
                        label="Gambar Hero"
                        withAsterisk
                        description="Gunakan gambar dengan aspect ratio 5:6 serta minimal ukuran 370 x 444 px "
                        placeholder="Unggah Gambar"
                        accept="image/png,image/jpeg"
                    />
                </div>
                <Button className="self-start" type="submit">
                    Tambah
                </Button>
            </form>
            <Space h="xl" />
            <div>
                <Table stickyHeader stickyHeaderOffset={60}>
                    <TableThead>
                        <TableTr>
                            <TableTh>Tag</TableTh>
                            <TableTh>Name</TableTh>
                            <TableTh>Image URL</TableTh>
                            <TableTh>Action</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        {activityList.map((item, key) => {
                            return (
                                <TableTr key={key}>
                                    <TableTd>{item.tag}</TableTd>
                                    <TableTd>{item.name}</TableTd>
                                    <TableTd>
                                        <Link
                                            href={landingPageFeaturedLoader({
                                                src: item.imageUrl,
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
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
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
                            );
                        })}
                    </TableTbody>
                </Table>
            </div>
        </div>
    );
}
