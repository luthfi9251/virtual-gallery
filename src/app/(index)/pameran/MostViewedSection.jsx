import { Title, SimpleGrid } from "@mantine/core";
import CardPameran from "./CardPameran";

export default function MostViewedSection() {
    return (
        <div>
            <Title order={4}>Banyak Dilihat</Title>
            <div className="bg-gray-400 w-full h-[2px] my-5"></div>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <CardPameran isMostViewed />
                <CardPameran isMostViewed />
            </SimpleGrid>
        </div>
    );
}
