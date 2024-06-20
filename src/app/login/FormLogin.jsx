"use client";
import { TextInput, PasswordInput, Button, Stack, Text } from "@mantine/core";
import {
    useForm,
    isNotEmpty,
    isEmail,
    isInRange,
    hasLength,
    matchesField,
} from "@mantine/form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
export default function FormLogin({ loginHandler }) {
    let [loading, setLoading] = useState(false);
    let router = useRouter();
    let formLogin = useForm({
        name: "login-form",
        mode: "uncontrolled",
        initialValues: {
            email: "",
            password: "",
        },
    });

    let handleSubmitLogin = async (data) => {
        setLoading(true);
        loginHandler(data)
            .then((res) => {
                if (res?.success) {
                    notifications.show({
                        title: "Halo!",
                        message: `Selamat datang`,
                    });
                    // redirect
                    router.push(res.data.redirect_to);
                } else {
                    notifications.show({
                        color: "red",
                        title: "Gagal!",
                        message: res.message,
                    });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form onSubmit={formLogin.onSubmit(handleSubmitLogin)}>
            <Stack gap="lg">
                <TextInput
                    radius="md"
                    label={
                        <Text fw="bold" size="xs">
                            Email
                        </Text>
                    }
                    name="email"
                    placeholder="Masukkan Email"
                    key={formLogin.key("email")}
                    {...formLogin.getInputProps("email")}
                />
                <PasswordInput
                    radius="md"
                    label={
                        <Text fw="bold" size="xs">
                            Kata Sandi
                        </Text>
                    }
                    name="password"
                    placeholder="Masukkan Kata Sandi"
                    key={formLogin.key("password")}
                    {...formLogin.getInputProps("password")}
                />
                <Link href="#">
                    <Text size="xs" className="text-end underline">
                        Lupa password ?
                    </Text>
                </Link>
                <Button
                    type="submit"
                    loading={loading}
                    color="myColor"
                    radius="md"
                    className="hover:bg-white hover:text-tanArtBlue-600 hover:border-tanArtBlue-600 transition-all"
                >
                    Submit
                </Button>
                <Text size="sm" className="text-center">
                    Belum punya akun?{" "}
                    <span>
                        <Link
                            href="#"
                            className=" text-tanArtBlue-600 font-bold"
                        >
                            Daftar
                        </Link>
                    </span>
                </Text>
            </Stack>
        </form>
    );
}
