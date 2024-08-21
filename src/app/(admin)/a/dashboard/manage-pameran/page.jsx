import { getAllPameranAdmin } from "@/actions/admin";
import { URL_TANART } from "@/variables/url";
import { Button, Container, Space, Title } from "@mantine/core";
import Link from "next/link";
import DataTableComponent from "./DataTable";

export default async function Page() {
    let data = await getAllPameranAdmin();
    return (
        <Container fluid>
            <Title order={2}>Pameran</Title>
            <Space h="xl" />
            <DataTableComponent records={data} />
        </Container>
    );
}
