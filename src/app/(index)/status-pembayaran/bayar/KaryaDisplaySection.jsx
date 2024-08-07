import { karyaImageLoader } from "@/loader/imageLoader";
import Image from "next/image";
import { Title } from "@mantine/core";
export default function KaryaDisplaySection({ dataKarya }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 my-5 place-items-center lg:place-items-start">
            <Image
                width={300}
                height={300}
                src={dataKarya?.lukisan_url}
                loader={dataKarya?.lukisan_url && karyaImageLoader}
                className=" object-contain cols-span-1 aspect-[5/6] bg-slate-100 rounded-lg"
            />
            <div className="lg:col-span-2 flex flex-col gap-2 items-start justify-center h-full">
                <Title order={4} className="text-3xl font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                    odit!
                </Title>
                <table>
                    <tbody>
                        <tr>
                            <td className="pr-2">Pameran</td>
                            <td className="font-light">
                                {dataKarya.nama_pameran}
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-2">Seniman</td>
                            <td className="font-light">
                                {dataKarya.nama_pelukis}
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-2">Tahun</td>
                            <td className="font-light">{dataKarya.tahun}</td>
                        </tr>
                        <tr>
                            <td className="pr-2">Media</td>
                            <td className="font-light">{dataKarya.media}</td>
                        </tr>
                        <tr>
                            <td className="pr-2">Teknik</td>
                            <td className="font-light">{dataKarya.teknik}</td>
                        </tr>
                        <tr>
                            <td className="pr-2">Ukuran</td>
                            <td className="font-light">{dataKarya.ukuran}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
