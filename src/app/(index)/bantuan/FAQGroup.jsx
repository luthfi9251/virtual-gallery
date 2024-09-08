import {
    Accordion,
    AccordionControl,
    AccordionItem,
    AccordionPanel,
    Stack,
    Title,
} from "@mantine/core";
import FAQItem from "./FAQItem";

export default function FAQGroup({ title, data }) {
    return (
        <Stack className="w-full p-5 rounded shadow">
            <Title className="text-center text-2xl font-bold text-tanArtBlue-600">
                {title}
            </Title>
            <Accordion variant="separated" className="w-full">
                {data?.map((item, key) => (
                    <FAQItem
                        key={key}
                        value={item.value}
                        description={item.deskripsi}
                        title={item.title}
                    />
                ))}
            </Accordion>
        </Stack>
    );
}
