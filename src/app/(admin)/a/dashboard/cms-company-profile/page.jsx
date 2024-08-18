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
import GallerySection from "./GallerySection";
import ActivitySection from "./ActivitySection";
import ContactSection from "./ContactSection";
import {
    getAboutLP,
    getActivityData,
    getContact,
    getGalleryData,
    getOwnerDesc,
} from "@/actions/admin";

export default async function Page() {
    let aboutText = getAboutLP();
    let galleryImage = getGalleryData();
    let activityData = getActivityData();
    let contactdata = getContact();
    let ownerAbout = getOwnerDesc();

    let promResult = await Promise.all([
        aboutText,
        galleryImage,
        activityData,
        contactdata,
        ownerAbout,
    ]);
    return (
        <Container fluid>
            <Title order={2}>CMS Landing Page</Title>
            <Space h="xl" />
            <Stack>
                <HeroSection />
                <AboutSection
                    text={promResult[0].data?.value || ""}
                    ownerData={promResult[4].data || {}}
                />
                <GallerySection data={promResult[1].data || {}} />
                <ActivitySection data={promResult[2].data || []} />
                <ContactSection data={promResult[3].data || {}} />
            </Stack>
        </Container>
    );
}
