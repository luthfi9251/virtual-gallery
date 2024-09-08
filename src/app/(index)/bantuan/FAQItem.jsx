import HTMLInjector from "@/components/HTMLInjector";
import { AccordionControl, AccordionItem, AccordionPanel } from "@mantine/core";

export default function FAQItem({ value, title, description }) {
    return (
        <AccordionItem value={value}>
            <AccordionControl>{title}</AccordionControl>
            <AccordionPanel>
                <HTMLInjector content={description} />
            </AccordionPanel>
        </AccordionItem>
    );
}
