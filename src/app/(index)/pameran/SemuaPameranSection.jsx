import { Title } from "@mantine/core";
import CardPameran from "./CardPameran";

export default function SemuaPameranSection() {
    return (
        <div>
            <Title order={4}>Semua Pameran</Title>
            <div className="bg-gray-400 w-full h-[2px] my-5"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <CardPameran />
                <CardPameran />
                <CardPameran />
                <CardPameran />
            </div>
        </div>
    );
}
