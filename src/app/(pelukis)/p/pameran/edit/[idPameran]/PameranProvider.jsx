"use client";
import { createContext, useState } from "react";
import { isNotEmpty, createFormContext } from "@mantine/form";
import { updatePameranById } from "@/actions/pameran";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { URL_TANART } from "@/variables/url";

export const PameranContext = createContext(null);
const [FormProvider, useFormContext, useForm] = createFormContext();
export const usePameranFormContext = useFormContext;

export default function PameranProvider({ children, karya, data }) {
    let idPameran = data.id;
    let router = useRouter();
    const form = useForm({
        name: "info-pameran",
        mode: "uncontrolled",
        initialValues: {
            nama_pameran: data.nama_pameran,
            deskripsi: data.deskripsi,
            tanggal: [new Date(data.tgl_mulai), new Date(data.tgl_selesai)],
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
            sampul: data.sampul_url,
            hero: data.banner_url,
        },
        // dataKarya: DUMMY.data,
        dataKarya: karya,
    });
    const [selectedKarya, setSelectedKarya] = useState(
        data.KaryaPameran.map((item) => item.Karya.id)
    );
    const [error, setError] = useState(null);
    const [heroBlob, setHeroBlob] = useState(null);
    const [sampulBlob, setSampulBlob] = useState(null);
    const [loading, setLoading] = useState(null);

    let onSubmitHandler = (data) => {
        setError(null);
        setLoading(true);
        if (selectedKarya.length === 0) setError("Anda belum memilih karya!");

        const form = new FormData();
        form.append("dataPameran", JSON.stringify(data));
        form.append("karyaList", JSON.stringify(selectedKarya));
        form.append("bannerBlob", heroBlob);
        form.append("sampulBlob", sampulBlob);

        updatePameranById(idPameran, form)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.show({
                    title: "Berhasil",
                    message: "Berhasil mengedit pameran!",
                });
                router.push(URL_TANART.PELUKIS_PAMERAN);
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
                heroBlob,
                setHeroBlob,
                sampulBlob,
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
