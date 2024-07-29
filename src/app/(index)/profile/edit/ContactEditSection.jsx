"use client";
import { Title, TextInput } from "@mantine/core";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import CardWrapper from "../CardWrapper";
import { useProfileFormContext } from "./ProfileProvider";

export default function ContactEditSection() {
    const form = useProfileFormContext();
    return (
        <CardWrapper>
            <Title order={3}>Kontak Info & Sosial Media</Title>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
                <div className="">
                    <p>Email</p>

                    <span className="space-x-3">
                        <MdMailOutline className="w-5 h-5 inline-block" />
                        <TextInput
                            key={form.key("email")}
                            {...form.getInputProps("email")}
                            className="inline-block"
                        />
                    </span>
                </div>
                <div className="">
                    <p>Instagram</p>
                    <span className="space-x-3">
                        <FaInstagram className="w-5 h-5 inline-block" />
                        <TextInput
                            key={form.key("instagram_id")}
                            {...form.getInputProps("instagram_id")}
                            leftSection="@"
                            className="inline-block"
                        />
                    </span>
                </div>
                <div className="">
                    <p>X</p>
                    <span className="space-x-3">
                        <FaXTwitter className="w-5 h-5 inline-block" />
                        <TextInput
                            key={form.key("x_id")}
                            {...form.getInputProps("x_id")}
                            leftSection="@"
                            className="inline-block"
                        />
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
}
