import { Loader, Space, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import FAQGroup from "./FAQGroup";
import { faker } from "@faker-js/faker";
import FAQSection from "./FAQSection";
import { Suspense } from "react";
import ContactSection from "./ContactSection";

export default function Page() {
    return (
        <div className="w-full flex justify-center">
            <div className=" w-full max-w-[1300px] flex flex-col p-1 md:p-2 mt-[60px]">
                <Stack className=" items-center">
                    <Title className="text-6xl uppercase text-tanArtBlue-600 font-black text-center">
                        Bantuan
                    </Title>
                    <Text className="text-sm">
                        Silahkan melihat panduan yang telah kami sediakan
                    </Text>
                    <Image
                        src="/faq-illustration.svg"
                        width={500}
                        height={600}
                        alt="FAQ"
                    />
                    <Suspense fallback={Loader}>
                        <FAQSection />
                    </Suspense>
                    <Space h="xl" />
                    <ContactSection />
                </Stack>
            </div>
        </div>
    );
}
