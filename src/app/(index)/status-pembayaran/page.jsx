import { Title } from "@mantine/core";
import dayjs from "dayjs";
import DataTableComponent from "./DataTable";
import { getStatusPembayaranAll } from "@/actions/checkout";

import withAuth from "@/hoc/withAuthCheck";

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
            updated_at: item.updated_at,
            rejectionReason: item.rejectionReason,
            paymentDetails: item.PaymentDetails,
        };
    });
};

export const revalidate = 120;

async function Page() {
    let data = await getStatusPembayaranAll();
    if (data.isError) {
        throw data.error;
    }
    let mappedData = mapDataResponse(data.data);
    return (
        <div className=" w-full flex justify-center">
            <div className="w-full max-w-[1300px] flex flex-col p-1 md:p-2 gap-3 mt-[60px]">
                <Title order={2}>Status Pembayaran</Title>
                <DataTableComponent records={mappedData} />
            </div>
        </div>
    );
}

export default withAuth(Page);
