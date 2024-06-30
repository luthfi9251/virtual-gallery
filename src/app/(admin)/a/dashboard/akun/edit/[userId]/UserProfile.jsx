"use client";
import {
    Grid,
    GridCol,
    Image,
    FileInput,
    Stack,
    Button,
    Center,
    rem,
} from "@mantine/core";
import NextImage from "next/image";
import { useState } from "react";
import CropperModal from "@/components/CropperModal";
import { useDisclosure } from "@mantine/hooks";
import myImageLoader from "@/loader/imageLoader";

export default function UserProfile({ idUser, imageProfile }) {
    const [imgUrl, setImgUrl] = useState(imageProfile || null);
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Grid gutter={{ base: 3, md: "md" }}>
                <GridCol span={12}>
                    <Grid>
                        <GridCol span={12}>
                            <Center>
                                <Stack justify="center" align="center">
                                    <Image
                                        loader={imgUrl ? myImageLoader : null}
                                        component={NextImage}
                                        width={300}
                                        height={300}
                                        mah={300}
                                        maw={300}
                                        mih={300}
                                        miw={300}
                                        src={
                                            imgUrl
                                                ? imgUrl
                                                : "/EMPTY_USER_PROFILE.png"
                                        }
                                        alt="My image"
                                        className=" border rounded-full p-1"
                                        priority
                                    />
                                    <Button
                                        maw={rem(120)}
                                        variant="outline"
                                        onClick={open}
                                    >
                                        Ubah Foto
                                    </Button>
                                </Stack>
                            </Center>
                        </GridCol>
                    </Grid>
                </GridCol>
            </Grid>
            <CropperModal
                idUser={idUser}
                open={open}
                opened={opened}
                close={close}
                setPreview={setImgUrl}
                type="PROFILE_PICTURE"
            />
        </>
    );
}
