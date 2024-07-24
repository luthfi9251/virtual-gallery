import HeadSection from "./HeadSection";
import BioSection from "./BioSection";
import ContactSection from "./ContactSection";
import AccountStatus from "./AccountStatus";
import { Button } from "@mantine/core";
import { FaRegEdit } from "react-icons/fa";

export default function Page() {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1200px] flex flex-col gap-5">
                <HeadSection />
                <BioSection />
                <ContactSection />
                <AccountStatus />
                <Button leftSection={<FaRegEdit />} className="self-end">
                    Edit Profil
                </Button>
            </div>
        </div>
    );
}
