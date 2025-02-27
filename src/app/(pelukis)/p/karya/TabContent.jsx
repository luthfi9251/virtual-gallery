"use client";
import {
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    SimpleGrid,
    Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useMemo, useContext } from "react";
import CardKarya from "@/components/CardKarya";
import ModalDetailKarya from "./ModalDetail";
import { useMediaQuery } from "@mantine/hooks";
import { KaryaContext } from "./KaryaProvider";

export default function TabContent() {
    let { data, setDataOriginal, dataOriginal } = useContext(KaryaContext);
    const isMobile = useMediaQuery("(max-width: 48em)");
    const [activeTab, setActiveTab] = useState("all");
    const [activeData, setActiveData] = useState(null);
    const disclosure = useDisclosure(false);

    const karyaFiltered = useMemo(() => {
        switch (activeTab) {
            case "pending":
                return data.filter((item) => item.status === "DIKURASI");
            case "terkurasi":
                return data.filter((item) => item.status === "TERKURASI");
            case "selesai":
                return data.filter((item) => item.status === "SELESAI");
            case "terjual":
                return data.filter((item) => item.status === "TERJUAL");
            default:
                return data;
                break;
        }
    }, [activeTab, dataOriginal, data]);

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
                        data-cy="tab-all"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Semua
                    </TabsTab>
                    <TabsTab
                        value="pending"
                        data-cy="tab-pending"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Menunggu Kurasi
                    </TabsTab>
                    <TabsTab
                        value="terkurasi"
                        data-cy="tab-terkurasi"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Sudah Kurasi
                    </TabsTab>
                    <TabsTab
                        value="selesai"
                        data-cy="tab-selesai"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Siap Pamer
                    </TabsTab>
                    <TabsTab
                        value="terjual"
                        data-cy="tab-terjual"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Terjual
                    </TabsTab>
                </TabsList>

                <TabsPanel value="all" className="py-5">
                    {karyaFiltered.length < 1 && (
                        <Text className="w-full text-center text-xs">
                            Tidak ada karya
                        </Text>
                    )}
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
                    {karyaFiltered.length < 1 && (
                        <Text className="w-full text-center text-xs">
                            Tidak ada karya
                        </Text>
                    )}
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
                    {karyaFiltered.length < 1 && (
                        <Text className="w-full text-center text-xs">
                            Tidak ada karya
                        </Text>
                    )}
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
                    {karyaFiltered.length < 1 && (
                        <Text className="w-full text-center text-xs">
                            Tidak ada karya
                        </Text>
                    )}
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
                    {karyaFiltered.length < 1 && (
                        <Text className="w-full text-center text-xs">
                            Tidak ada karya
                        </Text>
                    )}
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
            <ModalDetailKarya
                disclosure={disclosure}
                dataActive={activeData}
                setOriginalData={setDataOriginal}
            />
        </>
    );
}
