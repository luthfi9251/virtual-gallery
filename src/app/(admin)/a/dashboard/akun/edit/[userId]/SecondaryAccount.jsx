import {
    Grid,
    GridCol,
    Fieldset,
    TextInput,
    SimpleGrid,
    Button,
    Stack,
    rem,
    Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export default function SecondaryAccount({ jenisAkun, data }) {
    return (
        <Grid gutter={{ base: 3, md: "md" }}>
            <GridCol span={{ base: 12, md: 10 }}>
                <Fieldset legend={jenisAkun} className="shadow">
                    <form>
                        <Stack gap="md">
                            <DateInput
                                label="Terverifikasi Pada"
                                value={data.verified_at}
                                disabled
                            />
                            <Textarea
                                label="Deskripsi Pengalaman"
                                value={data.deskripsi}
                                disabled
                            />
                        </Stack>
                    </form>
                </Fieldset>
            </GridCol>
            <GridCol span={{ base: 12, md: 2 }} py={{ base: 1, md: 20 }}>
                <Stack>
                    <Button color="yellow">Deactivate Akun</Button>
                    <Button color="red">Hapus Akun</Button>
                </Stack>
            </GridCol>
        </Grid>
    );
}
