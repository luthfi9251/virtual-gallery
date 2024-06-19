import { Title, Container, Space } from "@mantine/core";
import DataTable from "./DataTable";
import { getUnverifiedKurator } from "../actions";

export default async function Page() {
    const data = await getUnverifiedKurator();
    return (
        <Container fluid>
            <Title order={2}>Verifikasi Akun Kurator</Title>
            <Space h="xl" />
            <DataTable records={data} />
        </Container>
    );
}
