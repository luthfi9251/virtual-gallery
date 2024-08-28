"use client";
import {
    Grid,
    GridCol,
    Fieldset,
    TextInput,
    Modal,
    Button,
    Stack,
    Group,
    Select,
    Title,
    Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
    useForm,
    isNotEmpty,
    isEmail,
    isInRange,
    hasLength,
    matchesField,
} from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { updateUser } from "@/actions/user";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { URL_TANART } from "@/variables/url";
import { deleteUser } from "@/actions/user";
import { modals } from "@mantine/modals";
import { resetPasswordAdmin } from "@/actions/admin";

export default function UserDataForm({ data }) {
    const [modalDeleteOpened, modalDeleteHandler] = useDisclosure(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingReset, setLoadingReset] = useState(false);
    const router = useRouter();

    let resetPasswordForm = useForm({
        name: "resete-password",
        mode: "uncontrolled",
        initialValues: {
            password: "",
            "confirm-password": "",
        },
        validate: {
            password: hasLength(
                { min: 6, max: 100 },
                "Password minimal 6 huruf"
            ),
            "confirm-password": matchesField(
                "password",
                "Tidak sama dengan password!"
            ),
        },
    });

    const resetPasswordHandler = async (dataForm) => {
        setLoadingReset(true);
        resetPasswordAdmin(data?.id, dataForm.password)
            .then((res) => {
                if (res.isError) throw res.error;

                notifications.show({
                    title: "Berhasil Reset!",
                    message: `Berhasil reset password akun`,
                });
                modalDeleteHandler.close();
            })
            .catch((err) => {
                notifications.show({
                    color: "red",
                    title: "Gagal Reset Password!",
                    message: err.message,
                });
            })
            .finally(() => {
                setLoadingReset(false);
                resetPasswordForm.reset();
                modals.closeAll();
            });
    };

    const modalResetPassword = () =>
        modals.open({
            title: "Reset Password",
            centered: true,
            children: (
                <Stack
                    component="form"
                    onSubmit={resetPasswordForm.onSubmit(resetPasswordHandler)}
                >
                    <TextInput
                        label="Kata Sandi Baru"
                        data-autofocus
                        key={resetPasswordForm.key("password")}
                        withAsterisk
                        {...resetPasswordForm.getInputProps("password")}
                    />
                    <TextInput
                        label="Ulang Kata Sandi"
                        key={resetPasswordForm.key("confirm-password")}
                        withAsterisk
                        {...resetPasswordForm.getInputProps("confirm-password")}
                    />
                    <Button
                        loading={loadingReset}
                        fullWidth
                        type="submit"
                        mt="md"
                    >
                        Simpan
                    </Button>
                </Stack>
            ),
        });

    let form = useForm({
        name: "register-form",
        mode: "uncontrolled",
        initialValues: {
            nama_lengkap: data.nama_lengkap,
            username: data.username,
            email: data.email,
            tempat_lhr: data.tempat_lhr,
            tgl_lhr: new Date(data.tgl_lhr),
            role: data.role,
        },
        validate: {
            username: hasLength({ min: 5, max: 20 }),
            nama_lengkap: isNotEmpty("Nama tidak boleh Kosong!"),
            email: isEmail("Masukkan Email Valid!"),
            tempat_lhr: hasLength(
                { min: 3, max: 100 },
                "Tempat Lahir minimal 3 huruf dan maksimal 100 huruf!"
            ),
            tgl_lhr: isNotEmpty("tidak boleh kosong!"),
        },
    });

    let handleClick = (dataForm) => {
        updateUser({ ...dataForm, id: data.id })
            .then((res) => {
                notifications.show({
                    title: "Berhasi!",
                    message: res,
                });
            })
            .catch((err) => {
                notifications.show({
                    color: "red",
                    title: "Gagal menyimpan!",
                    message: err.message,
                });
            });
    };

    const deleteHandler = async () => {
        setLoadingDelete(true);
        deleteUser(data?.id)
            .then((res) => {
                router.push(URL_TANART.ADMIN_DASHBOARD_AKUN);
                notifications.show({
                    title: "Berhasil Hapus!",
                    message: `Berhasil mengapus akun`,
                });
                modalDeleteHandler.close();
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
            <Grid gutter={{ base: 3, md: "md" }}>
                <GridCol span={{ base: 12, md: 10 }}>
                    <Fieldset legend="Akun Utama" className="shadow">
                        <form onSubmit={form.onSubmit(handleClick)}>
                            <Stack>
                                <TextInput
                                    label="Nama Lengkap"
                                    name="nama_lengkap"
                                    key={form.key("nama_lengkap")}
                                    withAsterisk
                                    {...form.getInputProps("nama_lengkap")}
                                />
                                <TextInput
                                    label="Email"
                                    name="email"
                                    key={form.key("email")}
                                    withAsterisk
                                    {...form.getInputProps("email")}
                                />
                                <TextInput
                                    label="Username"
                                    name="username"
                                    key={form.key("username")}
                                    withAsterisk
                                    {...form.getInputProps("username")}
                                />
                                <Group grow>
                                    <TextInput
                                        label="Tempat Lahir"
                                        name="tempat_lhr"
                                        key={form.key("tempat_lhr")}
                                        withAsterisk
                                        {...form.getInputProps("tempat_lhr")}
                                    />
                                    <DateInput
                                        label="Tanggal Lahir"
                                        placeholder="Tanggal Lahir"
                                        valueFormat="DD MMMM YYYY"
                                        maxDate={new Date()}
                                        name="tgl_lhr"
                                        key={form.key("tgl_lhr")}
                                        withAsterisk
                                        {...form.getInputProps("tgl_lhr")}
                                    />
                                </Group>
                                <Select
                                    label="Role"
                                    placeholder="Pilih Role"
                                    withAsterisk
                                    key={form.key("role")}
                                    {...form.getInputProps("role")}
                                    data={[
                                        { value: "USER", label: "User" },
                                        { value: "ADMIN", label: "Admin" },
                                    ]}
                                />
                                <Button maw="25%" type="submit">
                                    Simpan
                                </Button>
                            </Stack>
                        </form>
                    </Fieldset>
                </GridCol>
                <GridCol span={{ base: 12, md: 2 }} py={{ base: 1, md: 20 }}>
                    <Stack>
                        <Button color="gray" onClick={modalResetPassword}>
                            Reset Password
                        </Button>
                        <Button color="red" onClick={modalDeleteHandler.open}>
                            Hapus Akun
                        </Button>
                    </Stack>
                </GridCol>
            </Grid>
            <Modal
                opened={modalDeleteOpened}
                onClose={modalDeleteHandler.close}
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
                            onClick={modalDeleteHandler.close}
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
        </>
    );
}
