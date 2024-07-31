import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Title, Avatar, Group } from "@mantine/core";
import { MdOutlineCalendarMonth } from "react-icons/md";
import Link from "next/link";

export default function CardPameran({ isMostViewed = false }) {
    return (
        <div className="shadow flex flex-col rounded-xl overflow-hidden">
            <Image
                src="/bg-login.jpg"
                width={800}
                height={800}
                alt="p"
                className="w-full aspect-[5/2] object-cover"
            />
            <div className="px-2 md:px-3 xl:px-5 pb-5">
                <Title
                    order={3}
                    className={twMerge(
                        "grow my-5 block hover:underline",
                        isMostViewed
                            ? "text-lg md:text-2xl"
                            : " text-md md:text-lg"
                    )}
                    component={Link}
                    href="#"
                >
                    Look Again: European Paintings 1300-1800
                </Title>
                <div className="w-full flex justify-between">
                    <Group className="gap-0 md:gap-2">
                        <Avatar src="/bg-login.jpg" alt="it's me" size="sm" />
                        <p className="text-xs lg:text-sm">Pelukis Handal</p>
                    </Group>
                    <div className="flex items-center gap-2">
                        <MdOutlineCalendarMonth className="text-tanArtBlue-600 h-4 w-4 lg:h-7 lg:w-7 inline-block" />
                        <span className="text-tanArtBlue-600 font-bold text-xs">
                            27 - 28 Agustus 2024
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
