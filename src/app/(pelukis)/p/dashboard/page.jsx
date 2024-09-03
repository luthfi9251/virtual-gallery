import Image from "next/image";
import { Button, SimpleGrid, Space, Stack, Title } from "@mantine/core";
import KaryaSummary from "./KaryaSummary";
import PameranSummary from "./PameranSummary";
import FAQ from "./FAQ";

export default function Home(props) {
    return (
        <div className="max-w-[1100px] mx-auto">
            <div>
                <Title order={2}>Selamat Datang, Luthfi</Title>
                <Space h="xl" />
                <Stack>
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                        <KaryaSummary />
                        <PameranSummary />
                    </SimpleGrid>
                    <FAQ />
                </Stack>
            </div>
        </div>
    );
}
