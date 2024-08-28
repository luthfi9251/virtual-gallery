"use client";
import { useQuery } from "@tanstack/react-query";
import { Group, TextInput, Button, rem } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import { getPameranOpen } from "@/actions/pameran";
import { useRouter } from "next/navigation";
import { URL_TANART } from "@/variables/url";

async function getPameranSearch(router) {
    let response = await getPameranOpen();
    console.log({ response });

    return response.data.map((item) => {
        return {
            id: item.slug,
            label: item.nama_pameran,
            description: item.nama_pameran + " - " + item.nama_lengkap,
            onClick: () => router.push(URL_TANART.PAMERAN_VIEW(item.slug)),
        };
    });
}

export default function SearchSection() {
    let router = useRouter();
    let querySearch = useQuery({
        queryKey: ["search", "pameran"],
        queryFn: async () => await getPameranSearch(router),
        staleTime: 1000 * 60 * 60,
        placeholderData: [],
    });

    const actions = [
        {
            id: "home",
            label: "Home",
            description: "Get to home page",
            onClick: () => console.log("Home"),
        },
        {
            id: "dashboard",
            label: "Dashboard",
            description: "Get full information about current system status",
            onClick: () => console.log("Dashboard"),
        },
        {
            id: "documentation",
            label: "Documentation",
            description: "Visit documentation to lean more about all features",
            onClick: () => console.log("Documentation"),
        },
    ];
    return (
        <div className="w-full">
            <Group grow preventGrowOverflow={false} className="my-4 md:my-7">
                <Button
                    justify="flex-start"
                    variant="outline"
                    color="gray"
                    className="text-gray-600 font-light"
                    placeholder="Cari"
                    leftSection={<CiSearch />}
                    onClick={spotlight.open}
                >
                    Cari
                </Button>
            </Group>
            <Spotlight
                actions={querySearch.data}
                nothingFound="Nothing found..."
                highlightQuery
                searchProps={{
                    leftSection: (
                        <CiSearch
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={1.5}
                        />
                    ),
                    placeholder: "Search...",
                }}
            />
        </div>
    );
}
