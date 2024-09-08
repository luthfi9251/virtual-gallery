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
import FormAdd from "./FormAdd";

export default function Page() {
    return (
        <div className="p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black my-2">
                Tambah Petanyaan
            </Title>
            <Stack>
                <FormAdd />
            </Stack>
        </div>
    );
}
