"use client";

import {
    TextInput,
    Title,
    Flex,
    Stepper,
    StepperStep,
    Text,
    Button,
    Space,
    Stack,
    PasswordInput,
    Group,
    Textarea,
    Loader,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useMemo, useState } from "react";
import NextImage from "next/image";
import Step1Icon from "@/components/icons/Step1Icon";
import Step3Icon from "@/components/icons/Step3Icon";
import TickCircle from "@/components/icons/TickCircle";
import { useDebouncedCallback } from "@mantine/hooks";
import { isEmailUsed } from "@/actions/user";
import {
    useForm,
    isNotEmpty,
    isEmail,
    isInRange,
    hasLength,
    matchesField,
} from "@mantine/form";
import { useSearchParams } from "next/navigation";

const TYPE = {
    KURATOR: "kurator",
    PELUKIS: "pelukis",
};

function StepFirst({ handleNextStep, handleUpdateData, mode }) {
    let [allowNextStep, setAllowNextStep] = useState(false);
    let [email, setEmail] = useState(null);
    let [isLoading, setIsLoading] = useState(false);
    let [isEmailUsedState, setIsEmailUsedState] = useState(false);
    const handleSearch = useDebouncedCallback(async (query) => {
        if (query) {
            let res = await isEmailUsed(query);
            setIsLoading(false);
            setEmail(query);
            setIsEmailUsedState(res);
            setAllowNextStep(true);
        } else {
            setIsLoading(false);
        }
    }, 1000);

    const handleNextClick = () => {
        if (isEmailUsedState) {
            handleUpdateData((state) => {
                return {
                    ...state,
                    isCreateNewUser: false,
                    user: {
                        email,
                    },
                };
            });
            handleNextStep(2);
        } else {
            handleUpdateData((state) => {
                return {
                    ...state,
                    isCreateNewUser: true,
                    user: {
                        email,
                    },
                };
            });
            handleNextStep(1);
        }
    };
    return (
        <Flex
            direction={{ base: "column-reverse", sm: "row" }}
            className="h-full"
        >
            <div className=" flex-1 md:p-8 p-4 flex flex-col gap-3 justify-center">
                <Title
                    order={1}
                    fw={"bold"}
                    className="text-2xl md:text-3xl xl:text-4xl"
                >
                    {mode === TYPE.KURATOR ? "Kurator" : "Pelukis"}
                </Title>
                <Text size="sm" className="text-tanArt-grey">
                    Masukkan email Anda untuk melakukan pengajuan akun{" "}
                    {mode === TYPE.KURATOR ? "Kurator" : "Pelukis"}
                </Text>
                <TextInput
                    label={
                        <Text fw="bold" size="xs" span>
                            Email
                        </Text>
                    }
                    name="email"
                    onChange={(e) => {
                        setIsLoading(true);
                        setAllowNextStep(false);
                        setIsEmailUsedState(false);
                        handleSearch(e.currentTarget.value);
                    }}
                    rightSection={
                        isLoading && <Loader color="gray" size="xs" />
                    }
                    placeholder="Masukkan Email"
                    withAsterisk
                />
                {isEmailUsedState && (
                    <Flex
                        align="flex-start"
                        gap="sm"
                        className=" bg-success-50 rounded-md py-2 px-2 border-success-100 border-2"
                    >
                        <TickCircle w={20} h={20} />
                        <Text
                            size="xs"
                            className=" cursor-default text-success-200"
                        >
                            Email Anda sudah terdaftar, silahkan melanjutkan ke
                            tahap akhir
                        </Text>
                    </Flex>
                )}
                <Space h="md" />
                <Button
                    className=" self-end"
                    disabled={!allowNextStep}
                    onClick={handleNextClick}
                >
                    Selanjutnya
                </Button>
            </div>
            <div className=" flex-1 md:p-8 p-4 flex flex-col gap-2 md:gap-5 justify-center">
                <Title
                    order={2}
                    className=" text-tanArtBlue-600 text-end font-bold"
                >
                    Bergabunglah dengan Komunitas Pelukis Kami !{" "}
                </Title>
                <Text
                    size="sm"
                    className=" font-medium text-tanArt-grey text-end"
                >
                    Apakah Anda seorang pelukis berbakat yang mencari platform
                    untuk memamerkan karya Anda? Kami mengundang Anda untuk
                    bergabung dengan komunitas pelukis kami!
                </Text>
                <Space h={{ base: "sm", sm: "sm", md: "md" }} />
                <Text
                    size="sm"
                    className=" flex flex-row-reverse items-center font-bold text-tanArtBlue-600 gap-5"
                >
                    <span>
                        <NextImage
                            src="/tanart-logo.png"
                            alt="Logo Tanart"
                            width={30}
                            height={30}
                        />
                    </span>
                    Tanart Space
                </Text>
            </div>
        </Flex>
    );
}

function StepSecond({ handleNextStep, handleUpdateData }) {
    let form = useForm({
        name: "register-form",
        mode: "uncontrolled",
        initialValues: {
            nama_lengkap: "",
            username: "",
            tempat_lhr: "",
            tgl_lhr: "",
            password: "",
            "confirm-password": "",
        },
        validate: {
            username: hasLength({ min: 5, max: 20 }, "Minimal 5 Karakter!"),
            nama_lengkap: isNotEmpty("Nama tidak boleh Kosong!"),
            tempat_lhr: isNotEmpty("Tidak boleh kosong!"),
            tgl_lhr: isNotEmpty("Tidak boleh kosong!"),
            password: hasLength(
                { min: 6, max: 100 },
                "Password minimal 6 huruf"
            ),
            "confirm-password": matchesField(
                "password",
                "Tidak sama dengan password!"
            ),
        },
    });

    let handleSubmit = (data) => {
        handleUpdateData((state) => {
            console.log({ state });
            return {
                ...state,
                isCreateNewUser: true,
                user: {
                    email: state.user.email,
                    ...data,
                },
            };
        });
        handleNextStep(2);
    };

    return (
        <Flex
            direction={{ base: "column-reverse", sm: "row-reverse" }}
            className="h-full"
        >
            <div className=" flex-1 md:p-8 p-4 flex flex-col gap-3 justify-center">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="xs">
                        <TextInput
                            label={
                                <Text fw="bold" size="xs" span>
                                    Nama Lengkap
                                </Text>
                            }
                            name="nama_lengkap"
                            key={form.key("nama_lengkap")}
                            withAsterisk
                            {...form.getInputProps("nama_lengkap")}
                        />
                        <TextInput
                            label={
                                <Text fw="bold" size="xs" span>
                                    Username
                                </Text>
                            }
                            name="username"
                            key={form.key("username")}
                            withAsterisk
                            {...form.getInputProps("username")}
                        />
                        <Group grow align="flex-start">
                            <TextInput
                                label={
                                    <Text fw="bold" size="xs" span>
                                        Tempat Lahir
                                    </Text>
                                }
                                name="tempat_lhr"
                                key={form.key("tempat_lhr")}
                                withAsterisk
                                {...form.getInputProps("tempat_lhr")}
                            />
                            <DateInput
                                label={
                                    <Text fw="bold" size="xs" span>
                                        Tanggal lahir
                                    </Text>
                                }
                                valueFormat="DD MMMM YYYY"
                                maxDate={new Date()}
                                name="tgl_lhr"
                                key={form.key("tgl_lhr")}
                                withAsterisk
                                {...form.getInputProps("tgl_lhr")}
                            />
                        </Group>
                        <PasswordInput
                            label={
                                <Text fw="bold" size="xs" span>
                                    Kata Sandi
                                </Text>
                            }
                            name="password"
                            key={form.key("password")}
                            withAsterisk
                            {...form.getInputProps("password")}
                        />
                        <PasswordInput
                            label={
                                <Text fw="bold" size="xs" span>
                                    Konfirmasi Kata Sandi
                                </Text>
                            }
                            name="confirm-password"
                            key={form.key("confirm-password")}
                            withAsterisk
                            {...form.getInputProps("confirm-password")}
                        />
                        <Button className=" self-end" type="submit">
                            Selanjutnya
                        </Button>
                    </Stack>
                </form>
            </div>
            <div className=" flex-1 md:p-8 p-4 flex flex-col gap-2 md:gap-5 justify-center">
                <Title
                    order={2}
                    className=" text-tanArtBlue-600 text-end font-bold"
                >
                    Silahkan lengkapi data Anda
                </Title>
                <Text
                    size="sm"
                    className=" font-medium text-tanArt-grey text-end"
                >
                    Kami memerlukan identitas anda untuk menyambungkan anda ke
                    Komunitas, tidak perlu risau karena kami akan menjamin
                    keamanan data Anda.
                </Text>
                <Space h={{ base: "sm", sm: "sm", md: "md" }} />
                <Text
                    size="sm"
                    className=" flex flex-row-reverse items-center font-bold text-tanArtBlue-600 gap-5"
                >
                    <span>
                        <NextImage
                            src="/tanart-logo.png"
                            alt="Logo Tanart"
                            width={30}
                            height={30}
                        />
                    </span>
                    Tanart Space
                </Text>
            </div>
        </Flex>
    );
}

function StepThird({ handleNextStep, dataStepper, mode }) {
    let form = useForm({
        name: "register-form",
        mode: "uncontrolled",
        initialValues: {
            deskripsi: "",
        },
        validate: {
            deskripsi: hasLength(
                { min: 50, max: 1000 },
                "Wajib diisi, minimal 50 Karakter!"
            ),
        },
    });
    let handleSubmit = (data) => {
        console.log({ data, dataStepper });
    };
    return (
        <Flex
            direction={{ base: "column-reverse", sm: "row" }}
            className="h-full"
        >
            <div className=" flex-1 md:p-8 p-4 flex flex-col gap-3 justify-center">
                <Title order={1} fw={"bold"} className="text-xl md:text-2xl">
                    Bagikan Pengalaman Anda sebagai{" "}
                    {mode === TYPE.KURATOR ? "Kurator" : "Pelukis"}
                </Title>
                <Text size="sm" className="text-tanArt-grey">
                    Silakan bagikan kisah Anda dengan menjawab kolom dibawah ini
                    !
                </Text>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Textarea
                        name="deskripsi"
                        rows={4}
                        placeholder="Beritahu kami mengenai pengalaman Anda"
                        withAsterisk
                        {...form.getInputProps("deskripsi")}
                        key={form.key("deskripsi")}
                    />
                    <Space h="md" />
                    <Button className=" self-end" type="submit">
                        Kirim
                    </Button>
                </form>
            </div>
            <div className=" flex-1 md:p-8 p-4 flex flex-col gap-2 md:gap-5 justify-center">
                <Title
                    order={2}
                    className=" text-tanArtBlue-600 text-end font-bold"
                >
                    {mode === TYPE.KURATOR ? "Kurator" : "Pelukis"}
                </Title>
                <Text
                    size="sm"
                    className=" font-medium text-tanArt-grey text-end"
                >
                    {mode === TYPE.KURATOR
                        ? "kurator/ku·ra·tor/ n 1 pengurus atau pengawas harta benda orang yang pailit dan sebagainya; 2 anggota pengawas dari perguruan tinggi; penyantun; 3 pengurus atau pengawas museum (gedung pameran seni lukis, perpustakaan, dan sebagainya);"
                        : "pelukis/pe·lu·kis/ n orang yang berprofesi melukis (seniman dalam seni lukis lukis);"}
                </Text>
                <Space h={{ base: "sm", sm: "sm", md: "md" }} />
                <Text
                    size="sm"
                    className=" flex flex-row-reverse items-center font-bold text-tanArtBlue-600 gap-5"
                >
                    <span>
                        <NextImage
                            src="/tanart-logo.png"
                            alt="Logo Tanart"
                            width={30}
                            height={30}
                        />
                    </span>
                    Tanart Space
                </Text>
            </div>
        </Flex>
    );
}

export default function Content() {
    const params = useSearchParams();
    const mode = useMemo(
        () =>
            params.get("type") === TYPE.KURATOR ? TYPE.KURATOR : TYPE.PELUKIS,
        []
    );
    const [active, setActive] = useState(0);
    const [dataStepper, setDataStepper] = useState({
        isCreateNewUser: false,
        user: {},
    });
    return (
        <Flex
            className="bg-white w-5/6 md:w-2/3 lg:aspect-[2/1] max-w-[1100px] rounded-lg mdoverflow-hidden"
            direction="column"
            align="center"
        >
            <div className="h-20 w-2/3 md:w-1/2 py-1 px-2 flex flex-col justify-center">
                <Stepper
                    active={active}
                    onStepClick={setActive}
                    size="xs"
                    allowNextStepsSelect={false}
                >
                    <StepperStep icon={<Step1Icon w={40} h={40} />} />
                    <StepperStep />
                    <StepperStep icon={<Step3Icon w={40} h={40} />} />
                </Stepper>
            </div>
            <div className=" grow self-stretch">
                {active === 0 && (
                    <StepFirst
                        handleNextStep={setActive}
                        handleUpdateData={setDataStepper}
                        mode={mode}
                    />
                )}
                {active === 1 && (
                    <StepSecond
                        handleNextStep={setActive}
                        handleUpdateData={setDataStepper}
                        mode={mode}
                    />
                )}
                {active === 2 && (
                    <StepThird
                        handleNextStep={setActive}
                        dataStepper={dataStepper}
                        mode={mode}
                    />
                )}
            </div>
        </Flex>
    );
}
