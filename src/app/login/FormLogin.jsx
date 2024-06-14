"use client";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import {
    useForm,
    isNotEmpty,
    isEmail,
    isInRange,
    hasLength,
    matchesField,
} from "@mantine/form";
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
            <TextInput
                label="Email"
                name="email"
                key={formLogin.key("email")}
                {...formLogin.getInputProps("email")}
            />
            <PasswordInput
                label="Password"
                name="password"
                key={formLogin.key("password")}
                {...formLogin.getInputProps("password")}
            />
            <Button type="submit" loading={loading}>
                Submit
            </Button>
        </form>
    );
}
