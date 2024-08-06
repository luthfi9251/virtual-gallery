import Image from "next/image";
import { Title } from "@mantine/core";
export default function KaryaDisplaySection({ dataKarya }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-5 place-items-center lg:place-items-start">
            <Image
                width={300}
                height={300}
                src="/bg-login.jpg"
                className=" object-contain cols-span-1 aspect-[5/6] bg-slate-300 rounded-lg"
            />
            <div className="lg:col-span-2 flex flex-col gap-2 items-start">
                <Title order={4} className="text-3xl font-medium">
                    {dataKarya?.judul}
                </Title>
                <table>
                    <tbody>
                        <tr>
                            <td className="pr-2">Seniman</td>
                            <td className="font-light">
                                {dataKarya?.nama_seniman}
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-2">Tahun</td>
                            <td className="font-light">{dataKarya?.tahun}</td>
                        </tr>
                        <tr>
                            <td className="pr-2">Media</td>
                            <td className="font-light">{dataKarya?.media}</td>
                        </tr>
                        <tr>
                            <td className="pr-2">Teknik</td>
                            <td className="font-light">{dataKarya?.teknik}</td>
                        </tr>
                        <tr>
                            <td className="pr-2">Ukuran</td>
                            <td className="font-light">{dataKarya?.dimensi}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
