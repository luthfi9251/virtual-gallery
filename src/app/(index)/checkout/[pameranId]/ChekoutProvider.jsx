"use client";
import { createContext, useState } from "react";
import { isNotEmpty, createFormContext, isEmail } from "@mantine/form";
import { editProfile } from "@/actions/user";
import { notifications } from "@mantine/notifications";
import { checkoutKarya } from "@/actions/checkout";

export const CheckoutContext = createContext(null);
const [FormProvider, useFormContext, useForm] = createFormContext();

export const useCheckouFormContext = useFormContext;

export default function CheckoutProvider({
    children,
    idKarya,
    idPameran,
    profileData,
}) {
    const form = useForm({
        name: "checkout",
        mode: "controlled",
        initialValues: {
            nama_lengkap: profileData?.nama_lengkap || "",
            email: profileData?.email || "",
            no_whatsapp: "",
            id_pameran: idPameran,
            id_karya: idKarya,
            isKnowAlurPembelian: false,
            isProvideRightData: false,
        },
        validate: {
            nama_lengkap: isNotEmpty("Tidak boleh kosong!"),
            email: isEmail("Masukkan Email yang valid!"),
            no_whatsapp: isNotEmpty("Tidak boleh Kosong!"),
        },
    });

    let onSubmitHandler = (data) => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Membuat pesanan...",
        });
        checkoutKarya(data)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.update({
                    id,
                    title: "Berhasil",
                    message:
                        "Berhasil membuat pesanan, silahkan melakukan pembayaran!",
                    loading: false,
                    autoClose: 2000,
                    icon: null,
                    color: "teal",
                });
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
        <CheckoutContext.Provider value={[]}>
            <FormProvider form={form}>
                <form onSubmit={form.onSubmit(onSubmitHandler)}>
                    {children}
                </form>
            </FormProvider>
        </CheckoutContext.Provider>
    );
}
