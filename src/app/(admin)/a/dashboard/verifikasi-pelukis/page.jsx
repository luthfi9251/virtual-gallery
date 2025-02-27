import { Title, Container, Space } from "@mantine/core";
import DataTable from "./DataTable";
import { getUnverifiedPelukis } from "../actions";

export default async function Page() {
    const data = await getUnverifiedPelukis();
    return (
        <Container fluid>
            <Title order={2}>Verifikasi Akun Pelukis</Title>
            <Space h="xl" />
            <DataTable records={data} />
        </Container>
    );
}
