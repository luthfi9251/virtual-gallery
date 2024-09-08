import BaseRichTextEditor from "@/components/RichTextEditor";
import {
    Group,
    Select,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { getFAQListByID } from "@/actions/admin";
import FormEdit from "./FormEdit";

export default async function Page(props) {
    let response = await getFAQListByID(props.params.id);
    return (
        <div className="p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black my-2">
                Edit Pertanyaan
            </Title>
            <Stack>
                <FormEdit data={response.data} />
            </Stack>
        </div>
    );
}
