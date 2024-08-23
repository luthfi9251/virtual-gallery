"use client";
import {
    Button,
    Stack,
    Modal,
    InputWrapper,
    Textarea,
    Text,
    ScrollAreaAutosize,
    TextInput,
    ActionIcon,
    Group,
} from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useRef, useState } from "react";
import {
    MRT_Table,
    useMantineReactTable,
    MRT_TablePagination,
    MRT_GlobalFilterTextInput,
} from "mantine-react-table";
import { URL_TANART } from "@/variables/url";
import Link from "next/link";
import { checkIsPameranOpen } from "@/actions/pameran";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Image from "next/image";
import { karyaImageLoader } from "@/loader/imageLoader";
import ModalDetailKarya from "./ModalDetailKarya";
import ModalEditKarya from "./ModalEditKarya";

export default function DataTableComponent({ records }) {
    let inputRef = useRef(null);
    const disclosure = useDisclosure(false);
    const disclosureEdit = useDisclosure(false);
    const [selectedIdKarya, setSelectedIdKara] = useState(null);
    const [selectedDataKarya, setSelectedDataKara] = useState(null);
    const [modalData, setModalData] = useState({});

    let columnTable = useMemo(
        () => [
            {
                accessorKey: "lukisan_url",
                header: " ",
                enableSorting: false,
                Cell: ({ row }) => {
                    return (
                        <Image
                            width={100}
                            height={100}
                            src={row.original.lukisan_url}
                            loader={karyaImageLoader}
                            alt="pict"
                            className="w-[100px] h-[100px] object-cover"
                            quality={30}
                        />
                    );
                },
            },
            {
                accessorKey: "judul",
                header: "Judul Lukisan",
            },
            {
                accessorKey: "nama_lengkap",
                header: "Dibuat Oleh",
            },
            {
                accessorKey: "created_at",
                header: "Diunggah Pada",
                Cell: ({ row }) => {
                    return dayjs(row.original.created_at)
                        .locale("id")
                        .format("DD MMMM YYYY");
                },
            },
            {
                accessorKey: "status",
                header: "Status",
                Cell: ({ row }) => {
                    let status = row.original.status;
                    if (status === "DIKURASI") {
                        return (
                            <Text
                                data-cy="text-status"
                                className="bg-tanArt-greyLight text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white cursor-default"
                            >
                                Pending
                            </Text>
                        );
                    } else if (status === "TERKURASI") {
                        return (
                            <Text
                                data-cy="text-status"
                                className="bg-tanArt-yellow text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white cursor-default"
                            >
                                Terkurasi
                            </Text>
                        );
                    } else if (status === "SELESAI") {
                        return (
                            <Text
                                data-cy="text-status"
                                className="bg-tanArt-green text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white cursor-default"
                            >
                                Selesai
                            </Text>
                        );
                    } else if (status === "TERJUAL") {
                        return (
                            <Text
                                data-cy="text-status"
                                className="bg-cyan-500 text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white cursor-default"
                            >
                                Terjual
                            </Text>
                        );
                    } else {
                        return null;
                    }
                },
            },
            {
                accessorKey: "action",
                header: "Action",
                Cell: ({ row }) => {
                    return (
                        <Group>
                            <ActionIcon
                                onClick={() => {
                                    setSelectedIdKara(row.original.id);
                                    disclosure[1].open();
                                }}
                                variant="filled"
                                aria-label="Lihhat"
                            >
                                <FaRegEye
                                    style={{ width: "60%", height: "60%" }}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                            <ActionIcon
                                onClick={() => {
                                    setSelectedIdKara(row.original.id);
                                    setSelectedDataKara(row.original);
                                    disclosureEdit[1].open();
                                }}
                                variant="filled"
                                aria-label="Edit"
                            >
                                <FaPencilAlt
                                    style={{ width: "50%", height: "50%" }}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                        </Group>
                    );
                },
            },
        ],
        []
    );
    const table = useMantineReactTable({
        columns: columnTable,
        data: records,
        enableColumnPinning: true,
        columnPinning: { right: ["judul"] },
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: true,
        paginationDisplayMode: "pages",
        positionPagination: "bottom",
        initialState: {
            showGlobalFilter: true,
        },
        mantineSearchTextInputProps: {
            placeholder: "Cari",
        },
        mantinePaginationProps: {
            showRowsPerPage: false,
        },
    });

    return (
        <>
            <Stack
                p="sm"
                className=" shadow-lg rounded-sm border-[1px] overflow-hidden"
            >
                <Group justify="space-between">
                    <MRT_GlobalFilterTextInput table={table} />
                </Group>
                <ScrollAreaAutosize>
                    <MRT_Table table={table} />
                </ScrollAreaAutosize>
                <MRT_TablePagination table={table} />
            </Stack>
            <ModalDetailKarya
                disclosure={disclosure}
                karyaId={selectedIdKarya}
            />
            <ModalEditKarya
                disclosure={disclosureEdit}
                karyaId={selectedIdKarya}
                dataKarya={selectedDataKarya}
            />
        </>
    );
}
