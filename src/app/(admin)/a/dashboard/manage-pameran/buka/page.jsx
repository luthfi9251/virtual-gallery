import { getAllKaryaReadyToPameranAdmin } from "@/actions/admin";
import BukaPameran from "./BukaPameran";
import PameranProvider from "./PameranProvider";

export default async function Page() {
    let karya = await getAllKaryaReadyToPameranAdmin();

    return (
        <PameranProvider karya={karya}>
            <BukaPameran />
        </PameranProvider>
    );
}
