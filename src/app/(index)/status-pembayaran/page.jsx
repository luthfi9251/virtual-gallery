import { Title } from "@mantine/core";
import dayjs from "dayjs";
import DataTableComponent from "./DataTable";
import { getStatusPembayaranAll } from "@/actions/checkout";

const mapDataResponse = (data) => {
    return data.map((item) => {
        return {
            no_invoice: item.id,
            expired_date: dayjs(item.expiredDate)
                .locale("id")
                .format("DD/MM/YYYY HH:mm:ss"),
            judul_karya: item.Karya.judul,
            nama_pameran: item.Pameran.nama_pameran,
            harga: item.Karya.harga,
            status: item.status,
        };
    });
};

export const revalidate = 120;

export default async function Page() {
    let data = await getStatusPembayaranAll();
    let mappedData = mapDataResponse(data.data);
    return (
        <div className=" w-full flex justify-center">
            <div className="w-full max-w-[1300px] flex flex-col p-1 md:p-2 gap-3">
                <Title order={2}>Status Pembayaran</Title>
                <DataTableComponent records={mappedData} />
            </div>
        </div>
    );
}
