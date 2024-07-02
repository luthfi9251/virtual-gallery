"use client";
import BaseModalKarya from "@/components/BaseModalKarya";
import {
    ScrollArea,
    ScrollAreaAutosize,
    Space,
    Stack,
    Title,
    Group,
    Text,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
} from "@mantine/core";
import { useState, useMemo } from "react";
import { AvatarProfileSmall } from "@/components/AvatarNavbar";

const TabKaryaInformation = ({ information }) => {
    const [activeTab, setActiveTab] = useState("informasi");
    return (
        <Tabs
            value={activeTab}
            onChange={setActiveTab}
            className="grow flex flex-col"
        >
            <TabsList grow>
                <TabsTab value="informasi">Informasi</TabsTab>
                <TabsTab value="review">Review</TabsTab>
            </TabsList>

            <TabsPanel value="informasi" className="grow py-5 cursor-default">
                <Stack h={"100%"}>
                    <Stack gap="xs">
                        <Text className="text-sm font-semibold">Deskripsi</Text>
                        <Text className="text-sm">{information.deskripsi}</Text>
                    </Stack>
                    <Stack gap="xs">
                        <Text className="text-sm font-semibold">
                            Keterangan
                        </Text>
                        <Text className="text-sm">
                            {information.keterangan}
                        </Text>
                    </Stack>
                    <Stack gap="xs">
                        <Text className="text-sm font-semibold">Harga</Text>
                        <Text className="text-sm">
                            {information.harga || "Belum ditentukan"}
                        </Text>
                    </Stack>
                    <Stack gap="xs">
                        <Text className="text-sm font-semibold">Ukuran</Text>
                        <Text className="text-sm">
                            Panjang {information.panjang} cm x Lebar{" "}
                            {information.lebar} cm
                        </Text>
                    </Stack>
                </Stack>
            </TabsPanel>
            <TabsPanel value="review" className="py-5"></TabsPanel>
        </Tabs>
    );
};

export default function ModalDetailKarya({ disclosure, dataActive }) {
    return (
        <BaseModalKarya
            disclosure={disclosure}
            imageSrc={dataActive?.lukisan_url}
        >
            <Stack className="w-full max-h-full" gap={5}>
                <Title order={2}>{dataActive?.judul}</Title>
                <Group>
                    <AvatarProfileSmall
                        size="xs"
                        src={dataActive?.foto_profil}
                    />
                    <Text className="text-sm">{dataActive?.nama_lengkap}</Text>
                </Group>
                <Space h="sm" />
                <TabKaryaInformation
                    information={{
                        keterangan: dataActive?.keterangan,
                        deskripsi: dataActive?.deskripsi,
                        harga: dataActive?.harga,
                        lebar: dataActive?.lebar,
                        panjang: dataActive?.panjang,
                    }}
                />
            </Stack>
        </BaseModalKarya>
    );
}
