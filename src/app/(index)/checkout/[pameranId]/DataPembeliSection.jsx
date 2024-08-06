"use client";
import { TextInput } from "@mantine/core";
import { useCheckouFormContext } from "./ChekoutProvider";

export default function DataPembeliSection() {
    const form = useCheckouFormContext();
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-5">
            <TextInput
                className=""
                label="Nama Lengkap"
                disabled
                key={form.key("nama_lengkap")}
                {...form.getInputProps("nama_lengkap")}
            />
            <TextInput
                className=""
                label="Email"
                disabled
                key={form.key("email")}
                {...form.getInputProps("email")}
            />
            <TextInput
                className=""
                label="No. WhatsApp"
                withAsterisk
                key={form.key("no_whatsapp")}
                {...form.getInputProps("no_whatsapp")}
            />
        </div>
    );
}
