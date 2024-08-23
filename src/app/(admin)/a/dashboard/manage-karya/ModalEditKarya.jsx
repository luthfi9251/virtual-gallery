"use client";
import {
    deletekomentarKurasiKurator,
    updateDataLukisan,
} from "@/actions/admin";
import { getKaryaByID } from "@/actions/karya";
import { getAllKurasiKaryaComment } from "@/actions/kurator";
import { AvatarProfileSmall } from "@/components/AvatarNavbar";
import { KuratorCommentV2 } from "@/components/BaseModalKarya";
import LoadingWrapper from "@/components/LoadingWrapper";
import { formatToRupiah } from "@/lib/formatter";
import {
    Modal,
    SimpleGrid,
    Stack,
    TextInput,
    Text,
    Textarea,
    Fieldset,
    NumberInput,
    Button,
    Group,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function ModalEditKarya({ disclosure, karyaId, dataKarya }) {
    const queryClient = useQueryClient();
    let [opened, { open, close }] = disclosure;
    return (
        <Modal opened={opened} onClose={close} size="1300px" title="Edit Karya">
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <FormDataKaryaSection
                    karyaId={karyaId}
                    queryClient={queryClient}
                    closeModal={close}
                    dataKarya={dataKarya}
                />
                <KurasiKuratorSection
                    karyaId={karyaId}
                    queryClient={queryClient}
                />
            </SimpleGrid>
        </Modal>
    );
}

function FormDataKaryaSection({ karyaId, queryClient, closeModal, dataKarya }) {
    const [isLoadingSimpan, setIsLoadingSimpan] = useState(false);
    let form = useForm({
        name: "unggah-karya",
        mode: "uncontrolled",
        initialValues: {
            judul: dataKarya.judul,
            deskripsi: dataKarya.deskripsi,
            aliran: dataKarya.aliran,
            media: dataKarya.media,
            teknik: dataKarya.teknik,
            panjang: dataKarya.panjang,
            lebar: dataKarya.lebar,
            harga: dataKarya.harga,
        },
        validate: {
            judul: hasLength(
                { min: 1, max: 100 },
                "Wajib diisi, Maksimal 100 karakter!"
            ),
            deskripsi: hasLength(
                { min: 5, max: 500 },
                "Minimal 5 Karakter dan Maksimal 500 Karakter!"
            ),
            aliran: isNotEmpty("Tidak boleh kosong!"),
            media: isNotEmpty("Tidak boleh kosong!"),
            teknik: isNotEmpty("Tidak boleh kosong!"),
            panjang: isNotEmpty("Tidak boleh kosong!"),
            lebar: isNotEmpty("Tidak boleh kosong!"),
            harga: isNotEmpty("Harga tidak boleh kosong!"),
        },
    });

    const mutation = useMutation({
        mutationFn: async (data) => await updateDataLukisan(karyaId, data),
        onSuccess: (data) => {
            if (data.isError) {
                throw data.error;
            }

            queryClient.invalidateQueries({
                queryKey: ["karya_by_id_data", karyaId],
            });
            closeModal();
            notifications.show({
                title: "Berhasil",
                message: "Berhasil mengupdate data!",
                loading: false,
                autoClose: 2000,
                icon: null,
                color: "teal",
            });
        },
        onError: (error) => {
            notifications.show({
                color: "red",
                title: "Gagal",
                message: error.message,
                loading: false,
                autoClose: 2000,
                icon: null,
            });
        },
    });

    const handleSimpan = (data) => {
        setIsLoadingSimpan(true);
        mutation.mutateAsync(data).finally(() => {
            setIsLoadingSimpan(false);
        });
    };

    return (
        <div className="w-full">
            <form
                onSubmit={form.onSubmit(handleSimpan)}
                className="p-2 border rounded"
            >
                <Stack gap={{ base: "xs", md: "sm" }}>
                    <TextInput
                        label={
                            <Text fw="bold" className="text-sm" span>
                                Judul
                            </Text>
                        }
                        data-cy="input-judul"
                        withAsterisk
                        radius="md"
                        description="Sebaiknya judul tidak lebih dari 5 kata"
                        {...form.getInputProps("judul")}
                    />
                    <Textarea
                        label={
                            <Text fw="bold" className="text-sm" span>
                                Deskripsi
                            </Text>
                        }
                        description="Berikan deskripsi karya anda secara lengkap"
                        data-cy="input-deskripsi"
                        rows={4}
                        withAsterisk
                        {...form.getInputProps("deskripsi")}
                    />
                    <TextInput
                        label={
                            <Text fw="bold" className="text-sm" span>
                                Aliran
                            </Text>
                        }
                        withAsterisk
                        data-cy="input-aliran"
                        radius="md"
                        description="Aliran lukisan yang digunakan"
                        {...form.getInputProps("aliran")}
                    />
                    <TextInput
                        label={
                            <Text fw="bold" className="text-sm" span>
                                Media
                            </Text>
                        }
                        withAsterisk
                        data-cy="input-media"
                        radius="md"
                        description="Media yang digunakan"
                        {...form.getInputProps("media")}
                    />
                    <TextInput
                        label={
                            <Text fw="bold" className="text-sm" span>
                                Teknik
                            </Text>
                        }
                        withAsterisk
                        data-cy="input-teknik"
                        radius="md"
                        description="Teknik yang digunakan"
                        {...form.getInputProps("teknik")}
                    />

                    <SimpleGrid
                        cols={2}
                        className="w-full"
                        component={Fieldset}
                        legend="Dimensi Karya"
                    >
                        <NumberInput
                            label={
                                <Text fw="bold" className="text-sm" span>
                                    Panjang (cm)
                                </Text>
                            }
                            radius="md"
                            withAsterisk
                            data-cy="input-panjang"
                            allowDecimal
                            decimalScale={2}
                            {...form.getInputProps("panjang")}
                        />
                        <NumberInput
                            label={
                                <Text fw="bold" className="text-sm" span>
                                    Lebar (cm)
                                </Text>
                            }
                            allowDecimal
                            radius="md"
                            withAsterisk
                            data-cy="input-lebar"
                            decimalScale={2}
                            {...form.getInputProps("lebar")}
                        />
                    </SimpleGrid>
                    <NumberInput
                        radius="md"
                        label={
                            <Text fw="bold" size="sm" span>
                                Harga
                            </Text>
                        }
                        name="harga"
                        data-cy="input-harga"
                        leftSection={"Rp. "}
                        thousandSeparator=" "
                        withAsterisk
                        allowNegative={false}
                        key={form.key("harga")}
                        {...form.getInputProps("harga")}
                    />
                    <Button
                        type="submit"
                        className=" md:self-end"
                        data-cy="btn-simpan"
                        loading={isLoadingSimpan}
                    >
                        Simpan
                    </Button>
                </Stack>
            </form>
        </div>
    );
}

function KurasiKuratorSection({ queryClient, karyaId }) {
    const kuratorQuery = useQuery({
        queryKey: ["kurator", "comment", karyaId],
        queryFn: async () => {
            if (karyaId) {
                let response = await getAllKurasiKaryaComment(karyaId);
                return response;
            } else {
                return null;
            }
        },
        staleTime: 1000 * 60 * 5,
    });

    const openModal = (id) =>
        modals.openConfirmModal({
            title: "Please confirm your action",
            children: (
                <Text size="sm">
                    Aakah anda yakin untuk menghapus komentar kurasi kurator?
                </Text>
            ),
            labels: { confirm: "Confirm", cancel: "Cancel" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => handleHapus(id),
        });

    const handleHapus = (idKurasi) => {
        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menghapus data",
        });
        deletekomentarKurasiKurator(idKurasi)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                queryClient.invalidateQueries({
                    queryKey: ["kurator", "comment", karyaId],
                });
                notifications.update({
                    id,
                    title: "Berhasil",
                    message: "Berhasil mengupdate data!",
                    loading: false,
                    autoClose: 2000,
                    icon: null,
                    color: "teal",
                });
            })
            .catch((err) => {
                notifications.update({
                    id,
                    color: "red",
                    title: "Gagal",
                    message: err.message,
                    loading: false,
                    autoClose: 2000,
                    icon: null,
                });
            });
    };

    return (
        <LoadingWrapper isLoading={kuratorQuery.isLoading}>
            <div className="w-full overflow-x-auto">
                {kuratorQuery.data?.length == 0 && <p>Tidak ada kurasi</p>}
                {kuratorQuery.data?.map((item, key) => {
                    return (
                        <div className="border rounded flex flex-col">
                            <KuratorCommentEdit
                                key={key}
                                userInfo={item.userInfo}
                                kurasiData={item.kurasiData}
                            />
                            <Button
                                color="red"
                                onClick={() => openModal(item.id)}
                                className="mx-3 mb-3 self-end"
                            >
                                Hapus
                            </Button>
                        </div>
                    );
                })}
            </div>
        </LoadingWrapper>
    );
}

const KuratorCommentEdit = ({ userInfo, kurasiData }) => {
    return (
        <div className="flex gap-2 p-3" data-cy="card-komen">
            <div>
                <AvatarProfileSmall size={30} />
            </div>
            <Stack gap="xs" className="w-full">
                <Group>
                    <Text
                        className="text-md font-semibold"
                        data-cy="text-nama_lengkap"
                    >
                        {userInfo.nama_lengkap}
                    </Text>
                </Group>
                <Text className="text-xs font-light" data-cy="text-komentar">
                    {kurasiData.komentar}
                </Text>
                <Stack gap={0} className="cursor-default md:self-end md:px-3">
                    <Text className=" font-medium text-xs">Range Harga</Text>
                    <Text
                        className=" font-extrabold text-md p-1 rounded self-start "
                        data-cy="text-range_harga"
                    >
                        {formatToRupiah(kurasiData.harga_min)} -{" "}
                        {formatToRupiah(kurasiData.harga_maks)}
                    </Text>
                </Stack>
            </Stack>
        </div>
    );
};
