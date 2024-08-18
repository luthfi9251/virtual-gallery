import { Container, Space, Stack, Title } from "@mantine/core";
import CaraPembayaran from "./CaraPembayaranSection";

export default async function Page() {
    return (
        <Container fluid>
            <Title order={2}>CMS</Title>
            <Space h="xl" />
            <Stack>
                <CaraPembayaran />
            </Stack>
        </Container>
    );
}
