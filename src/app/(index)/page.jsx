import Image from "next/image";
import { Button, Title, Text, SimpleGrid, TextInput } from "@mantine/core";
import PelukisKuratorSection from "./PelukisKuratorSection";
import PameranFeaturedSection from "./PameranFeaturedSection";
import Link from "next/link";
import { URL_TANART } from "@/variables/url";

export default function Home() {
    return (
        <div className="md:pt-[58px]">
            <div className="relative">
                <Image
                    src="/bg-landing-page-hero.jpg"
                    alt="bg hero"
                    width={1200}
                    height={900}
                    className="w-screen h-screen max-h-[800px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50 text-white flex justify-center items-center flex-col p-5 gap-2">
                    <Title className="text-center">
                        Temukan Keajaiban Baru di Setiap Kunjungan
                    </Title>
                    <Text className="max-w-[1000px] text-center text-md md:text-xl">
                        Dari karya seni yang memukau hingga inovasi terkini,
                        setiap sudut pameran ini menyimpan kejutan. Jangan
                        lewatkan kesempatan untuk menjadi yang pertama
                        menyaksikan tren terbaru dan inspirasi segar.
                    </Text>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center p-5 py-14 gap-5">
                <Title className="text-center">EXHIBITIONS</Title>
                <Text className="max-w-[1500px] font-extralight text-center text-md md:text-xl">
                    Jangan lewatkan kesempatan emas untuk menjelajahi
                    karya-karya luar biasa di pameran ini! Mari bersama-sama
                    menikmati keindahan, kreativitas, dan inspirasi yang
                    ditawarkan, dan rasakan pengalaman seni yang tak terlupakan.
                </Text>
            </div>
            <PameranFeaturedSection />
            <PelukisKuratorSection />
            <div className="w-full p-5 py-10 md:p-10 bg-tanArtBlue-600 text-white flex justify-center">
                <div className="flex flex-col gap-5 md:flex-row max-w-[1000px] items-center">
                    <div className="flex-1 flex flex-col gap-2">
                        <Title
                            order={2}
                            className="font-extrabold text-2xl md:text-3xl text-center md:text-left"
                        >
                            Bergabunglah dengan kami !
                        </Title>
                        <Title
                            order={3}
                            className="font-semibold text-base md:text-lg text-center md:text-left"
                        >
                            menjadi pelukis atau kurator di website kami
                        </Title>
                        <Text className="text-sm font-light text-center md:text-left">
                            Tunjukkan karya seni Anda dan bersama-sama kita bisa
                            menciptakan pameran yang luar biasa. Mari menjadi
                            bagian dari komunitas seni yang berkembang pesat
                            ini!"
                        </Text>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <Button
                            variant="white"
                            component={Link}
                            href={URL_TANART.USER_DAFTAR}
                        >
                            Daftar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
