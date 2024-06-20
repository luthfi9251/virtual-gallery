import {
    TextInput,
    PasswordInput,
    Button,
    Group,
    Stack,
    Select,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export default function FormRegisterUser({
    form,
    submitHandler,
    loading = false,
}) {
    return (
        <form action="" onSubmit={form.onSubmit(submitHandler)}>
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
                <PasswordInput
                    label="Password"
                    name="password"
                    key={form.key("password")}
                    withAsterisk
                    {...form.getInputProps("password")}
                />
                <PasswordInput
                    label="Confirm Password"
                    name="confirm-password"
                    key={form.key("confirm-password")}
                    withAsterisk
                    {...form.getInputProps("confirm-password")}
                />
                <Select
                    label="Role"
                    placeholder="Pilih Role"
                    withAsterisk
                    defaultValue="USER"
                    data={[
                        { value: "USER", label: "User" },
                        { value: "ADMIN", label: "Admin" },
                    ]}
                />
            </Stack>
        </form>
    );
}
