import { SimpleGrid, Space, Stack, Title } from "@mantine/core";
import UserSummary from "./UserSummary";
import KaryaSummary from "./KaryaSummary";
import PameranSummary from "./PameranSummary";

export default async function Page(props) {
    return (
        <div className="">
            <div className="p-2 md:p-0">
                <Title order={2}>Selamat Datang</Title>
                <Space h="xl" />
                <Stack>
                    <UserSummary />
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                        <KaryaSummary />
                        <PameranSummary />
                    </SimpleGrid>
                    {/* <FAQ /> */}
                </Stack>
            </div>
        </div>
    );
}
