"use client";
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
    TableTd,
    ActionIcon,
} from "@mantine/core";
import { Table, TableData } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { FaRegTrashAlt } from "react-icons/fa";

export default function HeroSection() {
    const elements = [
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
    ];

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

    const handleSubmit = (data) => {
        console.log(data);
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
                <Table stickyHeader stickyHeaderOffset={60}>
                    <TableThead>
                        <TableTr>
                            <TableTh>Tag</TableTh>
                            <TableTh>Image URL</TableTh>
                            <TableTh>Action</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        {elements.map((element) => (
                            <TableTr key={element.name}>
                                <TableTd>{element.name}</TableTd>
                                <TableTd>{element.symbol}</TableTd>
                                <TableTd>
                                    <ActionIcon
                                        variant="filled"
                                        color="red"
                                        aria-label="Delete"
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
