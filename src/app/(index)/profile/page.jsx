import HeadSection from "./HeadSection";
import BioSection from "./BioSection";
import ContactSection from "./ContactSection";
import AccountStatus from "./AccountStatus";
import { Button } from "@mantine/core";
import { FaRegEdit } from "react-icons/fa";
import { getUserProfile } from "@/actions/user";
import Link from "next/link";
import { URL_TANART } from "@/variables/url";

export default async function Page() {
    let data = await getUserProfile();

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1200px] flex flex-col gap-5">
                <HeadSection data={data.profile} />
                <BioSection data={data.profile} />
                <ContactSection data={data} />
                <AccountStatus data={data.pengajuan_akun} />
                <Button
                    leftSection={<FaRegEdit />}
                    component={Link}
                    href={URL_TANART.USER_PROFILE_EDIT}
                    className="self-end"
                >
                    Edit Profil
                </Button>
            </div>
        </div>
    );
}
