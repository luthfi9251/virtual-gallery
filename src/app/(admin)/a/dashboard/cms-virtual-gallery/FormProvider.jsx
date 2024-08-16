"use client";
import { updateCMSVirtualGallery } from "@/actions/admin";
import { isNotEmpty, createFormContext } from "@mantine/form";
import { notifications } from "@mantine/notifications";

const [FormProvider, useFormContext, useForm] = createFormContext();
export const useCMSFormContext = useFormContext;
export default function FormProviderCMS({ children, data }) {
    const form = useForm({
        name: "cms-virtual-gallery",
        mode: "uncontrolled",
        initialValues: {
            nama_pelukis: data.NAMA_FEATURED_PELUKIS,
            bio_pelukis: data.BIO_FEATURED_PELUKIS,
            nama_kurator: data.NAMA_FEATURED_KURATOR,
            bio_kurator: data.BIO_FEATURED_KURATOR,
            jumlah_kurator: parseInt(data.JUMLAH_KURATOR) || 0,
            jumlah_pelukis: parseInt(data.JUMLAH_PELUKIS) || 0,
            foto_pelukis: "",
            foto_kurator: "",
        },
    });

    let onSubmitHandler = (data) => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menyimpan data",
        });
        let dataText = {
            ...data,
            foto_pelukis: "",
            foto_kurator: "",
        };
        let formDataGambar = new FormData();
        formDataGambar.append("foto_kurator", data.foto_kurator);
        formDataGambar.append("foto_pelukis", data.foto_pelukis);
        updateCMSVirtualGallery(dataText, formDataGambar)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.update({
                    id,
                    title: "Berhasil",
                    message: "Berhasil mengupdate data!",
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
        <FormProvider form={form}>
            <form onSubmit={form.onSubmit(onSubmitHandler)}>{children}</form>
        </FormProvider>
    );
}
