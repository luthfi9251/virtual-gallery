"use client";
import { getKaryaByID } from "@/actions/karya";
import LoadingWrapper from "@/components/LoadingWrapper";
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
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";

export default function ModalEditKarya({ disclosure, karyaId }) {
    let [opened, { open, close }] = disclosure;
    return (
        <Modal opened={opened} onClose={close} size="1300px" title="Edit Karya">
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <FormDataKaryaSection karyaId={karyaId} />
                <div className="w-full">2</div>
            </SimpleGrid>
        </Modal>
    );
}

function FormDataKaryaSection({ karyaId }) {
    console.log({ karyaId });
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["karya_by_id_data", karyaId],
        queryFn: async () => {
            console.log("HHALLO");
            if (karyaId) {
                let response = await getKaryaByID(karyaId);
                if (!response.isError) {
                    return response.data;
                } else {
                    throw response.error;
                }
            }
        },
        staleTime: 1000 * 60 * 3,
    });
    console.log({ error, data });
    let form = useForm({
        name: "unggah-karya",
        mode: "controlled",
        initialValues: {
            judul: data?.judul,
            deskripsi: data?.deskripsi,
            aliran: data?.aliran,
            media: data?.media,
            teknik: data?.teknik,
            panjang: data?.panjan,
            lebar: data?.leba,
            harga: 0,
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
    return (
        <div className="w-full">
            <LoadingWrapper isLoading={isLoading}>
                {isError && (
                    <span className="p-2 text-white bg-red-400">
                        Terjadi kesalahan saat memuat data
                    </span>
                )}
                <form onSubmit={form.onSubmit()} className="p-2 border rounded">
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
                            rows={2}
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
                        >
                            Simpan
                        </Button>
                    </Stack>
                </form>
            </LoadingWrapper>
        </div>
    );
}
