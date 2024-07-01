import {
    Card,
    CardSection,
    Text,
    Stack,
    Container,
    Overlay,
    Group,
    Avatar,
} from "@mantine/core";
import Image from "next/image";

function Status({ status }) {
    if (status === "PENDING") {
        return (
            <Text className="absolute bg-red-600 ronded top-1 right-1 text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white">
                Pending
            </Text>
        );
    } else if (status === "TERKURASI") {
        return (
            <Text className="absolute bg-red-600 ronded top-1 right-1 text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white">
                TERKURASI
            </Text>
        );
    } else if (status === "SELESAI") {
        return (
            <Text className="absolute bg-red-600 ronded top-1 right-1 text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white">
                SELESAI
            </Text>
        );
    } else if (status === "TERJUAL") {
        return (
            <>
                <Text className="absolute inset-0 text-centerS flex justify-center items-center font-bold text-white z-20 text-3xl cursor-default">
                    TERJUAL
                </Text>
                <Overlay
                    color="#000"
                    backgroundOpacity={0.5}
                    className="rounded z-10"
                />
            </>
        );
    } else {
        return null;
    }
}
let STATUS_DEF = ["PENDING", "TERKURASI", "SELESAI", "TERJUAL"];

export default function CardKarya() {
    return (
        <Card className="p-3 shadow border min-w-[150px] w-full max-w-[300px] min-h-[200px] h-full max-h-96 flex flex-col items-center">
            <CardSection className=" rounded aspect-[4/5] w-full m-0 p-10 relative bg-tanArt-greyDark">
                <Image fill src="/bg-login.jpg" className=" object-contain" />
                {/* <Text className="absolute bg-red-600 ronded top-1 right-1 text-xs rounded-xl w-[80px] py-1 text-center font-semibold text-white">
                    Terkurasi
                </Text>

                <Text className="absolute inset-0 text-centerS flex justify-center items-center font-bold text-white z-20 text-3xl cursor-default">
                    TERJUAL
                </Text>
                <Overlay
                    color="#000"
                    backgroundOpacity={0.5}
                    className="rounded z-10"
                /> */}
                <Status
                    status={
                        STATUS_DEF[
                            Math.floor(Math.random() * STATUS_DEF.length)
                        ]
                    }
                />
            </CardSection>
            <Group gap="xs" className="my-1 self-start">
                <Avatar
                    src="/EMPTY_USER_PROFILE.png"
                    variant="transparent"
                    size="xs"
                    alt="Image"
                />
                <Text className="max-w-[170px] line-clamp-1 font-light text-[10px] text-tanArt-grey">
                    Robby Hairdryer
                </Text>
            </Group>
            <Stack gap={5} className="cursor-default">
                <Text className=" font-medium line-clamp-1">
                    Desired destiny Desired destiny Desired destiny Desired
                    destiny
                </Text>
                <Text className=" text-[10px] line-clamp-3">
                    Lukisan ini menggambarkan perjalanan hidup yang dipandu oleh
                    takdir. menggambarkan perjalanan hidup yang dipandu oleh
                    menggambarkan perjalanan hidup yang dipandu oleh
                    menggambarkan perjalanan hidup yang dipandu oleh
                </Text>
                <Group>
                    <Text className="font-light text-[10px] text-tanArt-grey">
                        2024
                    </Text>
                    <Text className="font-light text-[10px] text-tanArt-grey">
                        50 x 70 cm
                    </Text>
                </Group>
            </Stack>
        </Card>
    );
}
