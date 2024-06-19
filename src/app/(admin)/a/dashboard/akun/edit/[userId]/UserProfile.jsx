"use client";
import {
    Grid,
    GridCol,
    Image,
    FileInput,
    Fieldset,
    Button,
    Stack,
    rem,
} from "@mantine/core";
import NextImage from "next/image";
import { useState } from "react";

export default function UserProfile() {
    const [imgUrl, setImgUrl] = useState("/EMPTY_USER_PROFILE.jpg");
    return (
        <Grid gutter={{ base: 3, md: "md" }}>
            <GridCol span={{ base: 12, md: 10 }}>
                <Fieldset legend="Foto Profil">
                    <Grid>
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Image
                                component={NextImage}
                                width={200}
                                height={200}
                                mah={200}
                                maw={200}
                                src={imgUrl}
                                alt="My image"
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Stack>
                                <FileInput
                                    onChange={(file) => {
                                        if (file) {
                                            let URLIMG =
                                                URL.createObjectURL(file);
                                            setImgUrl(URLIMG);
                                        } else {
                                            setImgUrl(
                                                "/EMPTY_USER_PROFILE.jpg"
                                            );
                                        }
                                    }}
                                    label="Unggah Foto Profil"
                                    accept="image/png,image/jpeg"
                                    description="Input description"
                                    placeholder="Pilih Foto"
                                />
                                <Button maw={rem(120)} color="myColor.9">
                                    Simpan
                                </Button>
                            </Stack>
                        </GridCol>
                    </Grid>
                </Fieldset>
            </GridCol>
            <GridCol
                span={{ base: 12, md: 2 }}
                py={{ base: 1, md: 20 }}
            ></GridCol>
        </Grid>
    );
}
