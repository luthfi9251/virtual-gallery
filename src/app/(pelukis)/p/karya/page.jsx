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

export default function Home() {
    const select = (
        <NativeSelect
            defaultValue="Filter"
            data={["Dalam Kurasi", "Terkurasi", "Terverifikasi", "Terjual"]}
            rightSectionWidth={28}
            styles={{
                input: {
                    fontWeight: 400,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    width: "auto",
                },
            }}
        />
    );
    return (
        <Container fluid px={{ base: 0, md: "lg" }}>
            <Group grow preventGrowOverflow={false}>
                <TextInput placeholder="Cari" leftSection={<CiSearch />} />
                <Button
                    className="max-w-28"
                    component={Link}
                    href="/p/karya/unggah"
                >
                    Tambah
                </Button>
            </Group>
            {/* <Grid columns={6} className="md:py-8" grow>
                <GridCol span={{ base: 6, md: 5 }} className="px-0">
                    <TextInput
                        className="w-full"
                        placeholder="Cari"
                        leftSection={<CiSearch />}
                    />
                </GridCol>
                <GridCol
                    span={{ base: 2, md: 1 }}
                    className="flex px-0 w-full justify-end md:justify-center"
                >
                    <Button>Tambah</Button>
                </GridCol>
            </Grid> */}
            <Space h="lg" />
            <SimpleGrid
                spacing={{ base: "xs", md: "md" }}
                verticalSpacing={{ base: "xs", md: "md" }}
                cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
                px={0}
            >
                {Array(12)
                    .fill(0)
                    .map((_, i) => (
                        <CardKarya key={i} />
                    ))}
            </SimpleGrid>
        </Container>
    );
}
