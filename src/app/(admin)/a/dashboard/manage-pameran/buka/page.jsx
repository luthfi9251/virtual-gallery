import {
    getAllKaryaReadyToPameranAdmin,
    getAllPelukisAccount,
} from "@/actions/admin";
import BukaPameran from "./BukaPameran";
import PameranProvider from "./PameranProvider";

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

export default async function Page() {
    let allSeniman = pelukisActive();
    let karya = getAllKaryaReadyToPameranAdmin();

    let result = await Promise.all([allSeniman, karya]);

    return (
        <PameranProvider karya={result[1]}>
            <BukaPameran senimanAll={result[0]} />
        </PameranProvider>
    );
}
