"use client";
import {
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    SimpleGrid,
    Loader,
    Text,
    Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useMemo } from "react";
import CardKarya from "@/components/CardKarya";
import ModalDetailKarya from "./ModalDetail";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { getAllKaryaNotYetCurratedByCurrentUser } from "@/actions/karya";

export default function TabContent({ data }) {
    const isMobile = useMediaQuery("(max-width: 48em)");
    const [activeTab, setActiveTab] = useState("butuh_kurasi");
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

    const handleGetData = async (mode) => {
        console.log(mode);
        if (activeTab === "butuh_kurasi") {
            return await getAllKaryaNotYetCurratedByCurrentUser();
        } else {
            return [];
        }
    };

    const karyaUncurated = useQuery({
        queryKey: ["kurator", activeTab],
        queryFn: handleGetData,
        staleTime: 0,
        initialData: [],
    });
    return (
        <>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <TabsList grow={isMobile}>
                    <TabsTab
                        value="butuh_kurasi"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Butuh Kurasi
                    </TabsTab>
                    <TabsTab
                        value="sudah_kurasi"
                        className="hover:bg-tanArtBlue-600 hover:text-white"
                    >
                        Selesai Kurasi
                    </TabsTab>
                </TabsList>

                <TabsPanel value="butuh_kurasi" className="py-5 h-full">
                    {karyaUncurated.isFetching ? (
                        <Center className="">
                            <Loader />
                        </Center>
                    ) : karyaUncurated.data.length < 1 ? (
                        <Text className="text-center text-xs">
                            Tidak ada Data
                        </Text>
                    ) : (
                        <SimpleGrid
                            spacing={{ base: "xs", md: "md" }}
                            verticalSpacing={{ base: "xs", md: "md" }}
                            cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
                            px={0}
                        >
                            {karyaUncurated.isFetched &&
                                karyaUncurated.data.map((item, i) => (
                                    <CardKarya
                                        key={i}
                                        index={i}
                                        data={item}
                                        clickHandler={handleCardOnClick}
                                    />
                                ))}
                        </SimpleGrid>
                    )}
                </TabsPanel>
                <TabsPanel value="sudah_kurasi" className="py-5">
                    {karyaUncurated.isFetching ? (
                        <Center className="">
                            <Loader />
                        </Center>
                    ) : karyaUncurated.data.length < 1 ? (
                        <Text className="text-center text-xs">
                            Tidak ada Data
                        </Text>
                    ) : (
                        <SimpleGrid
                            spacing={{ base: "xs", md: "md" }}
                            verticalSpacing={{ base: "xs", md: "md" }}
                            cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
                            px={0}
                        >
                            {karyaUncurated.isFetched &&
                                karyaUncurated.data.map((item, i) => (
                                    <CardKarya
                                        key={i}
                                        index={i}
                                        data={item}
                                        clickHandler={handleCardOnClick}
                                    />
                                ))}
                        </SimpleGrid>
                    )}
                </TabsPanel>
            </Tabs>
            <ModalDetailKarya
                disclosure={disclosure}
                dataActive={activeData}
                mode={activeTab === "butuh_kurasi" ? "kurasi" : "default"}
            />
        </>
    );
}
