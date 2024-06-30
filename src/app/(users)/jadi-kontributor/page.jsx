import { Container, BackgroundImage, Center } from "@mantine/core";
import Content from "./Content";
import { Suspense } from "react";

export default function Page() {
    return (
        <Container fluid p={0} m={0} className="md:h-screen">
            <BackgroundImage
                src="/bg-register.jpg"
                className="relative min-h-screen md:h-screen py-2 md:p-0 flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                <Center className="relative md:absolute z-20 inset-0">
                    <Suspense>
                        <Content />
                    </Suspense>
                </Center>
            </BackgroundImage>
        </Container>
    );
}
