"use client";
import { createContext, useState } from "react";
import DUMMY from "./DUMMY";
import { isNotEmpty, createFormContext } from "@mantine/form";
import { createPameran } from "@/actions/pameran";
import { notifications } from "@mantine/notifications";

export const PameranContext = createContext(null);
const [FormProvider, useFormContext, useForm] = createFormContext();
export const usePameranFormContext = useFormContext;
export default function PameranProvider({ children, karya }) {
    const form = useForm({
        name: "info-pameran",
        mode: "uncontrolled",
        initialValues: {
            nama_pameran: "",
            deskripsi: "",
            tanggal: [null, null],
        },
        validate: {
            nama_pameran: isNotEmpty("Tidak Boleh Kosong!"),
            deskripsi: isNotEmpty("Tidak Boleh Kosong!"),
            tanggal: (value) =>
                value[0] === null || value[1] === null
                    ? "Jadwal tidak boleh kosong"
                    : null,
        },
    });
    const [pameranData, setPameranData] = useState({
        image: {
            sampul: null,
            hero: null,
        },
        // dataKarya: DUMMY.data,
        dataKarya: karya,
    });
    const [selectedKarya, setSelectedKarya] = useState([]);
    const [error, setError] = useState(null);
    const [heroBlob, setHeroBlob] = useState(null);
    const [sampulBlob, setSampulBlob] = useState(null);
    const [loading, setLoading] = useState(null);

    let onSubmitHandler = (data) => {
        setError(null);
        setLoading(true);
        if (selectedKarya.length === 0) setError("Anda belum memilih karya!");
        if (!sampulBlob) setError("Anda belum memilih GAmbar Sampul");
        if (!heroBlob) setError("Anda belum memilih Gambar Banner");

        const form = new FormData();
        form.append("dataPameran", JSON.stringify(data));
        form.append("karyaList", JSON.stringify(selectedKarya));
        form.append("bannerBlob", heroBlob);
        form.append("sampulBlob", sampulBlob);

        createPameran(form)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.show({
                    title: "Berhasil",
                    message: "Berhasil membuka pameran!",
                });
            })
            .catch((err) => {
                notifications.show({
                    color: "red",
                    title: "Gagal",
                    message: err.message,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <PameranContext.Provider
            value={{
                pameranData,
                setPameranData,
                selectedKarya,
                setSelectedKarya,
                error,
                setHeroBlob,
                setSampulBlob,
                loading,
            }}
        >
            <FormProvider form={form}>
                <form onSubmit={form.onSubmit(onSubmitHandler)}>
                    {children}
                </form>
            </FormProvider>
        </PameranContext.Provider>
    );
}
