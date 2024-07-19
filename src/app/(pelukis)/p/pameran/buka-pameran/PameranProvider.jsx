"use client";
import { createContext, useState } from "react";
import DUMMY from "./DUMMY";
import { useForm, isNotEmpty } from "@mantine/form";

export const PameranContext = createContext(null);

export default function PameranProvider({ children }) {
    const form = useForm({
        mode: "controlled",
        initialValues: {
            nama_pameran: "",
            deskripsi: "",
            tanggal: {
                mulai: null,
                selesai: null,
            },
        },
        validate: {
            nama_pameran: isNotEmpty("Tidak Boleh Kosong!"),
            deskripsi: isNotEmpty("Tidak Boleh Kosong!"),
        },
    });
    const [pameranData, setPameranData] = useState({
        form,
        dataKarya: DUMMY.data,
    });

    const [selectedKarya, setSelectedKarya] = useState([]);
    return (
        <PameranContext.Provider
            value={{
                pameranData,
                setPameranData,
                selectedKarya,
                setSelectedKarya,
            }}
        >
            {children}
        </PameranContext.Provider>
    );
}
