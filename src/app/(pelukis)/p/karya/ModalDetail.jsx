"use client";
import BaseModalKarya, { KuratorComment } from "@/components/BaseModalKarya";
import {
    ActionIcon,
    ScrollAreaAutosize,
    Button,
    NumberInput,
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
import { useState, forwardRef, useMemo } from "react";
import { AvatarProfileSmall } from "@/components/AvatarNavbar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import LoadingWrapper from "@/components/LoadingWrapper";
import { getAllKurasiKaryaComment } from "@/actions/kurator";
import { getMinAndMaxHarga, updateKaryaSetharga } from "@/actions/karya";
import { useForm, isInRange, isNotEmpty } from "@mantine/form";
import { formatToRupiah } from "@/lib/formatter";
import { notifications } from "@mantine/notifications";

const FormHarga = forwardRef(
    ({ showFormHandler, handleSubmitForm, idKarya, isLoading }, ref) => {
        const hargaQuery = useQuery({
            queryKey: ["karya", "minmax", idKarya],
            queryFn: async () => await getMinAndMaxHarga(idKarya),
        });

        let formHarga = useForm({
            name: "harga-form",
            mode: "uncontrolled",
            initialValues: {
                harga: 0,
            },
            validate: {
                harga: isNotEmpty("Harga tidak boleh kosong!"),
            },
        });

        return (
            <form
                className="grow"
                onSubmit={formHarga.onSubmit(handleSubmitForm)}
                data-cy="form-tentukan_harga"
            >
                <Stack className="h-full">
                    <NumberInput
                        radius="md"
                        label={
                            <Text fw="bold" size="xs" span>
                                Harga
                            </Text>
                        }
                        name="harga"
                        data-cy="input-harga"
                        leftSection={"Rp. "}
                        thousandSeparator=" "
                        withAsterisk
                        allowNegative={false}
                        key={formHarga.key("harga")}
                        {...formHarga.getInputProps("harga")}
                    />
                    <Text className="text-xs bg-yellow-200 p-2 rounded cursor-default">{`Disarankan untuk memberikan harga sesuai batasan yang diberikan oleh kurator. Batasan harga saat ini : ${formatToRupiah(
                        hargaQuery.data?.harga_min || 0
                    )} - ${formatToRupiah(
                        hargaQuery.data?.harga_maks || 0
                    )}`}</Text>
                    <Group cols={2} className="my-5 self-end w-full">
                        <Button
                            variant="outline"
                            className="flex-1"
                            data-cy="btn-batal"
                            onClick={() => showFormHandler(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            className="flex-1"
                            type="submit"
                            data-cy="btn-submit"
                            loading={isLoading}
                        >
                            Simpan
                        </Button>
                    </Group>
                </Stack>
            </form>
        );
    }
);

const TabKaryaInformation = ({ information }) => {
    const [activeTab, setActiveTab] = useState("informasi");
    const kuratorQuery = useQuery({
        queryKey: ["kurator", "comment", information.id],
        queryFn: async () => await getAllKurasiKaryaComment(information.id),
    });

    return (
        <Tabs
            value={activeTab}
            onChange={(val) => {
                if (val === "review") {
                    kuratorQuery.refetch();
                }
                setActiveTab(val);
            }}
            className="grow flex flex-col overflow-y-auto"
        >
            <TabsList grow>
                <TabsTab value="informasi" data-cy="tab-informasi">
                    Informasi
                </TabsTab>
                <TabsTab value="review" data-cy="tab-review">
                    Review
                </TabsTab>
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
                <LoadingWrapper isLoading={kuratorQuery.isFetching}>
                    {kuratorQuery.data?.map((item, key) => {
                        return (
                            <KuratorComment
                                key={key}
                                userInfo={item.userInfo}
                                kurasiData={item.kurasiData}
                            />
                        );
                    })}
                </LoadingWrapper>
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

export default function ModalDetailKarya({
    disclosure,
    dataActive,
    setOriginalData,
}) {
    const [showHargaForm, setShowHargaForm] = useState(false);
    const [isLoadingUpdateHarga, setIsLoadingUpdateHarga] = useState(false);

    const handleSetHarga = async (data) => {
        const filterAndUpdateState = (state) => {
            return state.map((item) =>
                item.id === dataActive?.id_karya
                    ? { ...item, status: "SELESAI", harga: data.harga }
                    : item
            );
        };

        setIsLoadingUpdateHarga(true);
        updateKaryaSetharga(dataActive.id_karya, data.harga)
            .then((res) => {
                setOriginalData((s) => filterAndUpdateState(s));
                setShowHargaForm(false);
                notifications.show({
                    title: "Berhasil Update Harga!",
                    message: `Selamat, Karya anda siap untuk dipamerkan!`,
                });
                disclosure[1].close();
            })
            .catch((err) => {
                console.error(err);
                notifications.show({
                    title: "Gagal Update Harga!",
                    message: `Terjadi kesalahan saat update harga!`,
                    color: "red",
                });
            })
            .finally(() => setIsLoadingUpdateHarga(false));
    };

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
                        size={35}
                        src={dataActive?.foto_profil}
                    />
                    <Text className="text-sm">{dataActive?.nama_lengkap}</Text>
                </Group>
                {showHargaForm ? (
                    <>
                        <FormHarga
                            handleSubmitForm={handleSetHarga}
                            idKarya={dataActive?.id_karya}
                            showFormHandler={setShowHargaForm}
                            isLoading={isLoadingUpdateHarga}
                        />
                    </>
                ) : (
                    <>
                        <TabKaryaInformation
                            information={{
                                id: dataActive?.id_karya,
                                deskripsi: dataActive?.deskripsi,
                                aliran: dataActive?.aliran,
                                media: dataActive?.media,
                                teknik: dataActive?.teknik,
                                harga: dataActive?.harga,
                                lebar: dataActive?.lebar,
                                panjang: dataActive?.panjang,
                            }}
                        />
                        {!showHargaForm &&
                            dataActive?.status === "TERKURASI" && (
                                <Button
                                    onClick={() => setShowHargaForm(true)}
                                    data-cy="btn-tentukan_harga"
                                >
                                    Tentukan Harga
                                </Button>
                            )}
                    </>
                )}
            </Stack>
        </BaseModalKarya>
    );
}
