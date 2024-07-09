"use client";
import {
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    SimpleGrid,
    Loader,
    Text,
    Group,
    TextInput,
    NumberInput,
    Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useMemo } from "react";
import CardKarya from "@/components/CardKarya";
import ModalDetailKarya from "./ModalDetail";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { LuPencil } from "react-icons/lu";

const Status = ({ count }) => {
    if (count < 1) {
        return (
            <Text className="absolute bg-yellow-500 ronded top-1 right-1 text-xs px-3 py-1 text-center font-semibold text-white cursor-default flex items-center justify-center gap-2 rounded">
                <LuPencil className=" inline-block" />
                <span>{count} / 3</span>
            </Text>
        );
    } else if (count < 3) {
        return (
            <Text className="absolute bg-blue-500 ronded top-1 right-1 text-xs px-3 py-1 text-center font-semibold text-white cursor-default flex items-center justify-center gap-2 rounded">
                <LuPencil className=" inline-block" />
                <span>{count} / 3</span>
            </Text>
        );
    } else {
        return (
            <Text className="absolute bg-green-600 ronded top-1 right-1 text-xs px-3 py-1 text-center font-semibold text-white cursor-default flex items-center justify-center gap-2 rounded">
                <LuPencil className=" inline-block" />
                <span>{count} / 3</span>
            </Text>
        );
    }
};

export default function TabContent({ data, mode }) {
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 48em)");
    const [activeData, setActiveData] = useState(null);
    const disclosure = useDisclosure(false);

    const handleCardOnClick = (data) => {
        setActiveData(data);
        disclosure[1].open();
    };

    const onChangeTabHandler = () => {
        router.push(
            `/k/kurasi-karya?tab=${
                mode === "kurasi" ? "sudah_kurasi" : "kurasi"
            }`
        );
    };

    return (
        <>
            <Tabs
                value={mode === "kurasi" ? "butuh_kurasi" : "sudah_kurasi"}
                onChange={onChangeTabHandler}
            >
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
                    {data.length < 1 ? (
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
                            {data.map((item, i) => (
                                <CardKarya
                                    key={i}
                                    index={i}
                                    data={item}
                                    count={item.kurasi_count}
                                    clickHandler={handleCardOnClick}
                                    statusSection={
                                        <Status count={item.kurasi_count} />
                                    }
                                />
                            ))}
                        </SimpleGrid>
                    )}
                </TabsPanel>
                <TabsPanel value="sudah_kurasi" className="py-5">
                    {data.length < 1 ? (
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
                            {data.map((item, i) => (
                                <CardKarya
                                    key={i}
                                    index={i}
                                    data={item}
                                    clickHandler={handleCardOnClick}
                                    statusSection={
                                        <Status count={item.kurasi_count} />
                                    }
                                />
                            ))}
                        </SimpleGrid>
                    )}
                </TabsPanel>
            </Tabs>
            <ModalDetailKarya
                disclosure={disclosure}
                dataActive={activeData}
                mode={mode === "kurasi" ? "kurasi" : "default"}
            />
        </>
    );
}
