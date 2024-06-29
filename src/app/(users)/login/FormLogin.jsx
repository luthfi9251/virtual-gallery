"use client";
import {
    TextInput,
    PasswordInput,
    Button,
    Stack,
    Text,
    Group,
} from "@mantine/core";
import {
    useForm,
    isNotEmpty,
    isEmail,
    isInRange,
    hasLength,
    matchesField,
} from "@mantine/form";
import CrossIcon from "@/components/icons/CrossIcon";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { notifications } from "@mantine/notifications";

export default function FormLogin({ loginHandler }) {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    let router = useRouter();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    let formLogin = useForm({
        name: "login-form",
        mode: "uncontrolled",
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: isEmail("Masukkan email yang valid!"),
        },
    });

    let handleSubmitLogin = async (data) => {
        setLoading(true);
        setError(null);
        loginHandler(data)
            .then((res) => {
                if (res?.success) {
                    notifications.show({
                        title: "Halo!",
                        message: `Selamat datang`,
                    });
                    // redirect
                    router.push("/");
                } else {
                    setError(res.message || "Terjadi kesalahan saat Login!");
                    // notifications.show({
                    //     color: "red",
                    //     title: "Gagal!",
                    //     message: res.message,
                    // });
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

                {error && (
                    <Group className="bg-red-100 rounded-md py-2 px-2 border-red-300 border-2">
                        <CrossIcon w={20} h={20} />
                        <Text size="xs" color="red" className=" cursor-default">
                            Email atau sandi Anda salah. Silakan coba lagi{" "}
                        </Text>
                    </Group>
                )}
                <Button
                    type="submit"
                    loading={loading}
                    color="myColor"
                    radius="md"
                    className="hover:bg-white hover:text-tanArtBlue-600 hover:border-tanArtBlue-600 transition-all"
                >
                    Masuk
                </Button>

                <Text size="sm" className="text-center">
                    Belum punya akun?{" "}
                    <span>
                        <Link
                            href={`${pathname}?${createQueryString(
                                "action",
                                "register"
                            )}`}
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
