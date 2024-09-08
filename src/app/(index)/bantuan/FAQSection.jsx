import { Stack } from "@mantine/core";
import FAQGroup from "./FAQGroup";
import { getAllFAQAndGrouped } from "@/actions/user";

export default async function FAQSection() {
    let response = await getAllFAQAndGrouped();
    return (
        <Stack className="gap-5 w-full">
            {response.data.map((item, key) => (
                <FAQGroup title={item.title} key={key} data={item.faq_list} />
            ))}
        </Stack>
    );
}
