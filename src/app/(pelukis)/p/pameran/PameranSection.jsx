import { SimpleGrid } from "@mantine/core";

import CardPameran from "./CardPameran";

export default function PameranSection() {
    return (
        <SimpleGrid className="w-full" cols={{ base: 1, md: 2, lg: 3 }}>
            <CardPameran />
            <CardPameran />
            <CardPameran />
            <CardPameran />
            <CardPameran />
            <CardPameran />
            <CardPameran />
            <CardPameran />
        </SimpleGrid>
    );
}
