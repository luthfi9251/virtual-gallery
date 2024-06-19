"use client";
import {
    Grid,
    GridCol,
    Fieldset,
    TextInput,
    SimpleGrid,
    Button,
    Stack,
    rem,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import NextImage from "next/image";
import { useState } from "react";

export default function UserDataForm({ data }) {
    const [imgUrl, setImgUrl] = useState("/EMPTY_USER_PROFILE.jpg");
    return (
        <Grid gutter={{ base: 3, md: "md" }}>
            <GridCol span={{ base: 12, md: 10 }}>
                <Fieldset legend="Akun Utama">
                    <form>
                        <Stack gap="md">
                            <TextInput label="Nama Lengkap" />
                            <TextInput label="Email" />
                            <TextInput label="Username" />
                            <SimpleGrid cols={2}>
                                <DateInput label="Tanggal Lahir" />
                                <TextInput label="Tempat Lahir" />
                            </SimpleGrid>
                            <div></div>
                            <Button
                                maw={rem(120)}
                                type="submit"
                                color="myColor.9"
                            >
                                Simpan
                            </Button>
                        </Stack>
                    </form>
                </Fieldset>
            </GridCol>
            <GridCol span={{ base: 12, md: 2 }} py={{ base: 1, md: 20 }}>
                <Stack>
                    <Button color="gray">Reset Password</Button>
                    <Button color="red">Hapus Akun</Button>
                </Stack>
            </GridCol>
        </Grid>
    );
}
