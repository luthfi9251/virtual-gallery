import { Container } from "@mantine/core";
import TabContent from "./TabContent";
import { getAllKaryaNotYetCurratedByCurrentUser } from "@/actions/karya";

export default async function Page(props) {
    let data = await getAllKaryaNotYetCurratedByCurrentUser();
    return (
        <Container fluid px={{ base: 0, md: "lg" }}>
            <TabContent data={data} />
        </Container>
    );
}
