import { Container } from "@mantine/core";
import TabContent from "./TabContent";
import {
    getAllKaryaNotYetCurratedByCurrentUser,
    getAllKaryaAlreadyCurrated,
} from "@/actions/karya";

export default async function Page(props) {
    let mode = props.searchParams.tab || "kurasi";
    let data =
        mode === "kurasi"
            ? await getAllKaryaNotYetCurratedByCurrentUser()
            : await getAllKaryaAlreadyCurrated();

    return (
        <Container fluid px={{ base: 0, md: "lg" }}>
            <TabContent data={data} mode={mode} />
        </Container>
    );
}
