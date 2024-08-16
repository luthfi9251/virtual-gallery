"use client";
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
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ActivitySection() {
    const [activityList, setActivityList] = useState([
        {
            tag: "CARD 1",
            name: "",
            imageUrl: "",
        },
        {
            tag: "CARD 2",
            name: "",
            imageUrl: "",
        },
        {
            tag: "CARD 3",
            name: "",
            imageUrl: "",
        },
    ]);

    const handleUpdateState = (tag, name, imageUrl) => {
        let newActivity = activityList.map((item) => {
            if (item.tag === tag) {
                item.imageUrl = imageUrl;
                item.name = name;
            }
            return item;
        });

        setActivityList([...newActivity]);
    };

    const handleSubmit = (data) => {
        handleUpdateState(data.tag, data.name, "test");
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
                        className="w-[200px]"
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
                        description="Gunakan gambar dengan aspect ratio 3:2 serta minimal ukuran 1440 x 800 px "
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
                                <TableTr>
                                    <TableTd>{item.tag}</TableTd>
                                    <TableTd>{item.name}</TableTd>
                                    <TableTd>{item.imageUrl}</TableTd>
                                    <TableTd>
                                        <ActionIcon
                                            variant="filled"
                                            color="red"
                                            aria-label="Delete"
                                            onClick={() =>
                                                handleUpdateState(
                                                    item.tag,
                                                    "",
                                                    ""
                                                )
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
