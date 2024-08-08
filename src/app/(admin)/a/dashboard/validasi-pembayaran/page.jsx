import { Title, Container, Space } from "@mantine/core";
import DataTable from "./DataTable";
import { getAllCheckoutHistoryData } from "@/actions/checkout";

export default async function Page() {
    const data = await getAllCheckoutHistoryData();
    let dataToRes = data.data;
    return (
        <Container fluid>
            <Title order={2}>Validasi Pembayaran</Title>
            <Space h="xl" />
            <DataTable records={dataToRes} />
        </Container>
    );
}
