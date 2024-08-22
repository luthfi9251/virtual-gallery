import { URL_TANART } from "@/variables/url";
import { Button, Container, Space, Title } from "@mantine/core";
import Link from "next/link";
import DataTableComponent from "./DataTable";
import { getAllKaryaAdmin } from "@/actions/admin";

export default async function Page() {
    let data = await getAllKaryaAdmin();
    return (
        <Container fluid>
            <Title order={2}>Karya</Title>
            <Space h="xl" />
            <DataTableComponent records={data} />
        </Container>
    );
}
