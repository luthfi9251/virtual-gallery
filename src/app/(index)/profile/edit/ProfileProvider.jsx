"use client";
import { createContext, useState } from "react";
import { isNotEmpty, createFormContext } from "@mantine/form";
import { editProfile } from "@/actions/user";
import { notifications } from "@mantine/notifications";

export const ProfileContext = createContext(null);
const [FormProvider, useFormContext, useForm] = createFormContext();

export const useProfileFormContext = useFormContext;
export default function ProfileProvider({ children, profileData }) {
    const form = useForm({
        name: "profile",
        mode: "uncontrolled",
        initialValues: {
            tempat_lhr: profileData?.profile.tempat_lhr || "",
            tgl_lhr: profileData?.profile.tgl_lhr || "",
            nama_lengkap: profileData?.profile.nama_lengkap || "",
            username: profileData?.profile.username || "",
            bio: profileData?.profile.bio || "",
            instagram_id: profileData?.sosial_media.instagram_id || "",
            x_id: profileData?.sosial_media.x_id || "",
            email: profileData?.sosial_media.email || "",
        },
        validate: {
            nama_lengkap: isNotEmpty("Tidak boleh kosong!"),
            tempat_lhr: isNotEmpty("Tidak boleh kosong!"),
            tgl_lhr: isNotEmpty("Tidak boleh kosong!"),
            username: isNotEmpty("Tidak boleh kosong!"),
        },
    });
    let [fotoProfil, setFotoProfil] = useState(
        profileData?.profile.fotoProfil || null
    );
    let [fotoSampul, setFotoSampul] = useState(
        profileData?.profile.fotoSampul || null
    );
    let [sampulBlob, setSampulBlob] = useState(null);
    let [profilBlob, setProfilBlob] = useState(null);

    let onSubmitHandler = (data) => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menyimpan data",
        });

        let formData = new FormData();

        Object.keys(data).forEach((keys) => {
            formData.append(keys, data[keys]);
        });

        if (sampulBlob) {
            formData.append("fotoSampul", sampulBlob);
        }

        if (profilBlob) {
            formData.append("fotoProfil", profilBlob);
        }

        editProfile(formData)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.update({
                    id,
                    title: "Berhasil",
                    message: "Berhasil mengubah profil!",
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
        <ProfileContext.Provider
            value={{
                setProfilBlob,
                setSampulBlob,
                fotoProfil,
                setFotoProfil,
                fotoSampul,
                setFotoSampul,
            }}
        >
            <FormProvider form={form}>
                <form onSubmit={form.onSubmit(onSubmitHandler)}>
                    {children}
                </form>
            </FormProvider>
        </ProfileContext.Provider>
    );
}
