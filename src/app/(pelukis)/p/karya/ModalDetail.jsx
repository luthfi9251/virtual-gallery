"use client";
import BaseModalKarya, { KuratorComment } from "@/components/BaseModalKarya";
import {
    ActionIcon,
    ScrollAreaAutosize,
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
    Menu,
    MenuTarget,
    MenuDropdown,
    MenuLabel,
    MenuItem,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState, useMemo } from "react";
import { AvatarProfileSmall } from "@/components/AvatarNavbar";
import { BsThreeDotsVertical } from "react-icons/bs";

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
                component={Stack}
            >
                <KuratorComment />
                <KuratorComment />
                <KuratorComment />
            </TabsPanel>
        </Tabs>
    );
};

const openDeleteModal = () =>
    modals.openConfirmModal({
        title: "Hapus Karya",
        centered: true,
        children: (
            <Text size="sm">
                Anda yakin akan menghapus karya anda? Seluruh data kurasi pada
                karya ini akan ikut terhapus
            </Text>
        ),
        labels: { confirm: "Hapus Karya", cancel: "Batal" },
        confirmProps: { color: "red" },
        onCancel: () => console.log("Cancel"),
        onConfirm: () => console.log("Confirmed"),
    });

const MenuKarya = () => {
    return (
        <Menu shadow="md" width={200} position="bottom-end">
            <MenuTarget>
                <ActionIcon
                    variant="transparent"
                    className="absolute top-0 right-0 text-black"
                >
                    <BsThreeDotsVertical
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </MenuTarget>

            <MenuDropdown>
                <MenuLabel>Aksi</MenuLabel>
                <MenuItem>Ubah</MenuItem>
                <MenuItem onClick={openDeleteModal}>Hapus</MenuItem>
            </MenuDropdown>
        </Menu>
    );
};

export default function ModalDetailKarya({ disclosure, dataActive }) {
    return (
        <BaseModalKarya
            disclosure={disclosure}
            imageSrc={dataActive?.lukisan_url}
        >
            <Stack className="w-full h-full relative" gap={5}>
                <MenuKarya />
                <Title order={2}>{dataActive?.judul}</Title>
                <Group>
                    <AvatarProfileSmall
                        size="xs"
                        src={dataActive?.foto_profil}
                    />
                    <Text className="text-sm">{dataActive?.nama_lengkap}</Text>
                </Group>
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
                <Button>Test Button</Button>
            </Stack>
        </BaseModalKarya>
    );
}
