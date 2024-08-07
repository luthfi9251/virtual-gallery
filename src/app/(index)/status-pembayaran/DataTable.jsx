"use client";
import {
    ActionIcon,
    Stack,
    ScrollAreaAutosize,
    Group,
    Fieldset,
    Title,
    Drawer,
    Checkbox,
    CheckboxGroup,
    Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FormRegisterUser from "@/components/FormRegisterUser";
import { useMemo, useState, useOptimistic, startTransition } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    MRT_Table,
    useMantineReactTable,
    MRT_TablePagination,
    MRT_GlobalFilterTextInput,
} from "mantine-react-table";
import { formatToRupiah } from "@/lib/formatter";
import Link from "next/link";
import { URL_TANART } from "@/variables/url";

export default function DataTableComponent({ records = [] }) {
    let columnTable = useMemo(
        () => [
            {
                accessorKey: "no_invoice",
                header: "No. Invoice",
                size: 120,
            },
            {
                accessorKey: "judul_karya",
                header: "Judul Karya",
                size: 60,
            },
            {
                accessorKey: "nama_pameran",
                header: "Nama Pameran",
                size: 60,
            },
            {
                accessorKey: "expired_date",
                header: "Tgl. Expired",
                size: 60,
            },
            {
                accessorKey: "harga",
                header: "Harga",
                size: 60,
                Cell: ({ row }) => formatToRupiah(row.original.harga),
            },
            {
                accessorKey: "status",
                header: "Status",
                size: 60,
                Cell: ({ row }) => {
                    let status = row.original.status;
                    if (status === "PENDING") {
                        return (
                            <span className="p-2 bg-yellow-200 font-medium rounded">
                                {status}
                            </span>
                        );
                    } else if (status === "EXPIRED") {
                        return (
                            <span className="p-2 bg-red-200 font-medium rounded">
                                {status}
                            </span>
                        );
                    } else {
                        return (
                            <span className="p-2 bg-slate-200 font-medium rounded">
                                {status}
                            </span>
                        );
                    }
                },
            },
            {
                accessorKey: "action",
                header: "Action",
                size: 60,
                Cell: ({ row }) => {
                    return (
                        <Button
                            component={Link}
                            href={URL_TANART.USER_BAYAR(
                                row.original.no_invoice
                            )}
                            disabled={row.original.status !== "PENDING"}
                        >
                            Bayar
                        </Button>
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
    );
}
