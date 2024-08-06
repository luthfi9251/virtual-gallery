import { formatToRupiah } from "@/lib/formatter";
import { Title, Stack, Checkbox, Button } from "@mantine/core";
import KaryaDisplaySection from "./KaryaDisplaySection";
import DataPembeliSection from "./DataPembeliSection";
import CheckoutProvider from "./ChekoutProvider";
import RingkasanSection from "./RingkasanSection";
import { getCheckoutPageData } from "@/actions/checkout";

export default async function Page(props) {
    let res = await getCheckoutPageData(
        props.params.pameranId,
        props.searchParams.karya
    );
    let data = res.data;
    return (
        <div className=" w-full flex justify-center">
            <CheckoutProvider
                profileData={data?.dataUser}
                idKarya={props.searchParams.karya}
                idPameran={props.params.pameranId}
            >
                <div className="w-full max-w-[1300px] flex flex-col p-1 md:p-2">
                    <Title>Checkout</Title>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-2 py-2 mt-3">
                        <Stack className="lg:col-span-2" gap="xl">
                            <Title order={4}>Alur Pembelian Karya</Title>
                            <div>
                                <Title order={4}>Order</Title>
                                <KaryaDisplaySection
                                    dataKarya={data?.dataKarya}
                                />
                            </div>
                            <div>
                                <Title order={4}>Data Pembeli</Title>
                                <DataPembeliSection />
                            </div>
                        </Stack>
                        <div>
                            <RingkasanSection data={data} />
                        </div>
                    </div>
                </div>
            </CheckoutProvider>
        </div>
    );
}
