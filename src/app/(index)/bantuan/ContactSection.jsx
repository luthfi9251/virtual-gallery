import { getContact } from "@/actions/admin";
import { Group, SimpleGrid, Stack, Title } from "@mantine/core";
import Image from "next/image";

const ICON_IMAGE_NAME = {
    facebook: "/custom-icon/logo-facebook.svg",
    instagram: "/custom-icon/logo-ig.svg",
    hp: "/custom-icon/icon-phone.png",
    gmail: "/custom-icon/logo-gmail.svg",
};

export default async function ContactSection() {
    let contactList = await getContact();
    return (
        <SimpleGrid
            cols={{ base: 1, md: 2 }}
            className=" shadow p-2 md:p-5 rounded border"
        >
            <div className=" flex flex-col justify-center items-center">
                <Title order={2} className="font-bold text-center">
                    Mengalami Kesulitan?
                </Title>
                <p className="text-center">
                    Jika anda masih mengalami kesulitan, silahkan hubungi kami
                    melalui media berikut
                </p>
            </div>
            <Stack className="border p-5 items-center">
                {Object.keys(contactList.data)
                    .filter((item) => item !== "alamat")
                    .map((item, key) => {
                        return (
                            <Group key={key}>
                                <Image
                                    width={20}
                                    height={20}
                                    src={ICON_IMAGE_NAME[item]}
                                    alt="sds"
                                />
                                <p className="font-bold text-sm">
                                    {contactList.data[item]}
                                </p>
                            </Group>
                        );
                    })}
            </Stack>
        </SimpleGrid>
    );
}
