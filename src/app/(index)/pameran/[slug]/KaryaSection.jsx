import CardKaryaWrapper from "./CardKarya";
import { Title } from "@mantine/core";
import Image from "next/image";

export default function KaryaSection({ listKarya, idPameran }) {
    return (
        <div className="mt-5">
            <Title order={4}>Karya</Title>
            <div className="bg-gray-400 w-full h-[2px] my-5"></div>
            <CardKaryaWrapper karya={listKarya} idPameran={idPameran} />
        </div>
    );
}
