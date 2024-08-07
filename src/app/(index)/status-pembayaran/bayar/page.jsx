import { getDataBayarPage } from "@/actions/checkout";
import {
    Title,
    Stack,
    Accordion,
    AccordionItem,
    AccordionControl,
    AccordionPanel,
    TextInput,
    FileInput,
    Button,
} from "@mantine/core";
import Image from "next/image";
import KaryaDisplaySection from "./KaryaDisplaySection";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { formatToRupiah } from "@/lib/formatter";

const restructureResponse = (data) => {
    return {
        dataKarya: {
            nama_pameran: data?.Pameran.nama_pameran,
            judul_karya: data?.Karya.judul,
            lukisan_url: data?.Karya.lukisan_url,
            nama_pelukis: data?.Pameran.Seniman.User.nama_lengkap,
            tahun: new Date(data?.created_at).getFullYear(),
            media: data?.Karya.media,
            teknik: data?.Karya.teknik,
            ukuran: `${data?.Karya.panjang} x ${data?.Karya.lebar}`,
        },
        expiredDate: dayjs(data?.expiredDate)
            .locale("id")
            .format("DD/MM/YYYY HH:mm:ss"),
        harga: formatToRupiah(data?.Karya.harga),
    };
};

export default async function Page(props) {
    let data = await getDataBayarPage(props.searchParams.invoice);
    if (data.isError) {
        return (
            <div className=" w-full flex justify-center">
                <div className="w-full max-w-[1000px] flex flex-col justify-center p-1 md:p-2">
                    Transaksi anda sudah tidak valid karena telah expired,
                    silahkan melakukan chekout karya lagi.
                </div>
            </div>
        );
    }
    let transformed = restructureResponse(data.data);
    return (
        <div className=" w-full flex justify-center">
            <div className="w-full max-w-[1000px] flex flex-col p-1 md:p-2">
                <Title className="text-center" order={2}>
                    Bayar
                </Title>
                <Stack gap="xl">
                    <KaryaDisplaySection dataKarya={transformed.dataKarya} />
                    <Accordion
                        chevronPosition="right"
                        variant="separated"
                        multiple
                    >
                        <AccordionItem value="cara_pembayaran">
                            <AccordionControl>Cara Pembayaran</AccordionControl>
                            <AccordionPanel>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Blanditiis, animi adipisci!
                                Sed excepturi voluptate pariatur maiores! Sequi,
                                debitis dolor, error maxime alias deleniti
                                facere repellat, doloribus magni quidem illo
                                iusto.
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem value="rekening_tujuan">
                            <AccordionControl>Rekening Tujuan</AccordionControl>
                            <AccordionPanel>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Blanditiis, animi adipisci!
                                Sed excepturi voluptate pariatur maiores! Sequi,
                                debitis dolor, error maxime alias deleniti
                                facere repellat, doloribus magni quidem illo
                                iusto.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <Stack
                        gap={2}
                        className="bg-tanArtBlue-900 p-3 rounded text-white"
                    >
                        <p className="font-medium text-xl">Total Bayar</p>
                        <p className="font-bold text-4xl">
                            {transformed.harga}
                        </p>
                        <p className="font-semibold text-sm">
                            Silahkan melakukan pembayaran sebelum{" "}
                            {transformed.expiredDate}
                        </p>
                    </Stack>

                    <div>
                        <Title order={4}>Data Tansfer</Title>
                        <p className="text-sm">
                            Silahkan mengisi data berikut untuk mempermudah
                            proses validasi
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2">
                            <TextInput
                                className=""
                                label="Nama Pemilik Rekening"
                                withAsterisk
                            />
                            <TextInput
                                className=""
                                label="Bank Pengirim"
                                withAsterisk
                            />
                            <TextInput
                                className=""
                                label="Bank Tujuan"
                                withAsterisk
                            />
                            <FileInput
                                className=""
                                label="Bukti Transfer"
                                placeholder="Upload bukti beupa gambar"
                                withAsterisk
                            />
                        </div>
                        <div className="mt-3 flex justify-end w-full">
                            <Button className="w-[200px]">Simpan</Button>
                        </div>
                    </div>
                </Stack>
            </div>
        </div>
    );
}
