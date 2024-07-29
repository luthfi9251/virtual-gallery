import { Button, Group } from "@mantine/core";
import HeadEditSection from "./HeadEditSection";
import BioEditSection from "./BioEditSection";
import ContactEditSection from "./ContactEditSection";
import ProfileProvider from "./ProfileProvider";
import { getUserProfileEdit } from "@/actions/user";
import { URL_TANART } from "@/variables/url";
import Link from "next/link";

export default async function Page() {
    let data = await getUserProfileEdit();
    return (
        <ProfileProvider profileData={data}>
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[1200px] flex flex-col gap-5">
                    <HeadEditSection />
                    <BioEditSection />
                    <ContactEditSection />
                    <Group className="self-end">
                        <Button
                            variant="outline"
                            component={Link}
                            href={URL_TANART.USER_PROFILE}
                        >
                            Kembali
                        </Button>
                        <Button type="submit">Simpan</Button>
                    </Group>
                </div>
            </div>
        </ProfileProvider>
    );
}
