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
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Image from "next/image";
import { karyaImageLoader } from "@/loader/imageLoader";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { deleteFAQIteminList } from "@/actions/admin";

export default function DataTableComponent({ records }) {
    const openDeleteConfirmModal = (id) =>
        modals.openConfirmModal({
            title: "Hapus pertanyaan?",
            centered: true,
            children: (
                <Text size="sm">
                    Apakah anda akan menghapus pertanyaan ini?
                </Text>
            ),
            confirmProps: { color: "red" },
            labels: { confirm: "Hapus", cancel: "Batalkan" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => {
                const idNotif = notifications.show({
                    color: "gray",
                    loading: true,
                    autoClose: false,
                    withCloseButton: false,
                    title: "Loading",
                    message: "Menyimpan data",
                });

                deleteFAQIteminList(id)
                    .then((res) => {
                        if (res.isError) throw new Error(res.error);
                        notifications.update({
                            id: idNotif,
                            title: "Berhasil",
                            message: "Berhasil menghapus data!",
                            loading: false,
                            autoClose: 2000,
                            icon: null,
                            color: "teal",
                        });
                    })
                    .catch((err) => {
                        notifications.update({
                            id: idNotif,
                            color: "red",
                            title: "Gagal",
                            message: err.message,
                            loading: false,
                            autoClose: 2000,
                            icon: null,
                        });
                    });
            },
        });

    let columnTable = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "jenis",
                header: "Jenis",
            },
            {
                accessorKey: "title",
                header: "Pertanyaan",
            },
            {
                accessorKey: "action",
                header: "Action",
                Cell: ({ row }) => {
                    return (
                        <Group>
                            <ActionIcon
                                variant="filled"
                                aria-label="Edit"
                                component={Link}
                                href={URL_TANART.ADMIN_FAQ_EDIT(
                                    row.original.id
                                )}
                            >
                                <FaPencilAlt
                                    style={{ width: "50%", height: "50%" }}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                            <ActionIcon
                                variant="filled"
                                color="red"
                                onClick={() =>
                                    openDeleteConfirmModal(row.original.id)
                                }
                            >
                                <FaRegTrashAlt
                                    style={{ width: "60%", height: "60%" }}
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
                    <Button
                        component={Link}
                        href={URL_TANART.ADMIN_FAQ_ADD}
                        prefetch={false}
                    >
                        Tambah
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
