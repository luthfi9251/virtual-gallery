import { getAllKaryaCurrentPelukis } from "@/actions/pelukis";
import BukaPameran from "./BukaPameran";

export default async function Page() {
    let karya = await getAllKaryaCurrentPelukis();

    console.log(karya);
    return <BukaPameran />;
}
