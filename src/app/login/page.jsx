import { testData, loginUser } from "./_actions/register";
import {
    Container,
    ScrollArea,
    BackgroundImage,
    Center,
    Title,
    Text,
    Stack,
    Flex,
    Image,
    ScrollAreaAutosize,
} from "@mantine/core";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import NextImage from "next/image";

export default function Page(props) {
    let { action } = props.searchParams;
    let isRegisterAction = action === "register";
    return (
        <Container fluid className="md:h-screen" p={0}>
            <Flex
                direction={{ base: "column", sm: "row" }}
                h={{ md: "100%" }}
                className="gap-10 md:gap-0 md:h-full"
            >
                <BackgroundImage
                    src={
                        isRegisterAction ? "/bg-register.jpg" : "/bg-login.jpg"
                    }
                    w={{ md: "50%" }}
                    h={{ base: "auto", md: "100%" }}
                    className="rounded-b-xl md:rounded-bl-none md:rounded-r-[50px] overflow-hidden md:w-1/2"
                >
                    <Container fluid m={0} className="relative h-full w-full">
                        <Center className="relative md:absolute inset-0 z-10 p-1 py-10 md:p-4 text-white">
                            <Stack
                                className="w-full md:w-5/6"
                                gap={{ base: "xs", md: "xl" }}
                            >
                                <Text className="relative md:absolute top-0 md:top-10 xl:top-12 flex items-center gap-3 cursor-default">
                                    <span>
                                        <NextImage
                                            src="/tanart-logo.png"
                                            // component={NextImage}
                                            alt="Logo Tanart"
                                            width={50}
                                            height={50}
                                        />
                                    </span>
                                    Tanart Space
                                </Text>
                                <Title
                                    order={1}
                                    className="text-white cursor-default text-4xl lg:text-6xl 2xl:text-8xl"
                                    lh={1}
                                >
                                    {isRegisterAction
                                        ? "Daftar untuk Memulai"
                                        : "Selamat Datang!"}
                                </Title>
                                <Text className="cursor-default text-sm md:text-md">
                                    {isRegisterAction
                                        ? "Selamat datang di galeri seni kami! Dengan mendaftar, Anda akan mendapatkan akses eksklusif ke koleksi karya seni menakjubkan, pameran virtual, dan berbagai acara seni yang menginspirasi. Jadilah bagian dari komunitas yang mencintai seni dan temukan keindahan yang tak terbatas."
                                        : "Kami senang melihat Anda kembali! Masuklah ke akun Anda untuk mengakses koleksi seni eksklusif, pameran virtual, dan fitur-fiturmenarik lainnya. Jika Anda baru di sini,daftar sekarang untuk mulai menjelajahi dunia seni kami."}
                                </Text>
                            </Stack>
                        </Center>
                        <div className="bg-black opacity-50 absolute inset-0"></div>
                    </Container>
                </BackgroundImage>
                <Container className="md:w-1/2 p-6 flex justify-center">
                    <Center h="100%" className="md:w-2/3">
                        <Stack gap={10}>
                            <Title
                                order={1}
                                fw={"bold"}
                                className="text-2xl md:text-3xl xl:text-4xl"
                            >
                                {isRegisterAction ? "Daftar" : "Masuk"}
                            </Title>
                            <Text size="sm" fw="lighter">
                                {isRegisterAction
                                    ? "Masukkan data diri anda di bawah ini "
                                    : "Masukkan email anda di bawah ini untuk login ke akun anda"}
                            </Text>
                            <ScrollAreaAutosize
                                mah={{ base: "100%", md: 500, lg: "100%" }}
                            >
                                {isRegisterAction ? (
                                    <FormRegister registerHandler={testData} />
                                ) : (
                                    <FormLogin loginHandler={loginUser} />
                                )}
                            </ScrollAreaAutosize>
                        </Stack>
                    </Center>
                </Container>
            </Flex>
        </Container>
    );
}
