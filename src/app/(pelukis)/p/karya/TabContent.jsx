"use client";
import { Tabs, TabsList, TabsPanel, TabsTab, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useMemo } from "react";
import CardKarya from "@/components/CardKarya";
import ModalDetailKarya from "./ModalDetail";
import { useMediaQuery } from "@mantine/hooks";

export default function TabContent({ data }) {
    const isMobile = useMediaQuery("(max-width: 48em)");
    const [activeTab, setActiveTab] = useState("all");
    const [activeData, setActiveData] = useState(null);
    const disclosure = useDisclosure(false);
    const [dataOriginal, setDataOriginal] = useState(data);

    const karyaFiltered = useMemo(() => {
        switch (activeTab) {
            case "pending":
                return dataOriginal.filter(
                    (item) => item.status === "DIKURASI"
                );
            case "terkurasi":
                return dataOriginal.filter(
                    (item) => item.status === "TERKURASI"
                );
            case "selesai":
                return dataOriginal.filter((item) => item.status === "SELESAI");
            case "terjual":
                return dataOriginal.filter((item) => item.status === "TERJUAL");

            default:
                return dataOriginal;
                break;
        }
    }, [activeTab]);

    const handleCardOnClick = (data) => {
        setActiveData(data);
        disclosure[1].open();
    };

    return (
        <>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <TabsList grow={isMobile}>
                    <TabsTab
                        value="all"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Semua
                    </TabsTab>
                    <TabsTab
                        value="pending"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Sedang Dikurasi
                    </TabsTab>
                    <TabsTab
                        value="terkurasi"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Menunggu Persetujuan
                    </TabsTab>
                    <TabsTab
                        value="selesai"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Selesai Dikurasi
                    </TabsTab>
                    <TabsTab
                        value="terjual"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Terjual
                    </TabsTab>
                </TabsList>

                <TabsPanel value="all" className="py-5">
                    <SimpleGrid
                        spacing={{ base: "xs", md: "md" }}
                        verticalSpacing={{ base: "xs", md: "md" }}
                        cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
                        px={0}
                    >
                        {karyaFiltered.map((item, i) => (
                            <CardKarya
                                key={i}
                                index={i}
                                data={item}
                                clickHandler={handleCardOnClick}
                            />
                        ))}
                    </SimpleGrid>
                </TabsPanel>
                <TabsPanel value="pending" className="py-5">
                    <SimpleGrid
                        spacing={{ base: "xs", md: "md" }}
                        verticalSpacing={{ base: "xs", md: "md" }}
                        cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
                        px={0}
                    >
                        {karyaFiltered.map((item, i) => (
                            <CardKarya
                                key={i}
                                data={item}
                                clickHandler={handleCardOnClick}
                            />
                        ))}
                    </SimpleGrid>
                </TabsPanel>
                <TabsPanel value="terkurasi" className="py-5">
                    <SimpleGrid
                        spacing={{ base: "xs", md: "md" }}
                        verticalSpacing={{ base: "xs", md: "md" }}
                        cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
                        px={0}
                    >
                        {karyaFiltered.map((item, i) => (
                            <CardKarya
                                key={i}
                                data={item}
                                clickHandler={handleCardOnClick}
                            />
                        ))}
                    </SimpleGrid>
                </TabsPanel>
                <TabsPanel value="selesai" className="py-5">
                    <SimpleGrid
                        spacing={{ base: "xs", md: "md" }}
                        verticalSpacing={{ base: "xs", md: "md" }}
                        cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
                        px={0}
                    >
                        {karyaFiltered.map((item, i) => (
                            <CardKarya
                                key={i}
                                data={item}
                                clickHandler={handleCardOnClick}
                            />
                        ))}
                    </SimpleGrid>
                </TabsPanel>
                <TabsPanel value="terjual" className="py-5">
                    <SimpleGrid
                        spacing={{ base: "xs", md: "md" }}
                        verticalSpacing={{ base: "xs", md: "md" }}
                        cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
                        px={0}
                    >
                        {karyaFiltered.map((item, i) => (
                            <CardKarya
                                key={i}
                                data={item}
                                clickHandler={handleCardOnClick}
                            />
                        ))}
                    </SimpleGrid>
                </TabsPanel>
            </Tabs>
            <ModalDetailKarya disclosure={disclosure} dataActive={activeData} />
        </>
    );
}
