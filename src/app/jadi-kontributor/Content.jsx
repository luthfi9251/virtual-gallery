"use client";
import {
    Container,
    Title,
    Flex,
    Stepper,
    StepperStep,
    Text,
} from "@mantine/core";
import { useState } from "react";

export default function Content() {
    const [active, setActive] = useState(1);
    return (
        <Flex
            className="bg-white md:h-2/3 w-5/6 max-w-[1100px] rounded-lg"
            direction="column"
            align="center"
        >
            <div className="h-20 w-2/3 md:w-1/2 py-1 px-2 flex flex-col justify-center">
                <Stepper
                    active={active}
                    onStepClick={setActive}
                    size={{ base: "sm", sm: "xs", md: "sm" }}
                >
                    <StepperStep />
                    <StepperStep />
                    <StepperStep />
                </Stepper>
            </div>
            <div className="bg-blue-200 grow self-stretch">
                <Flex direction={{ base: "column-reverse", sm: "row" }}>
                    <div className="grow">
                        <Title
                            order={1}
                            fw={"bold"}
                            className="text-2xl md:text-3xl xl:text-4xl"
                        >
                            Pelukis
                        </Title>
                        <Text size="sm" fw="lighter">
                            Masukkan email Anda untuk melakukan pengajuan akun
                            pelukis
                        </Text>
                    </div>
                    <div className="grow">2</div>
                </Flex>
            </div>
        </Flex>
    );
}
