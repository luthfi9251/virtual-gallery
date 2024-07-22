"use client";
import { SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import CardPameran from "./CardPameran";
import { PameranHomeContext } from "./PameranHomeProvider";
import { useContext } from "react";
import { getPameranBaseOnFilter } from "@/actions/pameran";
import LoadingWrapper from "@/components/LoadingWrapper";
import "dayjs/locale/id";

export default function PameranSection() {
    let { searchVal, setSearchVal, filter, setFilter } =
        useContext(PameranHomeContext);

    let { isLoading, data } = useQuery({
        queryKey: ["pameran", filter],
        queryFn: async () => await getPameranBaseOnFilter(filter),
        staleTime: 1000 * 15,
    });

    return (
        <LoadingWrapper isLoading={isLoading}>
            <SimpleGrid className="w-full" cols={{ base: 1, md: 2, lg: 3 }}>
                {data?.data?.map((item, i) => (
                    <CardPameran key={i} data={item} />
                ))}
            </SimpleGrid>
        </LoadingWrapper>
    );
}
