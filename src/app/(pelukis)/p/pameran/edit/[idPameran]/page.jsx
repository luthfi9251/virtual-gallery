import { getAllKaryaCurrentPelukis } from "@/actions/pelukis";
import EditPameran from "./EditPameran";
import PameranProvider from "./PameranProvider";
import { getPameranById } from "@/actions/pameran";

export default async function Page(props) {
    let pameranData = await getPameranById(props.params.idPameran);
    let karya = await getAllKaryaCurrentPelukis();
    return (
        <PameranProvider karya={karya} data={pameranData.data}>
            <EditPameran />
        </PameranProvider>
    );
}
