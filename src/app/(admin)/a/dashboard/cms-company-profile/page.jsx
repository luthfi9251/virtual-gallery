import {
    Button,
    Container,
    SimpleGrid,
    Space,
    Stack,
    Title,
} from "@mantine/core";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import { getAboutLP } from "@/actions/admin";

export default async function Page() {
    let aboutText = await getAboutLP();
    return (
        <Container fluid>
            <Title order={2}>CMS Landing Page</Title>
            <Space h="xl" />
            <Stack>
                <HeroSection />
                <AboutSection text={aboutText.data?.value || ""} />
            </Stack>
        </Container>
    );
}
