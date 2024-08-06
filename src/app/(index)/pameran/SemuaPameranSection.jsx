import { Title } from "@mantine/core";
import CardPameran from "./CardPameran";
import { getPameranOpen } from "@/actions/pameran";

export default async function SemuaPameranSection() {
    let dataPameran = await getPameranOpen();
    return (
        <div>
            <Title order={4}>Semua Pameran</Title>
            <div className="bg-gray-400 w-full h-[2px] my-5"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {!dataPameran.isError
                    ? dataPameran.data.map((item, i) => (
                          <CardPameran dataPameran={item} key={i} />
                      ))
                    : "Terjadi Kesalahan"}
            </div>
        </div>
    );
}
