import { testData, loginUser } from "../../_actions/register";
import {
    Container,
    SimpleGrid,
    BackgroundImage,
    Center,
    Title,
    Text,
    Stack,
} from "@mantine/core";
import FormLogin from "../../FormLogin";
import FormRegister from "../../FormRegister";
export default function Page() {
    return (
        <Container fluid className="h-screen" m={0} p={0}>
            <SimpleGrid cols={2} className="h-screen">
                <Container fluid p={0} m={0} className="relative">
                    <BackgroundImage
                        src="/bg-login.jpg"
                        className=" blur-sm"
                        w={"100%"}
                        h={"100%"}
                    ></BackgroundImage>
                    <Center className="absolute" w={"100%"} h={"100%"} top="0">
                        <Text
                            fw="bolder"
                            className=" text-[3rem]  p-24 text-white select-none"
                        >
                            Selamat Datang Di Tan Art Gallery
                        </Text>
                    </Center>
                </Container>
                <Container bg={"white"} w={"100%"}>
                    <Center h="100%">
                        <Stack gap={10}>
                            <Title order={1} fw={"bold"}>
                                Masuk
                            </Title>
                            <Text size="sm" fw="lighter">
                                Masukkan email anda di bawah ini untuk login ke
                                akun anda
                            </Text>
                            <FormLogin loginHandler={loginUser} />
                        </Stack>
                    </Center>
                </Container>
            </SimpleGrid>
            {/* <FormRegister registerHandler={testData} /> */}
        </Container>
    );
}
