"use client";
import { Group, TextInput, Button, rem } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";

export default function SearchSection() {
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
                actions={actions}
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
