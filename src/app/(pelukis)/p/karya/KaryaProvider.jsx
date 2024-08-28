"use client";
import { createContext, useMemo, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export const KaryaContext = createContext(null);

export default function KaryaProvider({ children, data }) {
    const [searchVal, setSearchVal] = useDebouncedState("", 500);
    const [dataOriginal, setDataOriginal] = useState(data);
    const dataKarya = useMemo(() => {
        if (searchVal !== "") {
            return dataOriginal.filter((item) =>
                item.judul.toLowerCase().includes(searchVal)
            );
        } else {
            return dataOriginal;
        }
    }, [searchVal, dataOriginal]);

    return (
        <KaryaContext.Provider
            value={{
                dataOriginal,
                setDataOriginal,
                searchVal,
                setSearchVal,
                data: dataKarya,
            }}
        >
            {children}
        </KaryaContext.Provider>
    );
}
