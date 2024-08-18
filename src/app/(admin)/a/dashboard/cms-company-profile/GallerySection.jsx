"use client";
import { addAndUpdateGallery } from "@/actions/admin";
import ImageModalSelection from "@/components/ImageModalSelection";
import { landingPageFeaturedLoader } from "@/loader/imageLoader";
import { Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useState } from "react";

// 1. 860x880
//2 dan 3 560x420

export default function GallerySection({ data }) {
    const imageOneDisclosure = useDisclosure(false);
    const imageTwoDisclosure = useDisclosure(false);
    const imageThreeDisclosure = useDisclosure(false);

    const [imageSrcList, setImageSrcList] = useState({
        imageOne: data?.IMAGEONE,
        imageTwo: data?.IMAGETWO,
        imageThree: data?.IMAGETHREE,
    });

    const handleUpdateStateBlob = (tag, value) => {
        let formData = new FormData();
        formData.append("image", value);

        const id = notifications.show({
            color: "gray",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            title: "Loading",
            message: "Menyimpan data",
        });

        addAndUpdateGallery(tag, formData)
            .then((res) => {
                if (res.isError) throw new Error(res.error);
                notifications.update({
                    id,
                    title: "Berhasil",
                    message: "Berhasil mengubah Gallery!",
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

    const handleUpdateStateImage = (tag, canvas) => {
        let temp = imageSrcList;
        temp[tag] = canvas.toDataURL();
        setImageSrcList(temp);
    };

    return (
        <div className=" p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black">
                Gallery
            </Title>
            <div className="w-full max-w-[1500px] grid md:grid-cols-5 md:grid-rows-2 p-1 px-5 md:p-5 gap-5 md:gap-10 ">
                <div className="group relative w-full h-full md:row-span-2 md:col-span-3 aspect-square">
                    <div className=" backdrop-blur-sm group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                        <Button onClick={imageOneDisclosure[1].open}>
                            Ubah Gambar
                        </Button>
                    </div>
                    <Image
                        fill
                        src={imageSrcList.imageOne || "/default/3.png"}
                        loader={
                            imageSrcList.imageOne && landingPageFeaturedLoader
                        }
                        className="object-cover"
                    />
                    <ImageModalSelection
                        opened={imageOneDisclosure[0]}
                        close={imageOneDisclosure[1].close}
                        stencilProps={{
                            aspectRatio: 1 / 1,
                        }}
                        handleOnCrop={(canvas) => {
                            handleUpdateStateImage("imageOne", canvas);
                            canvas.toBlob((blob) => {
                                if (blob) {
                                    handleUpdateStateBlob("imageOne", blob);
                                }
                            });
                        }}
                    />
                </div>
                <div className="group relative w-full aspect-square md:aspect-auto md:col-span-2">
                    <div className=" backdrop-blur-sm group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                        <Button onClick={imageTwoDisclosure[1].open}>
                            Ubah Gambar
                        </Button>
                    </div>
                    <Image
                        fill
                        src={imageSrcList.imageTwo || "/default/3.png"}
                        loader={
                            imageSrcList.imageTwo && landingPageFeaturedLoader
                        }
                        className="object-cover"
                    />
                    <ImageModalSelection
                        opened={imageTwoDisclosure[0]}
                        close={imageTwoDisclosure[1].close}
                        stencilProps={{
                            aspectRatio: 4 / 3,
                        }}
                        handleOnCrop={(canvas) => {
                            handleUpdateStateImage("imageTwo", canvas);
                            canvas.toBlob((blob) => {
                                if (blob) {
                                    handleUpdateStateBlob("imageTwo", blob);
                                }
                            });
                        }}
                    />
                </div>
                <div className=" group relative w-full aspect-square md:aspect-auto md:col-span-2">
                    <div className=" backdrop-blur-sm group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                        <Button onClick={imageThreeDisclosure[1].open}>
                            Ubah Gambar
                        </Button>
                    </div>
                    <Image
                        fill
                        src={imageSrcList.imageThree || "/default/3.png"}
                        loader={
                            imageSrcList.imageThree && landingPageFeaturedLoader
                        }
                        className="object-cover"
                    />
                    <ImageModalSelection
                        opened={imageThreeDisclosure[0]}
                        close={imageThreeDisclosure[1].close}
                        stencilProps={{
                            aspectRatio: 4 / 3,
                        }}
                        handleOnCrop={(canvas) => {
                            handleUpdateStateImage("imageThree", canvas);
                            canvas.toBlob((blob) => {
                                if (blob) {
                                    handleUpdateStateBlob("imageThree", blob);
                                }
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
