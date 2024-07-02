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

function ImagePreview({ aspect, imageURL, openCropper }) {
    if (aspect === "1/1") {
        return (
            <div className="flex items-center relative">
                <Image
                    src={imageURL}
                    width={700}
                    height={700}
                    alt="preview"
                    className=" aspect-[1/1] object-cover rounded"
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
            <div className="flex items-center relative">
                <Image
                    src={imageURL}
                    width={600}
                    height={600}
                    alt="preview"
                    className="aspect-[4/5] object-cover  rounded"
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
            <div className="flex items-center relative">
                <Image
                    src={imageURL}
                    width={800}
                    height={800}
                    alt="preview"
                    className="aspect-[3/2] object-cover rounded"
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
            keterangan: "",
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
            keterangan: hasLength(
                { min: 5, max: 500 },
                "Minimal 5 Karakter dan Maksimal 500 Karakter!"
            ),
            panjang: isNotEmpty("Tidak boleh kosong!"),
            lebar: isNotEmpty("Tidak boleh kosong!"),
        },
    });

    let handleUnggahKarya = (data) => {
        setIsLoading(true);
        let formData = new FormData();

        formData.append("judul", data.judul);
        formData.append("deskripsi", data.deskripsi);
        formData.append("keterangan", data.keterangan);
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
            <SimpleGrid
                cols={{ base: 1, sm: 2 }}
                className="min-h-[calc(100vh-100px)]"
            >
                <div className="h-full flex items-center justify-center flex-col gap-2 relative">
                    {imageURLPreview ? (
                        <ImagePreview
                            aspect={imageAspectRatio}
                            imageURL={imageURLPreview}
                            openCropper={open}
                        />
                    ) : (
                        <DropzoneImage
                            ref={openRef}
                            setImage={(url) => {
                                setImageURL(url);
                                setImageURLPreview(url);
                            }}
                            setAspect={setImageAspectRatio}
                            setExt={setImageExt}
                            setFile={setImageBlob}
                        />
                    )}
                    <Button
                        variant="outline"
                        onClick={() => openRef.current?.()}
                    >
                        Pilih File
                    </Button>
                </div>
                <div className="h-full flex items-center justify-center flex-col gap-2 relative">
                    <Stack className="w-full max-w-[700px] p-2">
                        <Title order={2}>Informasi Karya</Title>
                        <Text size="sm">
                            Silahkan isi informasi merngenai karya yang akan
                            anda unggah
                        </Text>

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
                                    rows={4}
                                    withAsterisk
                                    {...form.getInputProps("deskripsi")}
                                />
                                <Textarea
                                    label={
                                        <Text
                                            fw="bold"
                                            className="text-sm"
                                            span
                                        >
                                            Keterangan
                                        </Text>
                                    }
                                    description="Berikan keterangan mengenai aspek teknis lukisan seperti ukuran, bahan, dan cat yang digunakan"
                                    rows={4}
                                    withAsterisk
                                    {...form.getInputProps("keterangan")}
                                />
                                <SimpleGrid cols={2} className="w-full">
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
                                        decimalScale={2}
                                        {...form.getInputProps("lebar")}
                                    />
                                </SimpleGrid>
                                <Button
                                    type="submit"
                                    className=" self-end"
                                    loading={isLoading}
                                >
                                    Unggah
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </div>
            </SimpleGrid>
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
