import {
    Container,
    Space,
} from "@mantine/core";
import { getAllKaryaCurrentPelukis } from "@/actions/pelukis";
import TabContent from "./TabContent";
import SearchSection from "./SearchSection";
import KaryaProvider from "./KaryaProvider";

export default async function Home() {
    let data = await getAllKaryaCurrentPelukis();

    return (
        <KaryaProvider data={data}>
            <Container fluid px={{ base: 0, md: "lg" }}>
                <SearchSection />
                <Space h="lg" />
                <TabContent data={data} />
            </Container>
        </KaryaProvider>
    );
}
