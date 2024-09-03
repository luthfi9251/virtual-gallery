import Image from "next/image";
import KaryaForm from "./KaryaForm";
import { getKaryaByID } from "@/actions/karya";
import { karyaImageLoader } from "@/loader/imageLoader";

export default async function Page(props) {
    let karyaId = props.params.karyaId;
    let data = await getKaryaByID(karyaId);

    if (data.isError) throw data.error;
    data = data.data;
    return (
        <div className="p-4 h-full md:h-[calc(100vh-100px)] w-full flex flex-col md:flex-row gap-3">
            <div className="md:flex-1 h-[600px] md:h-full overflow-hidden flex items-center justify-center flex-col gap-2 relative">
                <div className="w-full h-full flex items-center relative max-w-[900px] max-h-[800px] border">
                    <Image
                        src={data?.lukisan_url}
                        fill
                        alt="preview"
                        className="object-contain rounded"
                        loader={karyaImageLoader}
                        quality={100}
                    />
                </div>
            </div>
            <KaryaForm dataKarya={data} />
        </div>
    );
}
