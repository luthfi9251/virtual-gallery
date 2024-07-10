"use client";
import {
    Button,
    Stack,
    Modal,
    Input,
    InputWrapper,
    Textarea,
    Text,
    ScrollAreaAutosize,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import {
    MRT_Table,
    useMantineReactTable,
    MRT_TablePagination,
    MRT_GlobalFilterTextInput,
} from "mantine-react-table";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getUnverifiedKurator, verifKurator } from "../actions";

export default function DataTableComponent({ records }) {
    const queryClient = useQueryClient();
    const { data, isLoading, dataUpdatedAt } = useQuery({
        queryKey: ["admin", "verifikasi", "kurator"],
        queryFn: async () => await getUnverifiedKurator(),
        initialData: records,
        refetchInterval: 30 * 1000,
    });
    const updateAt = useMemo(
        () => new Date(dataUpdatedAt).toLocaleString(),
        [dataUpdatedAt]
    );
    const [selectedData, setSelectedData] = useState(null);
    const mutation = useMutation({
        mutationFn: async () => verifKurator(selectedData.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin", "verifikasi", "kurator"],
            });
        },
    });

    const [opened, { open, close }] = useDisclosure(false);
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
                        <span
                            data-cy="status-verifikasi"
                            className=" bg-green-300 rounded p-1 cursor-default"
                        >
                            Terverifikasi
                        </span>
                    ) : (
                        <span
                            data-cy="status-verifikasi"
                            className=" bg-yellow-300 rounded p-1 cursor-default"
                        >
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
                        data-cy="btn-verifikasi"
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
        data: data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: true,
        paginationDisplayMode: "pages",
        positionPagination: "bottom",
        state: {
            isLoading,
        },
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
            <Text size="xs" suppressHydrationWarning>
                Terakhir Diperbarui : {updateAt}
            </Text>
            <ScrollAreaAutosize>
                <MRT_Table table={table} />
            </ScrollAreaAutosize>
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
                    <Button
                        loading={mutation.isPending}
                        data-cy="btn-confirm-verifikasi"
                        onClick={() => {
                            mutation.mutate();
                            close();
                        }}
                    >
                        Verifikasi
                    </Button>
                </Stack>
            </Modal>
        </Stack>
    );
}
