import Image from "next/image";
import {
    Title,
    Text,
    Menu,
    MenuTarget,
    MenuDropdown,
    MenuLabel,
    MenuItem,
    ActionIcon,
} from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";

const MenuKarya = () => {
    return (
        <Menu shadow="md" width={200} position="bottom-end">
            <MenuTarget>
                <ActionIcon
                    variant="transparent"
                    className="absolute top-0 right-0 text-black"
                >
                    <BsThreeDotsVertical
                        style={{ width: "60%", height: "60%" }}
                        stroke={1}
                    />
                </ActionIcon>
            </MenuTarget>

            <MenuDropdown>
                <MenuItem>Ubah</MenuItem>
                <MenuItem>Hapus</MenuItem>
            </MenuDropdown>
        </Menu>
    );
};

export default function CardPameran() {
    return (
        <div className="py-2 md:p-3 rounded w-full flex gap-2 shadow">
            <div className="w-1/3  aspect-[5/6] relative rounded overflow-hidden">
                <Image
                    fill
                    objectFit="cover"
                    src="/bg-login.jpg"
                    className="z-10"
                    alt="foto-sampul-pameran"
                />
            </div>
            <div className="w-2/3  flex flex-col h-full gap-2">
                <Title order={4} className="text-xl font-semibold relative">
                    Desired Destiny
                    <MenuKarya />
                </Title>
                <Text className="text-xs font-light line-clamp-5 grow py-1">
                    Lukisan ini menggambarkan perjalanan hidup yang dipandu oleh
                    takdir. Lukisan ini menggambarkan perjalanan hidup yang
                    dipandu oleh takdir.
                </Text>
                <Text className="text-xs text-white bg-tanArt-green  self-start p-1 rounded">
                    Terbuka
                </Text>
                <Text className="text-[10px] justify-self-end">
                    17 Juli 2024 - 16 Agustus 2024
                </Text>
            </div>
        </div>
    );
}
