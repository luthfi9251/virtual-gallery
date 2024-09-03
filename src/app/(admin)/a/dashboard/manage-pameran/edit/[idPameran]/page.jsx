import EditPameran from "./EditPameran";
import PameranProvider from "./PameranProvider";
import { getPameranById } from "@/actions/pameran";
import {
    getAllKaryaReadyToPameranAdmin,
    getAllPelukisAccount,
} from "@/actions/admin";

async function pelukisActive() {
    let response = await getAllPelukisAccount();

    if (!response.isError) {
        return response.data.map((item) => {
            return {
                value: item.id_seniman,
                label: item.nama_lengkap + " - " + item.username,
            };
        });
    } else {
        return [];
    }
}

export default async function Page(props) {
    let pameranData = await getPameranById(props.params.idPameran);
    let karya = await getAllKaryaReadyToPameranAdmin();
    let allSeniman = await pelukisActive();
    return (
        <PameranProvider karya={karya} data={pameranData.data}>
            <EditPameran senimanAll={allSeniman} />
        </PameranProvider>
    );
}
