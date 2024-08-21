import EditPameran from "./EditPameran";
import PameranProvider from "./PameranProvider";
import { getPameranById } from "@/actions/pameran";
import { getAllKaryaReadyToPameranAdmin } from "@/actions/admin";

export default async function Page(props) {
    let pameranData = await getPameranById(props.params.idPameran);
    let karya = await getAllKaryaReadyToPameranAdmin();
    return (
        <PameranProvider karya={karya} data={pameranData.data}>
            <EditPameran />
        </PameranProvider>
    );
}
