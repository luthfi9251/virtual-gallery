import { getAllKaryaCurrentPelukis } from "@/actions/pelukis";
import BukaPameran from "./BukaPameran";
import PameranProvider from "./PameranProvider";

export default async function Page() {
    let karya = await getAllKaryaCurrentPelukis();

    return (
        <PameranProvider karya={karya}>
            <BukaPameran />
        </PameranProvider>
    );
}
