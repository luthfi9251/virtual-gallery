"use client";
import BaseModalKarya from "@/components/BaseModalKarya";
import {
    ScrollArea,
    Button,
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
            className="grow flex flex-col overflow-y-auto"
        >
            <TabsList grow>
                <TabsTab value="informasi">Informasi</TabsTab>
                <TabsTab value="review">Review</TabsTab>
            </TabsList>

            <TabsPanel
                value="informasi"
                className="grow py-5 cursor-default overflow-y-auto"
            >
                <Stack>
                    <Stack gap="xs">
                        <Text className="text-sm font-semibold">Deskripsi</Text>
                        <Text className="text-sm">{information.deskripsi}</Text>
                    </Stack>
                    <Stack gap="xs">
                        <Text className="text-sm font-semibold">Aliran</Text>
                        <Text className="text-sm">{information.aliran}</Text>
                    </Stack>
                    <Stack gap="xs">
                        <Text className="text-sm font-semibold">Media</Text>
                        <Text className="text-sm">{information.media}</Text>
                    </Stack>
                    <Stack gap="xs">
                        <Text className="text-sm font-semibold">Teknik</Text>
                        <Text className="text-sm">{information.teknik}</Text>
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
            <TabsPanel
                value="review"
                className="py-5 overflow-y-auto"
            ></TabsPanel>
        </Tabs>
    );
};

export default function ModalDetailKarya({
    disclosure,
    dataActive,
    mode = "default",
}) {
    const [showKurasiForm, setShowKurasiForm] = useState(false);
    return (
        <BaseModalKarya
            disclosure={disclosure}
            imageSrc={dataActive?.lukisan_url}
        >
            <Stack className="w-full h-full" gap={5}>
                <Title order={2}>{dataActive?.judul}</Title>
                <Group>
                    <AvatarProfileSmall
                        size="xs"
                        src={dataActive?.foto_profil}
                    />
                    <Text className="text-sm">{dataActive?.nama_lengkap}</Text>
                </Group>
                {showKurasiForm ? (
                    <></>
                ) : (
                    <>
                        <TabKaryaInformation
                            information={{
                                deskripsi: dataActive?.deskripsi,
                                aliran: dataActive?.aliran,
                                media: dataActive?.media,
                                teknik: dataActive?.teknik,
                                harga: dataActive?.harga,
                                lebar: dataActive?.lebar,
                                panjang: dataActive?.panjang,
                            }}
                        />
                        {mode === "kurasi" && (
                            <Button onClick={() => setShowKurasiForm(true)}>
                                Kurasi
                            </Button>
                        )}
                    </>
                )}
            </Stack>
        </BaseModalKarya>
    );
}
