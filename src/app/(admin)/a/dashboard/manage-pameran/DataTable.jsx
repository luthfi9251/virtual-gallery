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

export default function DataTableComponent({ records }) {
    let inputRef = useRef(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [modalData, setModalData] = useState({});

    let columnTable = useMemo(
        () => [
            {
                accessorKey: "index",
                header: "No.",
                size: 20,
                Cell: ({ renderedCellValue, row }) => row.index + 1,
            },
            {
                accessorKey: "nama_pameran",
                header: "Nama Pameran",
            },
            {
                accessorKey: "nama_lengkap",
                header: "Dibuat Oleh",
            },
            {
                accessorKey: "tgl_mulai",
                header: "Tgl Mulai",
                Cell: ({ row }) => {
                    return dayjs(row.original.tgl_mulai)
                        .locale("id")
                        .format("DD MMMM YYYY");
                },
            },
            {
                accessorKey: "tgl_selesai",
                header: "Tgl Selesai",
                Cell: ({ row }) => {
                    return dayjs(row.original.tgl_selesai)
                        .locale("id")
                        .format("DD MMMM YYYY");
                },
            },
            {
                accessorKey: "status",
                header: "Status",
                Cell: ({ row }) => {
                    let tglSelesai = dayjs(row.original.tgl_selesai);
                    let tglMulai = dayjs(row.original.tgl_mulai);
                    let today = dayjs();
                    let check =
                        today.isAfter(tglMulai) &&
                        today.isBefore(tglSelesai.add(1, "day"));

                    if (check) {
                        return (
                            <div className="w-[100px] p-1 flex justify-center bg-green-300 font-medium">
                                OPEN
                            </div>
                        );
                    } else {
                        return (
                            <div className="w-[100px] p-1 flex justify-center bg-slate-300 font-medium">
                                CLOSE
                            </div>
                        );
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
                                component={Link}
                                href={URL_TANART.ADMIN_PAMERAN_SEE(
                                    row.original.slug
                                )}
                                variant="filled"
                                aria-label="Edit"
                            >
                                <FaRegEye
                                    style={{ width: "60%", height: "60%" }}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                            <ActionIcon
                                component={Link}
                                href={URL_TANART.ADMIN_PAMERAN_EDIT(
                                    row.original.id
                                )}
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
                    <Button
                        component={Link}
                        href={URL_TANART.ADMIN_BUKA_PAMERAN}
                    >
                        Buka Pameran
                    </Button>
                </Group>
                <ScrollAreaAutosize>
                    <MRT_Table table={table} />
                </ScrollAreaAutosize>
                <MRT_TablePagination table={table} />
            </Stack>
        </>
    );
}
