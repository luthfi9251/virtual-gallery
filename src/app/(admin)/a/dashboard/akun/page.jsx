import { Title, Container, Space } from "@mantine/core";
import DataTable from "./DataTable";
import { getAllUserAccount } from "@/actions/user";

export default async function Page() {
    const data = await getAllUserAccount();
    return (
        <Container fluid>
            <Title order={2}>Kelola Akun Pengguna</Title>
            <Space h="xl" />
            <DataTable records={data} />
        </Container>
    );
}
