import Image from "next/image";
import {
    Button,
    Container,
    Grid,
    GridCol,
    TextInput,
    NativeSelect,
    SimpleGrid,
    Group,
    Space,
} from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import CardKarya from "@/components/CardKarya";
import Link from "next/link";
import { getAllKaryaCurrentPelukis } from "@/actions/pelukis";
import TabContent from "./TabContent";

export default async function Home() {
    let data = await getAllKaryaCurrentPelukis();

    return (
        <Container fluid px={{ base: 0, md: "lg" }}>
            <Group grow preventGrowOverflow={false} className="my-4 md:my-7">
                <TextInput placeholder="Cari" leftSection={<CiSearch />} />
                <Button
                    data-cy="btn-unggah"
                    className="max-w-28 justify-self-end"
                    component={Link}
                    href="/p/karya/unggah"
                >
                    Tambah
                </Button>
            </Group>
            <Space h="lg" />
            <TabContent data={data} />
        </Container>
    );
}
