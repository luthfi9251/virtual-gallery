import { Container, Space, Title } from "@mantine/core";
import DataTableComponent from "./DataTable";
import { getAllFAQList } from "@/actions/admin";

export const dynamic = "force-dynamic";

export default async function Page() {
    let data = await getAllFAQList();
    if (data.isError) throw data.error;
    return (
        <Container fluid>
            <Title order={2}>Daftar Pertanyaan</Title>
            <Space h="xl" />
            <DataTableComponent records={data.data} />
        </Container>
    );
}
