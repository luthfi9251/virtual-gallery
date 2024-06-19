"use client";
import {
    Menu,
    MenuDropdown,
    MenuItem,
    MenuLabel,
    MenuTarget,
    MenuDivider,
    Drawer,
    Fieldset,
    Stack,
    Textarea,
    SimpleGrid,
    TextInput,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import Link from "next/link";

export default function MenuItemRow(props) {
    const [opened, { open, close }] = useDisclosure(false);
    const data = props.data;
    return (
        <>
            <Menu shadow="md" width={200}>
                <MenuTarget>{props.children}</MenuTarget>
                <MenuDropdown>
                    <MenuLabel>Menu</MenuLabel>
                    <MenuItem onClick={open}>Detail</MenuItem>
                    <MenuItem
                        component={Link}
                        href={`/a/dashboard/akun/edit/${data.id}`}
                    >
                        Edit
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>Hapus Akun</MenuItem>
                </MenuDropdown>
            </Menu>
            <Drawer
                position="right"
                opened={opened}
                onClose={close}
                title={<Title order={3}>Informasi Akun</Title>}
            >
                <Stack>
                    <Fieldset legend="Akun Utama">
                        <TextInput
                            label="Nama Lengkap"
                            value={data?.nama_lengkap}
                            disabled
                        />
                        <TextInput label="Email" value={data?.email} disabled />
                        <TextInput
                            label="Username"
                            value={data?.username}
                            disabled
                        />
                        <SimpleGrid cols={2}>
                            <DateInput
                                label="Tanggal Lahir"
                                value={data?.created_at}
                                disabled
                            />
                            <TextInput
                                label="Tempat Lahir"
                                value={data?.tempat_lhr}
                                disabled
                            />
                        </SimpleGrid>
                    </Fieldset>
                    {data?.Seniman && (
                        <Fieldset legend="Akun Pelukis">
                            <DateInput
                                value={data?.Seniman?.verified_at}
                                label="Verifikasi pada"
                                disabled
                            />
                            <Textarea
                                label="Pengalaman menjadi pelukis"
                                name="deskripsi"
                                rows={4}
                                disabled
                                value={data?.Seniman?.deskripsi}
                            />
                        </Fieldset>
                    )}
                    {data?.Kurator && (
                        <Fieldset legend="Akun Kurator">
                            <DateInput
                                value={data?.Seniman?.verified_at}
                                label="Verifikasi pada"
                                disabled
                            />
                            <Textarea
                                label="Pengalaman menjadi kurator"
                                name="deskripsi"
                                rows={4}
                                disabled
                                value={data?.Kurator?.deskripsi}
                            />
                        </Fieldset>
                    )}
                </Stack>
            </Drawer>
        </>
    );
}
