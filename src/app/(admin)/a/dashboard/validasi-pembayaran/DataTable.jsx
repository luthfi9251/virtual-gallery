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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useRef, useState } from "react";
import {
    MRT_Table,
    useMantineReactTable,
    MRT_TablePagination,
    MRT_GlobalFilterTextInput,
} from "mantine-react-table";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getUnverifiedKurator, verifKurator } from "../actions";
import Link from "next/link";
import { formatToRupiah } from "@/lib/formatter";
import { modals } from "@mantine/modals";
import { validasiPembayaran } from "@/actions/checkout";
import { notifications } from "@mantine/notifications";
import { FaCircleInfo } from "react-icons/fa6";

export default function DataTableComponent({ records }) {
    let inputRef = useRef(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [modalData, setModalData] = useState({});
    const validationModal = () =>
        modals.openConfirmModal({
            title: "Konfirmasi Validasi",
            centered: true,
            children: (
                <Text size="sm">
                    <span className="font-bold">
                        Pastikan anda telah memvalidasi dana yang masuk sesuai
                        dengan data yang dimasukkan
                    </span>
                    . Setelah menekan tombol validasi, karya akan secara sah
                    menjadi milik pembeli. Apakah anda yakin untuk melakukan
                    validasi pembayaran?
                </Text>
            ),
            labels: { confirm: "Confirm", cancel: "Cancel" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => {
                const id = notifications.show({
                    color: "gray",
                    loading: true,
                    autoClose: false,
                    withCloseButton: false,
                    title: "Loading",
                    message: "Memvalidasi pembayaran...",
                });
                validasiPembayaran(modalData.no_invoice, true)
                    .then((res) => {
                        if (res.isError) throw res.error;
                        notifications.update({
                            id,
                            title: "Berhasil",
                            message: "Berhasil memvalidasi pembayaran!",
                            loading: false,
                            autoClose: 2000,
                            icon: null,
                            color: "teal",
                        });
                        close();
                    })
                    .catch((err) => {
                        notifications.update({
                            id,
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

    const rejectionModal = () =>
        modals.openConfirmModal({
            title: "Konfirmasi Tolak Pembayaran",
            children: (
                <Stack>
                    <Text size="sm">
                        Apakah anda akan menolak pembayaran pembeli?
                    </Text>
                    <TextInput
                        label="Alasan Penolakan"
                        ref={inputRef}
                        withAsterisk
                        required
                    />
                </Stack>
            ),
            labels: { confirm: "Tolak", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => {
                const id = notifications.show({
                    color: "gray",
                    loading: true,
                    autoClose: false,
                    withCloseButton: false,
                    title: "Loading",
                    message: "Memvalidasi pembayaran...",
                });
                validasiPembayaran(
                    modalData.no_invoice,
                    false,
                    inputRef.current?.value
                )
                    .then((res) => {
                        if (res.isError) throw res.error;
                        notifications.update({
                            id,
                            title: "Berhasil",
                            message: "Berhasil memvalidasi pembayaran!",
                            loading: false,
                            autoClose: 2000,
                            icon: null,
                            color: "teal",
                        });
                        close();
                    })
                    .catch((err) => {
                        notifications.update({
                            id,
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
                accessorKey: "no_invoice",
                header: "No Invoice",
            },
            {
                accessorKey: "nama_pembeli",
                header: "Pembeli",
            },
            {
                accessorKey: "judul_karya",
                header: "Judul Karya",
            },
            {
                accessorKey: "tgl_bayar",
                header: "Tgl Bayar",
            },
            {
                accessorKey: "status",
                header: "Status",
            },
            {
                accessorKey: "action",
                header: "Action",
                Cell: ({ row }) => {
                    if (row.original.status === "VALIDATING") {
                        return (
                            <Button
                                size="xs"
                                onClick={() => {
                                    setModalData(row.original);
                                    open();
                                }}
                            >
                                Validasi
                            </Button>
                        );
                    } else {
                        return (
                            <ActionIcon
                                onClick={() => {
                                    setModalData(row.original);
                                    open();
                                }}
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
                <MRT_GlobalFilterTextInput table={table} />
                <ScrollAreaAutosize>
                    <MRT_Table table={table} />
                </ScrollAreaAutosize>
                <MRT_TablePagination table={table} />
            </Stack>
            <Modal opened={opened} onClose={close} title="Detail Pembayaran">
                <div className="flex flex-col gap-2">
                    <div>
                        <Text className="text-sm font-medium">Judul Karya</Text>
                        <Text className="text-base font-bold my-2">
                            {modalData?.dataOrder?.judul_karya}
                        </Text>
                    </div>
                    <div>
                        <Text className="text-sm font-medium">
                            Nama Pameran
                        </Text>
                        <Text className="text-base font-bold my-2">
                            {modalData?.dataOrder?.nama_pameran}
                        </Text>
                    </div>
                    <div>
                        <Text className="text-sm font-medium">
                            Nama Pelukis
                        </Text>
                        <Text className="text-base font-bold my-2">
                            {modalData?.dataOrder?.nama_seniman}
                        </Text>
                    </div>
                    <div>
                        <Text className="text-sm font-medium">Harga</Text>
                        <Text className="text-base font-bold my-2">
                            {formatToRupiah(modalData?.dataOrder?.harga)}
                        </Text>
                    </div>
                    <div>
                        <Text className="text-sm font-medium">
                            Username Pembeli
                        </Text>
                        <Text className="text-base font-bold my-2">
                            {modalData?.dataPayment?.username}
                        </Text>
                    </div>
                    <div>
                        <Text className="text-sm font-medium">No Whatsapp</Text>
                        <Text className="text-base font-bold my-2">
                            {modalData?.dataPayment?.no_whatsapp}
                        </Text>
                    </div>
                    <div>
                        <Text className="text-sm font-medium">
                            Nama Pemilik Rekening
                        </Text>
                        <Text className="text-base font-bold my-2">
                            {modalData?.dataPayment?.nama_pemilik_rekening}
                        </Text>
                    </div>
                    <div>
                        <Text className="text-sm font-medium">
                            Bank Pengirim
                        </Text>
                        <Text className="text-base font-bold my-2">
                            {modalData?.dataPayment?.bank_pengirim}
                        </Text>
                    </div>
                    <div>
                        <Text className="text-sm font-medium">Bank Tujuan</Text>
                        <Text className="text-base font-bold my-2">
                            {modalData?.dataPayment?.bank_tujuan}
                        </Text>
                    </div>
                    <div>
                        <Text className="text-sm font-medium">
                            Tanggal Bayar
                        </Text>
                        <Text className="text-base font-bold my-2">
                            {modalData?.tgl_bayar}
                        </Text>
                    </div>

                    <div>
                        <Text className="text-sm font-medium">
                            Bukti Pembayaran
                        </Text>
                        <Link
                            className="text-base font-bold my-2 underline"
                            href={
                                modalData?.dataPayment?.bukti_transfer_url ||
                                "/"
                            }
                            target="_blank"
                            prefetch={false}
                        >
                            Lihat Bukti Pembayaran
                        </Link>
                    </div>
                    {["SUCCESS", "REJECTED"].includes(modalData.status) && (
                        <div>
                            <Text className="text-sm font-medium">
                                Tanggal Validasi
                            </Text>
                            <Text className="text-base font-bold my-2">
                                {modalData?.verified_at}
                            </Text>
                        </div>
                    )}
                    {["REJECTED"].includes(modalData.status) && (
                        <div>
                            <Text className="text-sm font-medium">
                                Alasan Penolakan
                            </Text>
                            <Text className="text-base font-bold my-2">
                                {modalData?.rejectionReason}
                            </Text>
                        </div>
                    )}
                    {modalData.status === "VALIDATING" && (
                        <Stack>
                            <Button variant="outline" onClick={rejectionModal}>
                                Tolak
                            </Button>
                            <Button onClick={validationModal}>Validasi</Button>
                        </Stack>
                    )}
                </div>
            </Modal>
        </>
    );
}
