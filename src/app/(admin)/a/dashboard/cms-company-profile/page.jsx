import {
    Button,
    Container,
    SimpleGrid,
    Space,
    Stack,
    Title,
} from "@mantine/core";
import HeroSection from "./HeroSection";

export default function Page() {
    return (
        <Container fluid>
            <Title order={2}>CMS Landing Page</Title>
            <Space h="xl" />
            <Stack>
                <HeroSection />
                {/* <SimpleGrid cols={2} className="self-center">
                    <Button className="w-full" variant="outline">
                        Batal
                    </Button>
                    <Button className="w-full" type="submit">
                        Simpan
                    </Button>
                </SimpleGrid> */}
            </Stack>
        </Container>
    );
}
