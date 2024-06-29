"use client";
import {
    Text,
    TextInput,
    Stack,
    PasswordInput,
    Group,
    Button,
} from "@mantine/core";
import {
    useForm,
    isNotEmpty,
    isEmail,
    isInRange,
    hasLength,
    matchesField,
} from "@mantine/form";
import { useState, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";
import Link from "next/link";
import CrossIcon from "@/components/icons/CrossIcon";
import { usePathname, useSearchParams } from "next/navigation";
import { addUser } from "@/actions/user";

const WITHOUT_DESCRIPTION = {
    initialValues: {
        nama_lengkap: "",
        username: "",
        email: "",
        tempat_lhr: "",
        tgl_lhr: "",
        password: "",
        "confirm-password": "",
        deskripsi: "",
    },
    validate: {
        username: hasLength({ min: 5, max: 20 }, "Minimal 5 Karakter!"),
        nama_lengkap: isNotEmpty("Nama tidak boleh Kosong!"),
        email: isEmail("Masukkan Email Valid!"),
        tempat_lhr: isNotEmpty("Tidak boleh kosong!"),
        tgl_lhr: isNotEmpty("Tidak boleh kosong!"),
        password: hasLength({ min: 6, max: 100 }, "Password minimal 6 huruf"),
        "confirm-password": matchesField(
            "password",
            "Tidak sama dengan password!"
        ),
    },
};

export default function FormRegister({
    registerHandler,
    useDeskripsi = false,
}) {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    let form = useForm({
        name: "register-form",
        mode: "uncontrolled",
        initialValues: WITHOUT_DESCRIPTION.initialValues,
        validate: WITHOUT_DESCRIPTION.validate,
    });

    let handleRegister = async (data) => {
        setError(null);
        setLoading(true);
        addUser(data)
            .then((res) => {
                notifications.show({
                    title: "Berhasil Registrasi!",
                    message: `Silahkan Login ke akun anda!`,
                });
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form action="" onSubmit={form.onSubmit(handleRegister)}>
            <Stack gap="xs">
                <TextInput
                    label={
                        <Text fw="bold" size="xs" span>
                            Nama Lengkap
                        </Text>
                    }
                    name="nama_lengkap"
                    placeholder="Masukkan Nama lengkap"
                    key={form.key("nama_lengkap")}
                    withAsterisk
                    {...form.getInputProps("nama_lengkap")}
                />
                <TextInput
                    label={
                        <Text fw="bold" size="xs" span>
                            Email
                        </Text>
                    }
                    name="email"
                    placeholder="Masukkan Email"
                    key={form.key("email")}
                    withAsterisk
                    {...form.getInputProps("email")}
                />
                <TextInput
                    label={
                        <Text fw="bold" size="xs" span>
                            Username
                        </Text>
                    }
                    name="username"
                    placeholder="Masukkan Username"
                    key={form.key("username")}
                    withAsterisk
                    {...form.getInputProps("username")}
                />
                <Group grow align="flex-start">
                    <TextInput
                        label={
                            <Text fw="bold" size="xs" span>
                                Tempat Lahir
                            </Text>
                        }
                        name="tempat_lhr"
                        placeholder="Masukkan Tempat Lahir"
                        key={form.key("tempat_lhr")}
                        withAsterisk
                        {...form.getInputProps("tempat_lhr")}
                    />
                    <DateInput
                        label={
                            <Text fw="bold" size="xs" span>
                                Tanggal lahir
                            </Text>
                        }
                        placeholder="Masukkan Tanggal Lahir"
                        valueFormat="DD MMMM YYYY"
                        maxDate={new Date()}
                        name="tgl_lhr"
                        key={form.key("tgl_lhr")}
                        withAsterisk
                        {...form.getInputProps("tgl_lhr")}
                    />
                </Group>
                <PasswordInput
                    label={
                        <Text fw="bold" size="xs" span>
                            Kata Sandi
                        </Text>
                    }
                    placeholder="Masukkan Kata Sandi"
                    name="password"
                    key={form.key("password")}
                    withAsterisk
                    {...form.getInputProps("password")}
                />
                <PasswordInput
                    label={
                        <Text fw="bold" size="xs" span>
                            Konfirmasi Kata Sandi
                        </Text>
                    }
                    placeholder="Ulangi Kata Sandi"
                    name="confirm-password"
                    key={form.key("confirm-password")}
                    withAsterisk
                    {...form.getInputProps("confirm-password")}
                />
                {error && (
                    <Group className=" bg-error-50 rounded-md py-2 px-2 border-error-100 border-2">
                        <CrossIcon w={20} h={20} />
                        <Text
                            size="xs"
                            className=" cursor-default text-error-200"
                        >
                            Kesalahan : {error}
                        </Text>
                    </Group>
                )}

                <Button type="submit" loading={loading}>
                    Daftar
                </Button>
                <Text size="sm" className="text-center">
                    Sudah punya akun?{" "}
                    <span>
                        <Link
                            href={`${pathname}?${createQueryString(
                                "action",
                                "login"
                            )}`}
                            className=" text-tanArtBlue-600 font-bold"
                        >
                            Masuk
                        </Link>
                    </span>
                </Text>
            </Stack>
        </form>
    );
}
