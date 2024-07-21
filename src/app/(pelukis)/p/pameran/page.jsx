import Image from "next/image";
import { Container, Title, Stack } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import FilterAndSearchSection from "./FilterAndSearch";
import PameranSection from "./PameranSection";

export default async function Home() {
    return (
        <Container
            fluid
            px={{ base: 0, md: "lg" }}
            className="flex justify-center"
        >
            <Stack className="w-full max-w-[1600px] rounded md:p-3 md:shadow-lg gap-5">
                <Title className="text-xl text-center md:text-start">
                    Pameran Saya
                </Title>
                <FilterAndSearchSection />
                <PameranSection />
            </Stack>
        </Container>
    );
}
