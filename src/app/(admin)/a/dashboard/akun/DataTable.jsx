"use client";
import {
    ActionIcon,
    Stack,
    ScrollAreaAutosize,
    Group,
    Button,
    Fieldset,
    Title,
    Drawer,
    Checkbox,
    CheckboxGroup,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FormRegisterUser from "@/components/FormRegisterUser";
import { useMemo, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuItemRow from "./Menu";
import {
    MRT_Table,
    useMantineReactTable,
    MRT_TablePagination,
    MRT_GlobalFilterTextInput,
} from "mantine-react-table";
import {
    useForm,
    isNotEmpty,
    isEmail,
    isInRange,
    hasLength,
    matchesField,
} from "@mantine/form";

export default function DataTableComponent({ records }) {
    const [opened, { open, close }] = useDisclosure(false);
    let columnTable = useMemo(
        () => [
            {
                accessorKey: "index",
                header: "No.",
                size: 20,
                Cell: ({ renderedCellValue, row }) => row.index + 1,
            },
            {
                accessorKey: "nama_lengkap",
                header: "Nama Lengkap",
                size: 120,
            },
            {
                accessorKey: "email",
                header: "Email",
                size: 60,
            },
            {
                accessorKey: "username",
                header: "Username",
                size: 60,
            },
            {
                accessorKey: "action",
                header: "Action",
                size: 20,
                mantineTableHeadCellProps: {
                    align: "center",
                },
                mantineTableBodyCellProps: {
                    align: "center",
                },
                Cell: ({ row }) => {
                    return (
                        <MenuItemRow data={row.original}>
                            <ActionIcon
                                component="button"
                                size="md"
                                color="black"
                                variant="transparent"
                            >
                                <BsThreeDotsVertical size={15} />
                            </ActionIcon>
                        </MenuItemRow>
                    );
                },
            },
        ],
        []
    );
    const table = useMantineReactTable({
        columns: columnTable,
        data: records, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: true,
        paginationDisplayMode: "pages",
        positionPagination: "bottom",
        initialState: {
            showGlobalFilter: true,
        },
        mantineSearchTextInputProps: {
            placeholder: "Cari",
        },
        mantinePaginationProps: {
            showRowsPerPage: false,
        },
    });

    let formRegister = useForm({
        name: "register-form",
        mode: "uncontrolled",
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
            password: hasLength(
                { min: 3, max: 100 },
                "Password minimal 6 huruf"
            ),
            "confirm-password": matchesField(
                "password",
                "Tidak sama dengan password!"
            ),
        },
    });

    let handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <Stack
                p="sm"
                className=" shadow-lg rounded-sm border-[1px] overflow-hidden"
            >
                <Group justify="space-between">
                    <MRT_GlobalFilterTextInput table={table} />
                    <Button color="myColor.8" onClick={open}>
                        Tambah User
                    </Button>
                </Group>
                <ScrollAreaAutosize>
                    <MRT_Table table={table} />
                </ScrollAreaAutosize>
                <MRT_TablePagination table={table} />
            </Stack>
            <Drawer
                opened={opened}
                onClose={close}
                title={<Title order={3}>Tambah User</Title>}
                position="right"
                closeOnClickOutside={false}
            >
                <Fieldset legend="Data Akun">
                    <FormRegisterUser
                        form={formRegister}
                        submitHandler={handleSubmit}
                    />
                </Fieldset>
                <Fieldset legend="Akses Akun" my={10}>
                    <Checkbox.Group
                        defaultValue={["react"]}
                        label="Pilih akses akun"
                        description="Jika tidak ada, bisa dikosongkan"
                    >
                        <Group mt="xs">
                            <Checkbox value="PELUKIS" label="Pelukis" />
                            <Checkbox value="KURATOR" label="Kurator" />
                        </Group>
                    </Checkbox.Group>
                </Fieldset>
                <Button>Simpan</Button>
            </Drawer>
        </>
    );
}
