"use client";
import {
    Button,
    TextInput,
    Chip,
    ChipGroup,
    Stack,
    Group,
    Space,
} from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { URL_TANART } from "@/variables/url";

export default function FilterAndSearchSection() {
    return (
        <>
            <Group grow preventGrowOverflow={false} className="my-4 md:my-7">
                <TextInput placeholder="Cari" leftSection={<CiSearch />} />
                <Button
                    data-cy="btn-buka-pameran"
                    className="max-w-28 justify-self-end"
                    component={Link}
                    href={URL_TANART.PELUKIS_BUKA_PAMERAN}
                >
                    Tambah
                </Button>
            </Group>
            <ChipGroup defaultValue="SEMUA">
                <Group>
                    <Chip value="SEMUA">Semua</Chip>
                    <Chip value="OPEN">Terbuka</Chip>
                    <Chip value="CLOSE">Selesai</Chip>
                </Group>
            </ChipGroup>
        </>
    );
}
