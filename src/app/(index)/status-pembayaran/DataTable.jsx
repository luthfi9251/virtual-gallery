"use client";
import {
    ActionIcon,
    Stack,
    ScrollAreaAutosize,
    Group,
    Modal,
    Text,
    Drawer,
    Checkbox,
    CheckboxGroup,
    Button,
    TextInput,
} from "@mantine/core";
import { FaCircleInfo } from "react-icons/fa6";
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
import dayjs from "dayjs";

export default function DataTableComponent({ records = [] }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [modalData, setModalData] = useState({});
    const [chekoutModalData, setChekoutModalData] = useState({});
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
                    } else if (status === "SUCCESS") {
                        return (
                            <span className="p-2 bg-green-200 font-medium rounded">
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
                    const handleOpenModal = () => {
                        console;
                        setModalData(row.original.paymentDetails);
                        setChekoutModalData(row.original);
                        open();
                    };
                    if (row.original.status === "PENDING") {
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
                    } else {
                        return (
                            <ActionIcon
                                onClick={handleOpenModal}
                                disabled={row.original.status === "EXPIRED"}
                            >
                                <FaCircleInfo />
                            </ActionIcon>
                        );
                    }
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
                </Group>
                <ScrollAreaAutosize>
                    <MRT_Table table={table} />
                </ScrollAreaAutosize>
                <MRT_TablePagination table={table} />
            </Stack>
            <Modal opened={opened} onClose={close} title="Detail Pembayaran">
                <div className="flex flex-col gap-2">
                    <TextInput
                        disabled
                        value={modalData?.nama_pemilik_rekening}
                        label="Nama Pemilik Rekening"
                    />
                    <TextInput
                        disabled
                        value={modalData?.bank_pengirim}
                        label="Bank Pengirim"
                    />
                    <TextInput
                        disabled
                        value={modalData?.bank_tujuan}
                        label="Bank Tujuan"
                    />
                    {["SUCCESS", "REJECTED"].includes(
                        chekoutModalData?.status
                    ) && (
                        <div>
                            <Text className="text-sm font-medium">
                                Tanggal Validasi
                            </Text>
                            <Text className="text-base font-bold my-2">
                                {chekoutModalData?.updated_at &&
                                    dayjs(chekoutModalData?.updated_at)
                                        .locale("id")
                                        .format("DD/MM/YYYY HH:mm:ss")}
                            </Text>
                        </div>
                    )}
                    {["REJECTED"].includes(chekoutModalData?.status) && (
                        <div>
                            <Text className="text-sm font-medium">
                                Alasan Penolakan
                            </Text>
                            <Text className="text-base font-bold my-2">
                                {chekoutModalData?.rejectionReason}
                            </Text>
                        </div>
                    )}
                    <div>
                        <Text className="text-sm font-medium">
                            Bukti Pembayaran
                        </Text>
                        <Link
                            className="text-xs underline"
                            href={modalData?.bukti_transfer_url || "/"}
                            target="_blank"
                            prefetch={false}
                        >
                            Lihat Bukti Pembayaran
                        </Link>
                    </div>
                </div>
            </Modal>
        </>
    );
}
