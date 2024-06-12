"use client";
import {
    Button,
    Stack,
    Modal,
    Input,
    InputWrapper,
    Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import {
    MRT_Table,
    useMantineReactTable,
    MRT_TablePagination,
    MRT_GlobalFilterTextInput,
} from "mantine-react-table";

export default function DataTableComponent({ records }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedData, setSelectedData] = useState(null);
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
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "tgl_pengajuan",
                header: "Tanggal Pegajuan",
            },
            {
                accessorKey: "is_verified",
                header: "Status",
                enableSorting: true,
                Cell: ({ renderedCellValue }) =>
                    renderedCellValue ? (
                        <span className=" bg-green-300 rounded p-1 cursor-default">
                            Terverifikasi
                        </span>
                    ) : (
                        <span className=" bg-yellow-300 rounded p-1 cursor-default">
                            Belum Verifikasi
                        </span>
                    ),
            },
            {
                accessorKey: "action",
                header: "Action",
                Cell: ({ row }) => (
                    <Button
                        size="xs"
                        onClick={() => {
                            setSelectedData(row.original);
                            open();
                        }}
                        disabled={row.original.is_verified}
                    >
                        Verifikasi
                    </Button>
                ),
            },
        ],
        [records]
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
            sorting: [
                {
                    id: "is_verified",
                    desc: false,
                },
            ],
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
            <MRT_Table table={table} />
            <MRT_TablePagination table={table} />
            <Modal
                opened={opened}
                onClose={close}
                title="Verifikasi Akun"
                centered
            >
                <Stack>
                    <InputWrapper label="Nama Lengkap">
                        <Input value={selectedData?.nama_lengkap} disabled />
                    </InputWrapper>
                    <InputWrapper label="Email">
                        <Input value={selectedData?.email} disabled />
                    </InputWrapper>
                    <InputWrapper label="Tgl Pengajuan">
                        <Input value={selectedData?.tgl_pengajuan} disabled />
                    </InputWrapper>
                    <InputWrapper label="Deskripsi">
                        <Textarea
                            value={selectedData?.deskripsi}
                            disabled
                            autosize
                            minRows={2}
                            maxRows={4}
                        />
                    </InputWrapper>
                    <Button onClick={close}>Verifikasi</Button>
                </Stack>
            </Modal>
        </Stack>
    );
}
