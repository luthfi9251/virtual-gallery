"use client";
import { useDisclosure } from "@mantine/hooks";
import { useRef, useState } from "react";
import {
    SimpleGrid,
    TextInput,
    ActionIcon,
    Button,
    Stack,
    Text,
    Textarea,
    NumberInput,
    Title,
    Fieldset,
} from "@mantine/core";
import {
    useForm,
    isNotEmpty,
    isEmail,
    isInRange,
    hasLength,
    matchesField,
} from "@mantine/form";
import Image from "next/image";
import { DropzoneImage } from "./DropzoneImage";
import { FaCropAlt } from "react-icons/fa";
import ModalCropperUnggah from "./ModalCropperUnggah";
import { notifications } from "@mantine/notifications";
import { unggahKaryaPelukis } from "@/actions/karya";
import { useRouter } from "next/navigation";
import clsx from "clsx";

function ImagePreview({ aspect, imageURL, openCropper }) {
    if (aspect === "1/1") {
        return (
            <div className="w-full h-full flex items-center relative max-w-[900px] max-h-[800px] border">
                <Image
                    src={imageURL}
                    alt="preview"
                    fill
                    className="object-contain rounded"
                />
                <ActionIcon
                    className="absolute bottom-2 right-2"
                    variant="filled"
                    color="rgba(20, 20, 20, 0.6)"
                    size="lg"
                    radius="xl"
                    aria-label="Settings"
                    onClick={openCropper}
                >
                    <FaCropAlt
                        style={{ width: "60%", height: "60%" }}
                        stroke={1.3}
                    />
                </ActionIcon>
            </div>
        );
    } else if (aspect === "4/5") {
        return (
            <div className="w-full h-full flex items-center relative max-w-[900px] max-h-[800px] border">
                <Image
                    src={imageURL}
                    fill
                    alt="preview"
                    className="object-contain  rounded"
                />
                <ActionIcon
                    className="absolute bottom-2 right-2"
                    variant="filled"
                    color="rgba(20, 20, 20, 0.6)"
                    size="lg"
                    radius="xl"
                    aria-label="Settings"
                    onClick={openCropper}
                >
                    <FaCropAlt
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </div>
        );
    } else if (aspect === "3/2") {
        return (
            <div className="w-full h-full flex items-center relative max-w-[900px] max-h-[800px] border">
                <Image
                    src={imageURL}
                    fill
                    alt="preview"
                    className="object-contain  rounded"
                />
                <ActionIcon
                    className="absolute bottom-2 right-2"
                    variant="filled"
                    color="rgba(20, 20, 20, 0.6)"
                    size="lg"
                    radius="xl"
                    aria-label="Settings"
                    onClick={openCropper}
                >
                    <FaCropAlt
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </div>
        );
    } else {
        return null;
    }
}

export default function Page() {
    const router = useRouter();
    const openRef = useRef(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageExt, setImageExt] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [imageURLPreview, setImageURLPreview] = useState(imageURL);
    const [imageAspectRatio, setImageAspectRatio] = useState("1/1");
    const [opened, { open, close }] = useDisclosure(false);

    let form = useForm({
        name: "unggah-karya",
        mode: "uncontrolled",
        initialValues: {
            judul: "",
            deskripsi: "",
            aliran: "",
            media: "",
            teknik: "",
            panjang: 0,
            lebar: 0,
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
        },
    });

    let handleUnggahKarya = (data) => {
        setIsLoading(true);
        let formData = new FormData();

        formData.append("judul", data.judul);
        formData.append("deskripsi", data.deskripsi);
        formData.append("aliran", data.aliran);
        formData.append("teknik", data.teknik);
        formData.append("media", data.media);
        formData.append("panjang", data.panjang);
        formData.append("lebar", data.lebar);
        formData.append("ext", imageExt);

        if (imageBlob) {
            formData.append("karya", imageBlob);
        } else {
            setIsLoading(false);
            return notifications.show({
                title: "Kesalahan",
                message: "Anda belum memilih karya!",
                color: "red",
            });
        }

        unggahKaryaPelukis(formData)
            .then((res) => {
                notifications.show({
                    title: "Berhasil",
                    message:
                        "Terimakasih, karya anda akan dikurasi oleh kurator kami terlebih dahulu!",
                });
                router.push("/p/karya");
            })
            .catch((err) =>
                notifications.show({ title: "Gagal", message: err })
            )
            .finally(() => setIsLoading(false));
        // console.log({ data, imageBlob, imageURLPreview });
    };

    return (
        <>
            <div className="p-4 h-full md:h-[calc(100vh-100px)] w-full flex flex-col md:flex-row gap-3">
                <div className="md:flex-1 h-[600px] md:h-full overflow-hidden flex items-center justify-center flex-col gap-2 relative">
                    {imageURLPreview && (
                        <ImagePreview
                            aspect={imageAspectRatio}
                            imageURL={imageURLPreview}
                            openCropper={open}
                            className={imageURLPreview ? "block" : "hidden"}
                        />
                    )}
                    <DropzoneImage
                        ref={openRef}
                        setImage={(url) => {
                            setImageURL(url);
                            setImageURLPreview(url);
                        }}
                        setAspect={setImageAspectRatio}
                        setExt={setImageExt}
                        setFile={setImageBlob}
                        className={imageURLPreview ? "hidden" : "block"}
                    />
                    <Button
                        variant="outline"
                        onClick={() => openRef.current?.()}
                        data-cy="btn-upload-file"
                    >
                        Pilih File
                    </Button>
                </div>
                <div className="py-1 overflow-y-auto md:flex-1 h-full flex items-center justify-center flex-col gap-2 relative">
                    <Stack className="w-full max-w-[700px] md:h-full" gap="xs">
                        <div>
                            <Title order={2}>Informasi Karya</Title>
                            <Text size="sm">
                                Silahkan isi informasi merngenai karya yang akan
                                anda unggah
                            </Text>
                        </div>

                        <form onSubmit={form.onSubmit(handleUnggahKarya)}>
                            <Stack gap={{ base: "xs", md: "sm" }}>
                                <TextInput
                                    label={
                                        <Text
                                            fw="bold"
                                            className="text-sm"
                                            span
                                        >
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
                                        <Text
                                            fw="bold"
                                            className="text-sm"
                                            span
                                        >
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
                                        <Text
                                            fw="bold"
                                            className="text-sm"
                                            span
                                        >
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
                                        <Text
                                            fw="bold"
                                            className="text-sm"
                                            span
                                        >
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
                                        <Text
                                            fw="bold"
                                            className="text-sm"
                                            span
                                        >
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
                                            <Text
                                                fw="bold"
                                                className="text-sm"
                                                span
                                            >
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
                                            <Text
                                                fw="bold"
                                                className="text-sm"
                                                span
                                            >
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
                                <Button
                                    type="submit"
                                    className=" md:self-end"
                                    data-cy="btn-submit"
                                    loading={isLoading}
                                >
                                    Unggah
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </div>
            </div>
            <ModalCropperUnggah
                aspect={imageAspectRatio}
                setAspect={setImageAspectRatio}
                opened={opened}
                onClose={close}
                image={imageURL}
                setImage={setImageURLPreview}
                setBlob={setImageBlob}
            />
        </>
    );
}
