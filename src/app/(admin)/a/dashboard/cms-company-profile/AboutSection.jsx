"use client";
import { addAndUpdateAbout, getAboutLP } from "@/actions/admin";
import { Title, Textarea, Button } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AboutSection({ text }) {
    let [preview, setPreview] = useDebouncedState(text, 600);
    const handleSimpan = () => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menyimpan data",
        });
        addAndUpdateAbout(preview)
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
        <div className=" p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black">
                Tentang Kami
            </Title>
            <form className="flex flex-col gap-5">
                <Textarea
                    onChange={(e) => setPreview(e.target.value)}
                    label="Tentang kami"
                    description="Disarankan untuk menuliskan deskripsi tidak lebih dari 100 kata"
                    withAsterisk
                    defaultValue={text}
                    rows={4}
                />
                <Button className="self-start" onClick={handleSimpan}>
                    Simpan
                </Button>
            </form>
            <Title order={3} className="text-center my-5">
                Preview
            </Title>
            <div className="bg-tanArtBlue-600 flex flex-col text-white items-center justify-center text-center p-5 gap-5 ">
                <h2 className="font-bold text-2xl md:text-4xl max-w-[1100px]">
                    Tentang Kami
                </h2>
                <p className="md:leading-8 max-w-[1100px] md:text-base text-sm">
                    {preview}
                </p>
            </div>
        </div>
    );
}
