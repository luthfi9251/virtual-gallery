import { Title, SimpleGrid } from "@mantine/core";
import CardPameran from "./CardPameran";
import { getMostViewedPameranOpen } from "@/actions/pameran";

export default async function MostViewedSection() {
    let dataPameran = await getMostViewedPameranOpen();
    return (
        <div>
            <Title order={4}>Banyak Dilihat</Title>
            <div className="bg-gray-400 w-full h-[2px] my-5"></div>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                {!dataPameran.isError
                    ? dataPameran.data
                          .slice(0, 2)
                          .map((item, i) => (
                              <CardPameran
                                  dataPameran={item}
                                  key={i}
                                  isMostViewed
                              />
                          ))
                    : "Terjadi Kesalahan"}
            </SimpleGrid>
        </div>
    );
}
