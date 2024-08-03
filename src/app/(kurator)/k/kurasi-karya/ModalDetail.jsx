"use client";
import BaseModalKarya, { KuratorComment } from "@/components/BaseModalKarya";
import {
    SimpleGrid,
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
    TextInput,
    NumberInput,
    Textarea,
    NumberFormatter,
} from "@mantine/core";
import { kurasiKarya, getAllKurasiKaryaComment } from "@/actions/kurator";
import { useState, useMemo, forwardRef, useRef } from "react";
import { AvatarProfileSmall } from "@/components/AvatarNavbar";
import { useForm, isInRange, isNotEmpty } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import LoadingWrapper from "@/components/LoadingWrapper";

const FormKurasi = forwardRef(({ showFormHandler, handleSubmitForm }, ref) => {
    let formKurasi = useForm({
        name: "kurasi-form",
        mode: "uncontrolled",
        initialValues: {
            komentar: "",
            harga_maks: 0,
            harga_min: 0,
        },
        validate: {
            komentar: isNotEmpty("Komentar tidak boleh kosong!"),
            harga_min: (value, values) =>
                value >= 0 ? null : "Harga minimal tidak dapat dibawah 0",
            harga_maks: (value, values) =>
                value < values.harga_min
                    ? "Harga maksimal ridak boleh kurang dari Harga minimal!"
                    : null,
        },
    });
    return (
        <form
            className="grow"
            ref={ref}
            onSubmit={formKurasi.onSubmit(handleSubmitForm)}
            data-cy="form-kurasi"
        >
            <Stack className="h-full">
                <Textarea
                    radius="md"
                    label={
                        <Text fw="bold" size="xs" span>
                            Komentar
                        </Text>
                    }
                    name="komentar"
                    data-cy="input-komentar"
                    withAsterisk
                    rows={4}
                    key={formKurasi.key("komentar")}
                    {...formKurasi.getInputProps("komentar")}
                />
                <SimpleGrid className="w-full" cols={2}>
                    <NumberInput
                        radius="md"
                        label={
                            <Text fw="bold" size="xs" span>
                                Harga Minimal
                            </Text>
                        }
                        name="harga_min"
                        data-cy="input-harga_min"
                        leftSection={"Rp. "}
                        thousandSeparator=" "
                        withAsterisk
                        allowNegative={false}
                        key={formKurasi.key("harga_min")}
                        {...formKurasi.getInputProps("harga_min")}
                    />
                    <NumberInput
                        radius="md"
                        label={
                            <Text fw="bold" size="xs" span>
                                Harga Maksimal
                            </Text>
                        }
                        name="harga_maks"
                        data-cy="input-harga_maks"
                        thousandSeparator=" "
                        leftSection={"Rp. "}
                        withAsterisk
                        allowNegative={false}
                        key={formKurasi.key("harga_maks")}
                        {...formKurasi.getInputProps("harga_maks")}
                    />
                </SimpleGrid>
                <Group cols={2} className="my-5 self-end w-full">
                    <Button
                        data-cy="btn-batal"
                        variant="outline"
                        className="flex-1"
                        onClick={() => showFormHandler(false)}
                    >
                        Batal
                    </Button>
                    <Button
                        className="flex-1"
                        type="submit"
                        data-cy="btn-submit"
                    >
                        Simpan
                    </Button>
                </Group>
            </Stack>
        </form>
    );
});

const TabKaryaInformation = ({ information }) => {
    const [activeTab, setActiveTab] = useState("informasi");

    const kuratorQuery = useQuery({
        queryKey: ["kurator", "comment", information.id],
        queryFn: async () => await getAllKurasiKaryaComment(information.id),
        enabled: false,
        staleTime: Infinity,
    });

    return (
        <Tabs
            value={activeTab}
            onChange={(val) => {
                kuratorQuery.refetch();
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
                            {information.harga ? (
                                <NumberFormatter
                                    prefix="Rp. "
                                    value={information.harga}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                />
                            ) : (
                                "Belum ditentukan"
                            )}
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

export default function ModalDetailKarya({
    disclosure,
    dataActive,
    mode = "default",
}) {
    const [showKurasiForm, setShowKurasiForm] = useState(false);
    const kurasiForm = useRef(null);

    const handleSubmitForm = (data) => {
        kurasiKarya({ ...data, id_karya: dataActive.id_karya })
            .then((res) => {
                setShowKurasiForm(false);
                notifications.show({
                    title: "Berhasil Kurasi!",
                    message: `Terimakasih telah mengkurasi karya!`,
                });
                disclosure[1].close();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <BaseModalKarya
            disclosure={disclosure}
            imageSrc={dataActive?.lukisan_url}
        >
            <Stack className="w-full h-full" gap={5}>
                <Title order={2} data-cy="test-judul">
                    {dataActive?.judul}
                </Title>
                <Group>
                    <AvatarProfileSmall
                        size="xs"
                        src={dataActive?.foto_profil}
                    />
                    <Text className="text-sm">{dataActive?.nama_lengkap}</Text>
                </Group>
                {showKurasiForm ? (
                    <>
                        <FormKurasi
                            ref={kurasiForm}
                            handleSubmitForm={handleSubmitForm}
                            showFormHandler={setShowKurasiForm}
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
                        {mode === "kurasi" && (
                            <Button
                                onClick={() => setShowKurasiForm(true)}
                                data-cy="btn-kurasi"
                            >
                                Kurasi
                            </Button>
                        )}
                    </>
                )}
            </Stack>
        </BaseModalKarya>
    );
}
