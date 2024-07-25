import { Title, TextInput } from "@mantine/core";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import CardWrapper from "../CardWrapper";

export default function ContactEditSection() {
    return (
        <CardWrapper>
            <Title order={3}>Kontak Info & Sosial Media</Title>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
                <div className="">
                    <p>Email</p>

                    <span className="space-x-3">
                        <MdMailOutline className="w-5 h-5 inline-block" />
                        <TextInput leftSection="@" className="inline-block" />
                    </span>
                </div>
                <div className="">
                    <p>Instagram</p>
                    <span className="space-x-3">
                        <FaInstagram className="w-5 h-5 inline-block" />
                        <TextInput leftSection="@" className="inline-block" />
                    </span>
                </div>
                <div className="">
                    <p>X</p>
                    <span className="space-x-3">
                        <FaXTwitter className="w-5 h-5 inline-block" />
                        <TextInput leftSection="@" className="inline-block" />
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
}
