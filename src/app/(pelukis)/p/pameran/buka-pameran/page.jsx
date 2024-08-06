import { getAllKaryaSiapPamer } from "@/actions/pelukis";
import BukaPameran from "./BukaPameran";
import PameranProvider from "./PameranProvider";

export default async function Page() {
    let karya = await getAllKaryaSiapPamer();

    return (
        <PameranProvider karya={karya}>
            <BukaPameran />
        </PameranProvider>
    );
}
