import { Button, Group } from "@mantine/core";
import HeadEditSection from "./HeadEditSection";
import BioEditSection from "./BioEditSection";
import ContactEditSection from "./ContactEditSection";

export default function Page() {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1200px] flex flex-col gap-5">
                <HeadEditSection />
                <BioEditSection />
                <ContactEditSection />
                <Group className="self-end">
                    <Button variant="outline">Batalkan</Button>
                    <Button>Simpan</Button>
                </Group>
            </div>
        </div>
    );
}
