import { getDataBayarPage } from "@/actions/checkout";
import { Title, Stack } from "@mantine/core";

export default async function Page(props) {
    let data = await getDataBayarPage(props.searchParams.invoice);
    if (data.isSuccess) {
        throw data.error;
    }
    return (
        <div className=" w-full flex justify-center">
            <div className="w-full max-w-[1300px] flex flex-col p-1 md:p-2 gap-3">
                <Title order={2}>Bayar</Title>
                <Stack>
                    <div className="flex flex-col gap-2">
                        <Title order={5}>Nomor Invoice</Title>
                        <p className="font-light text-lg">1234</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Title order={5}>Judul Karya</Title>
                        <p className="font-light text-lg">
                            Lorem ipsum dolor sit amet consectetur.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Title order={5}>Nama Pameran</Title>
                        <p className="font-light text-lg">
                            Lorem ipsum dolor sit amet consectetur.
                        </p>
                    </div>
                </Stack>
            </div>
        </div>
    );
}
