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
import dayjs from "dayjs";
import Link from "next/link";
import { pameranSampulLoader } from "@/loader/imageLoader";
import { URL_TANART } from "@/variables/url";

const MenuKarya = ({ idPameran }) => {
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
                <MenuItem
                    component={Link}
                    href={URL_TANART.PELUKIS_PAMERAN_EDIT(idPameran)}
                >
                    Ubah
                </MenuItem>
            </MenuDropdown>
        </Menu>
    );
};

let StatusPameran = ({ status }) => {
    if (status == "OPEN") {
        return (
            <Text className="text-xs text-white bg-tanArt-green  self-start p-1 rounded">
                {status}
            </Text>
        );
    } else if (status == "CLOSE") {
        return (
            <Text className="text-xs text-white bg-tanArt-yellow  self-start p-1 rounded">
                {status}
            </Text>
        );
    } else {
        return (
            <Text className="text-xs text-white bg-tanArt-grey  self-start p-1 rounded">
                {status}
            </Text>
        );
    }
};

export default function CardPameran({ data }) {
    return (
        <div className="py-2 md:p-3 rounded w-full flex gap-2 shadow-md cursor-default">
            <div className="w-1/3  aspect-[5/6] relative rounded overflow-hidden">
                <Image
                    fill
                    objectFit="cover"
                    src={data.sampul_url}
                    className="z-10"
                    quality={40}
                    alt="foto-sampul-pameran"
                    loader={pameranSampulLoader}
                />
            </div>
            <div className="w-2/3  flex flex-col h-full gap-2">
                <Title order={4} className="text-xl font-semibold relative">
                    {data.nama_pameran}
                    <MenuKarya idPameran={data.id} />
                </Title>
                <Text className="text-xs font-light line-clamp-5 grow py-1 ">
                    {data.deskripsi}
                </Text>
                <StatusPameran status={data.statusComputed} />
                <Text className="text-[10px] justify-self-end">
                    {dayjs(data.tgl_mulai).locale("id").format("DD MMMM YYYY")}{" "}
                    -{" "}
                    {dayjs(data.tgl_selesai)
                        .locale("id")
                        .format("DD MMMM YYYY")}
                </Text>
            </div>
        </div>
    );
}
