"use client";
import { useContext, useMemo, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { PameranContext } from "./PameranProvider";
import {
    TextInput,
    Text,
    ActionIcon,
    SimpleGrid,
    CheckboxGroup,
    rem,
    Pagination,
} from "@mantine/core";
import { IoSearchSharp } from "react-icons/io5";
import CardKarya from "@/components/CardKarya";
import CardKaryaCheckBox from "./CardKaryaCheckBox";
import PameranProvider from "./PameranProvider";
const MAX_ITEM_PER_PAGE = 8;

export default function KaryaSection() {
    const { pameranData, setPameranData, selectedKarya, setSelectedKarya } =
        useContext(PameranContext);
    const totalSelected = useMemo(() => selectedKarya.length, [selectedKarya]);
    const [searchVal, setSearchVal] = useDebouncedState("", 200);
    const filteredKarya = useMemo(
        () =>
            pameranData.dataKarya.filter((item) =>
                item.judul.toLowerCase().includes(searchVal.toLowerCase())
            ),
        [searchVal]
    );
    const [activePage, setActivePage] = useState(1);
    const totalPage = useMemo(() => {
        return filteredKarya.length / MAX_ITEM_PER_PAGE + 1;
    }, [filteredKarya.length]);

    const showedKaryaPerPage = useMemo(() => {
        let beginIndex = MAX_ITEM_PER_PAGE * (activePage - 1);
        let endIndex = MAX_ITEM_PER_PAGE * activePage;

        return filteredKarya.slice(
            beginIndex,
            endIndex > filteredKarya.length
                ? filteredKarya.length + 1
                : endIndex
        );
    }, [activePage, filteredKarya]);

    return (
        <div className="flex flex-col">
            <TextInput
                onChange={(event) => setSearchVal(event.currentTarget.value)}
                radius="xl"
                placeholder="Cari Karya"
                className="w-full md:w-1/2 self-center"
                rightSectionWidth={42}
                leftSection={
                    <IoSearchSharp
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                    />
                }
            />
            <Text className="text-center text-sm mt-5">
                Karya dipilih : {totalSelected}
            </Text>
            <CheckboxGroup
                value={selectedKarya}
                onChange={setSelectedKarya}
                className="w-full py-5"
            >
                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                    {showedKaryaPerPage.map((item, i) => {
                        return <CardKaryaCheckBox data={item} key={i} />;
                    })}
                </SimpleGrid>
            </CheckboxGroup>
            <Pagination
                total={totalPage}
                className="self-center"
                value={activePage}
                onChange={setActivePage}
            />
        </div>
    );
}
