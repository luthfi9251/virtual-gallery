import { Flex } from "@mantine/core";

export default function Sidebar() {
    return (
        <>
            <Flex
                direction={"column"}
                className=" h-screen w-[280px]"
                bg="myColor"
            >
                <div className=" h-32">1</div>
                <div className=" flex-grow">2</div>
                <div className=" h-32">3</div>
            </Flex>
        </>
    );
}
