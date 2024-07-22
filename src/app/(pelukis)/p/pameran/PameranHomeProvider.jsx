"use client";
import { createContext, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export const PameranHomeContext = createContext(null);

export default function PameranHomeProvider({ children }) {
    const [searchVal, setSearchVal] = useDebouncedState("", 500);
    const [filter, setFilter] = useState("SEMUA");

    return (
        <PameranHomeContext.Provider
            value={{
                searchVal,
                setSearchVal,
                filter,
                setFilter,
            }}
        >
            {children}
        </PameranHomeContext.Provider>
    );
}
