"use client";
import {
    Menu,
    MenuDropdown,
    Modal,
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
    Text,
    Group,
    Button,
} from "@mantine/core";
import { startTransition, useState } from "react";
import { deleteUser } from "@/actions/user";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { URL_TANART } from "@/variables/url";

export default function MenuItemRow(props) {
    const [opened, { open, close }] = useDisclosure(false);
    const [modalOpened, modalHandler] = useDisclosure(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const data = props.data;

    const deleteHandler = async () => {
        setLoadingDelete(true);
        deleteUser(data?.id)
            .then((res) => {
                notifications.show({
                    title: "Berhasil Hapus!",
                    message: `Berhasil mengapus akun`,
                });
                modalHandler.close();
            })
            .catch((err) => {
                notifications.show({
                    color: "red",
                    title: "Gagal Menghapus User!",
                    message: err.message,
                });
            })
            .finally(() => setLoadingDelete(false));
    };

    return (
        <>
            <Menu shadow="md" width={200}>
                <MenuTarget>{props.children}</MenuTarget>
                <MenuDropdown>
                    <MenuLabel>Menu</MenuLabel>
                    <MenuItem onClick={open}>Detail</MenuItem>
                    <MenuItem
                        component={Link}
                        href={URL_TANART.ADMIN_DASHBOARD_AKUN_EDIT(data.id)}
                    >
                        Edit
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem color="red" onClick={modalHandler.open}>
                        Hapus Akun
                    </MenuItem>
                </MenuDropdown>
            </Menu>
            <Modal
                opened={modalOpened}
                onClose={modalHandler.close}
                centered
                title={
                    <Title as order={4}>
                        Peringatan
                    </Title>
                }
            >
                <Stack>
                    <Text size="sm">
                        Apakah anda yakin untuk menghapus akun {data?.email}?
                    </Text>
                    <Group justify="flex-end" gap="xs">
                        <Button
                            onClick={modalHandler.close}
                            color="red"
                            variant="outline"
                        >
                            Batal
                        </Button>
                        <Button
                            color="red"
                            loading={loadingDelete}
                            onClick={deleteHandler}
                        >
                            Hapus
                        </Button>
                    </Group>
                </Stack>
            </Modal>
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
