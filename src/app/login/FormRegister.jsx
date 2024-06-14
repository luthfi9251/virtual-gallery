"use client";
import {
    Container,
    TextInput,
    Textarea,
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
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";

const WITH_DESCRIPTION = {
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
        username: hasLength({ min: 5, max: 20 }),
        nama_lengkap: isNotEmpty("Nama tidak boleh Kosong!"),
        email: isEmail("Masukkan Email Valid!"),
        tempat_lhr: hasLength(
            { min: 3, max: 100 },
            "Tempat Lahir minimal 3 huruf dan maksimal 100 huruf!"
        ),
        tgl_lhr: isNotEmpty("tidak boleh kosong!"),
        password: hasLength({ min: 3, max: 100 }, "Password minimal 6 huruf"),
        "confirm-password": matchesField(
            "password",
            "Tidak sama dengan password!"
        ),
        deskripsi: isNotEmpty("tidak boleh kosong!"),
    },
};
const WITHOUT_DESCRIPTION = {
    initialValues: {
        nama_lengkap: "",
        username: "",
        email: "",
        tempat_lhr: "",
        tgl_lhr: "",
        password: "",
        "confirm-password": "",
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
        password: hasLength({ min: 3, max: 100 }, "Password minimal 6 huruf"),
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
    let formRegister = useForm({
        name: "register-form",
        mode: "uncontrolled",
        initialValues: useDeskripsi
            ? WITH_DESCRIPTION.initialValues
            : WITHOUT_DESCRIPTION.initialValues,
        validate: useDeskripsi
            ? WITH_DESCRIPTION.validate
            : WITHOUT_DESCRIPTION.validate,
    });

    let handleRegister = async (data) => {
        setLoading(true);
        registerHandler(data)
            .then((res) => {
                if (res.success) {
                    notifications.show({
                        title: "Berhasil Registrasi!",
                        message: `Silahkan Login keakun anda, ${res.data.nama_lengkap}`,
                    });
                    // redirect
                } else {
                    notifications.show({
                        color: "red",
                        title: "Gagal Registrasi!",
                        message: res.message,
                    });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form action="" onSubmit={formRegister.onSubmit(handleRegister)}>
            <TextInput
                label="Nama Lengkap"
                name="nama_lengkap"
                key={formRegister.key("nama_lengkap")}
                {...formRegister.getInputProps("nama_lengkap")}
            />
            <TextInput
                label="Email"
                name="email"
                key={formRegister.key("email")}
                {...formRegister.getInputProps("email")}
            />
            <TextInput
                label="Username"
                name="username"
                key={formRegister.key("username")}
                {...formRegister.getInputProps("username")}
            />
            <TextInput
                label="Tempat Lahir"
                name="tempat_lhr"
                key={formRegister.key("tempat_lhr")}
                {...formRegister.getInputProps("tempat_lhr")}
            />
            <DateInput
                label="Tanggal Lahir"
                placeholder="Tanggal Lahir"
                valueFormat="DD MMMM YYYY"
                maxDate={new Date()}
                name="tgl_lhr"
                key={formRegister.key("tgl_lhr")}
                {...formRegister.getInputProps("tgl_lhr")}
            />
            <PasswordInput
                label="Password"
                name="password"
                key={formRegister.key("password")}
                {...formRegister.getInputProps("password")}
            />
            <PasswordInput
                label="Confirm Password"
                name="confirm-password"
                key={formRegister.key("confirm-password")}
                {...formRegister.getInputProps("confirm-password")}
            />
            {useDeskripsi && (
                <Textarea
                    label="Apa pengalaman anda sebagai Pelukis?"
                    name="deskripsi"
                    key={formRegister.key("deskripsi")}
                    {...formRegister.getInputProps("deskripsi")}
                />
            )}

            <Button type="submit" loading={loading}>
                Submit
            </Button>
        </form>
    );
}
