"use client";
import { updateDataLukisanPelukis } from "@/actions/karya";
import { URL_TANART } from "@/variables/url";
import {
    Button,
    NumberInput,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    Textarea,
    Fieldset,
    Title,
    Group,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function KaryaForm({ dataKarya }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    let form = useForm({
        name: "unggah-karya",
        mode: "uncontrolled",
        initialValues: {
            judul: dataKarya?.judul,
            deskripsi: dataKarya?.deskripsi,
            aliran: dataKarya?.aliran,
            media: dataKarya?.media,
            teknik: dataKarya?.teknik,
            harga: dataKarya?.harga,
            panjang: dataKarya?.panjang,
            lebar: dataKarya?.lebar,
        },
        validate: {
            judul: hasLength(
                { min: 1, max: 100 },
                "Wajib diisi, Maksimal 100 karakter!"
            ),
            deskripsi: hasLength(
                { min: 5, max: 1000 },
                "Minimal 5 Karakter dan Maksimal 1000 Karakter!"
            ),
            aliran: isNotEmpty("Tidak boleh kosong!"),
            media: isNotEmpty("Tidak boleh kosong!"),
            teknik: isNotEmpty("Tidak boleh kosong!"),
            panjang: isNotEmpty("Tidak boleh kosong!"),
            lebar: isNotEmpty("Tidak boleh kosong!"),
        },
    });

    const handleUpdateKarya = (formData) => {
        setIsLoading(true);
        updateDataLukisanPelukis(dataKarya.id, formData)
            .then((res) => {
                if (res.isError) throw res.error;
                notifications.show({
                    title: "Berhasil",
                    message: "berhasil mengubah informasi lukisan",
                });
                router.push("/p/karya");
            })
            .catch((err) =>
                notifications.show({ title: "Gagal", message: err })
            )
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="py-1 overflow-y-auto md:flex-1 h-full flex items-center justify-center flex-col gap-2 relative">
            <Stack className="w-full max-w-[700px] md:h-full" gap="xs">
                <div>
                    <Title order={2}>Ubah Informasi Karya</Title>
                    <Text size="sm">
                        Silahkan mengubah informasi karya, anda tidak dapat
                        mengganti foto karya yang telah diunggah.
                    </Text>
                </div>

                <form onSubmit={form.onSubmit(handleUpdateKarya)}>
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
                            rows={6}
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
                                <Text fw="bold" size="xs" span>
                                    Harga
                                </Text>
                            }
                            disabled={!dataKarya?.harga}
                            name="harga"
                            data-cy="input-harga"
                            leftSection={"Rp. "}
                            thousandSeparator=" "
                            withAsterisk
                            allowNegative={false}
                            allowDecimal={false}
                            {...form.getInputProps("harga")}
                        />
                        <Group className=" md:self-end">
                            <Button
                                className=" md:self-end"
                                data-cy="btn-batal"
                                color="red"
                                disabled={isLoading}
                                component={Link}
                                href={URL_TANART.PELUKIS_KARYA}
                                variant="outline"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                data-cy="btn-submit"
                                loading={isLoading}
                            >
                                Simpan
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Stack>
        </div>
    );
}
