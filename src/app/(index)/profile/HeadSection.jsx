import Image from "next/image";
import { Title, Text } from "@mantine/core";

export default function HeadSection() {
    return (
        <div className="w-full rounded-lg relative shadow-lg">
            <div className="w-full aspect-[3/1] md:aspect-[5/1] relative rounded-lg">
                <Image
                    fill
                    src="/bg-register.jpg"
                    className="object-cover rounded-lg"
                    loading="eager"
                />
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-end -translate-y-[25%] md:-translate-y-[50%] md:translate-x-10">
                <div className="relative aspect-square w-52">
                    <Image
                        fill
                        loading="eager"
                        src="/bg-login.jpg"
                        className="object-cover rounded-[50%] p-2 bg-white shadow-lg"
                    />
                </div>
                <div>
                    <div className="flex items-center gap-3 flex-col md:flex-row">
                        <Title>Ahmad Sukri</Title>
                        <span className="w-2 h-2 bg-black rounded-[50%] hidden md:block"></span>
                        <span className="font-light text-sm text-center">
                            Member sejak Maret 2024
                        </span>
                    </div>
                    <p className="font-light text-sm text-center md:text-left">
                        @ahmadsukri
                    </p>
                    <p className="text-md font-light text-center md:text-left">
                        Semarang, Jawa Tengah
                    </p>
                </div>
            </div>
        </div>
    );
}
