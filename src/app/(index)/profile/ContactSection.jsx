import { Title, Simple } from "@mantine/core";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import CardWrapper from "./CardWrapper";

export default function ContactSection({ data }) {
    console.log(data);
    return (
        <CardWrapper>
            <Title order={3}>Kontak Info & Sosial Media</Title>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
                <div className="">
                    <p>Email</p>
                    <span className="space-x-3">
                        <MdMailOutline className="w-5 h-5 inline-block" />
                        <span>{data.sosial_media.email}</span>
                    </span>
                </div>
                <div className="">
                    <p>Instagram</p>
                    <span className="space-x-3">
                        <FaInstagram className="w-5 h-5 inline-block" />
                        <span>{data.sosial_media.instagram_id}</span>
                    </span>
                </div>
                <div className="">
                    <p>X</p>
                    <span className="space-x-3">
                        <FaXTwitter className="w-5 h-5 inline-block" />
                        <span>{data.sosial_media.x_id}</span>
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
}
