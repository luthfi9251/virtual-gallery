import {
    Container,
    Space,
    Stack,
    Title,
    TextInput,
    SimpleGrid,
    NumberInput,
    Textarea,
    FileInput,
    Group,
    Button,
} from "@mantine/core";
import PelukisKuratorSection from "./PelukisKuratorSection";
import FormProvider from "./FormProvider";
import { getCMSVirtualGalleryData } from "@/actions/admin";

export default async function Page() {
    let data = await getCMSVirtualGalleryData();
    return (
        <FormProvider data={data}>
            <Container fluid>
                <Title order={2}>CMS Virtual Gallery</Title>
                <Space h="xl" />
                <Stack>
                    <PelukisKuratorSection />
                    <SimpleGrid cols={2} className="self-center">
                        <Button className="w-full" variant="outline">
                            Batal
                        </Button>
                        <Button className="w-full" type="submit">
                            Simpan
                        </Button>
                    </SimpleGrid>
                </Stack>
            </Container>
        </FormProvider>
    );
}
