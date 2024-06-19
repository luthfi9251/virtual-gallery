"use client";
import { ActionIcon, Stack, ScrollAreaAutosize } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuItemRow from "./Menu";
import {
    MRT_Table,
    useMantineReactTable,
    MRT_TablePagination,
    MRT_GlobalFilterTextInput,
} from "mantine-react-table";
import { useEffect } from "react";
import { getUserDataById } from "@/actions/user";

export default function DataTableComponent({ records }) {
    let columnTable = useMemo(
        () => [
            {
                accessorKey: "index",
                header: "No.",
                size: 20,
                Cell: ({ renderedCellValue, row }) => row.index + 1,
            },
            {
                accessorKey: "nama_lengkap",
                header: "Nama Lengkap",
                size: 120,
            },
            {
                accessorKey: "email",
                header: "Email",
                size: 60,
            },
            {
                accessorKey: "username",
                header: "Username",
                size: 60,
            },
            {
                accessorKey: "action",
                header: "Action",
                size: 20,
                mantineTableHeadCellProps: {
                    align: "center",
                },
                mantineTableBodyCellProps: {
                    align: "center",
                },
                Cell: ({ row }) => {
                    return (
                        <MenuItemRow data={row.original}>
                            <ActionIcon
                                component="button"
                                size="md"
                                color="black"
                                variant="transparent"
                            >
                                <BsThreeDotsVertical size={15} />
                            </ActionIcon>
                        </MenuItemRow>
                    );
                },
            },
        ],
        []
    );
    const table = useMantineReactTable({
        columns: columnTable,
        data: records, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
            <MRT_GlobalFilterTextInput table={table} />
            <ScrollAreaAutosize>
                <MRT_Table table={table} />
            </ScrollAreaAutosize>
            <MRT_TablePagination table={table} />
        </Stack>
    );
}
