"use client";
import { updateGeneralTextEditor } from "@/actions/admin";
import BaseRichTextEditor from "@/components/RichTextEditor";
import { URL_TANART } from "@/variables/url";
import { Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function CaraPembayaran({ mode, content = "" }) {
    const router = useRouter();
    const simpanHandler = (html) => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menyimpan data",
        });
        updateGeneralTextEditor(mode, html)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                router.push(URL_TANART.ADMIN_CMS_VIRTUAL_GENERAL);
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
        <div className="p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black my-2">
                {mode.split("_").join(" ")}
            </Title>
            <div>
                <BaseRichTextEditor
                    getValue={simpanHandler}
                    content={content}
                />
            </div>
        </div>
    );
}
