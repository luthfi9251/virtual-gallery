"use client";

import { Button, FileInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useSearchParams } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { bayarTagihanCheckout } from "@/actions/checkout";
import { useRouter } from "next/navigation";
import { URL_TANART } from "@/variables/url";

export default function DataTransferForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const form = useForm({
        name: "data-transfer",
        mode: "uncontrolled",
        initialValues: {
            nama_pemilik_rekening: "",
            bank_pengirim: "",
            bank_tujuan: "",
            bukti_transfer: null,
        },
        validate: {
            nama_pemilik_rekening: isNotEmpty("Tidak boleh kosong!"),
            bank_pengirim: isNotEmpty("Tidak boleh kosong!"),
            bank_tujuan: isNotEmpty("Tidak boleh kosong!"),
            bukti_transfer: isNotEmpty("Tidak boleh kosong!"),
        },
    });

    let handleSubmit = (data) => {
        //checking file
        if (!IMAGE_MIME_TYPE.includes(data.bukti_transfer.type)) {
            form.setFieldError(
                "bukti_transfer",
                "File yang dipilih bukan termasuk gambar!"
            );
        }
        let formData = new FormData();

        formData.set("nama_pemilik_rekening", data.nama_pemilik_rekening);
        formData.set("bank_pengirim", data.bank_pengirim);
        formData.set("bank_tujuan", data.bank_tujuan);
        formData.set("bukti_transfer", data.bukti_transfer);
        formData.set("checkoutId", searchParams.get("invoice"));

        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Membuat pesanan...",
        });
        bayarTagihanCheckout(formData)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.update({
                    id,
                    title: "Berhasil",
                    message:
                        "Berhasil menyimpan pembayaran, silahkan menunggu admin melakukan validasi",
                    loading: false,
                    autoClose: 2000,
                    icon: null,
                    color: "teal",
                });
                router.replace(URL_TANART.USER_STATUS_PEMBAYARAN);
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
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2">
                <TextInput
                    {...form.getInputProps("nama_pemilik_rekening")}
                    className=""
                    label="Nama Pemilik Rekening"
                    key={form.key("nama_pemilik_rekening")}
                    withAsterisk
                />
                <TextInput
                    {...form.getInputProps("bank_pengirim")}
                    className=""
                    label="Bank Pengirim"
                    key={form.key("bank_pengirim")}
                    withAsterisk
                />
                <TextInput
                    {...form.getInputProps("bank_tujuan")}
                    className=""
                    label="Bank Tujuan"
                    key={form.key("bank_tujuan")}
                    withAsterisk
                />
                <FileInput
                    {...form.getInputProps("bukti_transfer")}
                    className=""
                    label="Bukti Transfer"
                    key={form.key("bukti_transfer")}
                    placeholder="Upload bukti beupa gambar"
                    accept={IMAGE_MIME_TYPE}
                    withAsterisk
                />
            </div>
            <div className="mt-3 flex justify-end w-full">
                <Button className="w-[200px]" type="submit">
                    Simpan
                </Button>
            </div>
        </form>
    );
}
