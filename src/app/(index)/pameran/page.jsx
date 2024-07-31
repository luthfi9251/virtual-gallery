import SearchSection from "./SearchSection";
import MostViewedSection from "./MostViewedSection";
import SemuaPameranSection from "./SemuaPameranSection";
import { Title, Stack } from "@mantine/core";

export default function Page() {
    return (
        <div className=" w-full flex justify-center">
            <div className="w-full max-w-[1300px] flex flex-col p-1 md:p-2">
                <SearchSection />
                <Title className=" text-tanArtBlue-600 font-extrabold text-4xl text-center my-5 md:my-2">
                    EXHIBITIONS
                </Title>
                <Stack gap="xl">
                    <MostViewedSection />
                    <SemuaPameranSection />
                </Stack>
            </div>
        </div>
    );
}
