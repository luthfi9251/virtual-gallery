"use client";
import { Button, Group, TextInput } from "@mantine/core";
import Link from "next/link";
import { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { KaryaContext } from "./KaryaProvider";

export default function SearchSection() {
    let { setSearchVal } = useContext(KaryaContext);
    return (
        <Group grow preventGrowOverflow={false} className="my-4 md:my-7">
            <TextInput
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Cari"
                leftSection={<CiSearch />}
            />
            <Button
                data-cy="btn-unggah"
                className="max-w-28 justify-self-end"
                component={Link}
                href="/p/karya/unggah"
            >
                Tambah
            </Button>
        </Group>
    );
}
