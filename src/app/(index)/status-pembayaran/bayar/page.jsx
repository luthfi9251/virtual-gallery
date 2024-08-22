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
import DataTransferForm from "./DataTransferForm";
import prisma from "@/lib/prisma";
import HTMLInjector from "@/components/HTMLInjector";

const restructureResponse = (data) => {
    return {
        dataKarya: {
            nama_pameran: data?.Pameran.nama_pameran,
            judul_karya: data?.Karya.judul,
            lukisan_url: data?.Karya.lukisan_url,
            nama_pelukis: data?.Karya.Seniman.User.nama_lengkap,
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

async function getCaraPembayaran() {
    const RICH_TEXT_HTML_PREFIX = "RICH_TEXT_HTML_PREFIX_CARA_PEMBAYARAN";
    let caraPembayaranText = await prisma.CMSPageVariable.findUnique({
        where: {
            tag: RICH_TEXT_HTML_PREFIX,
        },
        select: {
            value: true,
        },
    });

    return caraPembayaranText.value;
}
async function getNomorRekening() {
    const RICH_TEXT_HTML_PREFIX = "RICH_TEXT_HTML_PREFIX_NOMOR_REKENING";
    let nomorRekeningText = await prisma.CMSPageVariable.findUnique({
        where: {
            tag: RICH_TEXT_HTML_PREFIX,
        },
        select: {
            value: true,
        },
    });

    return nomorRekeningText.value;
}

export default async function Page(props) {
    let caraPembayaran = await getCaraPembayaran();
    let nomorRekening = await getNomorRekening();
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
            <div className="w-full max-w-[1000px] flex flex-col p-1 md:p-2 mt-[60px]">
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
                                <HTMLInjector content={caraPembayaran} />
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem value="rekening_tujuan">
                            <AccordionControl>Rekening Tujuan</AccordionControl>
                            <AccordionPanel>
                                <HTMLInjector content={nomorRekening} />
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
                        <DataTransferForm />
                    </div>
                </Stack>
            </div>
        </div>
    );
}
