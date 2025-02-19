import { getCMSVirtualGalleryData } from "@/actions/admin";
import { landingPageFeaturedLoader } from "@/loader/imageLoader";
import { SimpleGrid, Title, Text, NumberFormatter } from "@mantine/core";
import Image from "next/image";

export default async function PelukisKuratorSection() {
    let data = await getCMSVirtualGalleryData();
    console.log({ data });
    return (
        <div className="flex flex-col justify-center items-center p-5 py-14 gap-7">
            <Title className="text-center">TELAH BERGABUNG</Title>
            <SimpleGrid cols={2} className="w-full max-w-[1000px]">
                <div className="flex flex-col items-center">
                    <Text className="text-3xl md:text-6xl font-black text-tanArtBlue-600">
                        <NumberFormatter
                            thousandSeparator="."
                            decimalSeparator=","
                            value={parseInt(data.JUMLAH_PELUKIS)}
                        />
                    </Text>
                    <Text className="text-2xl">Pelukis</Text>
                </div>
                <div className="flex flex-col items-center">
                    <Text className="text-3xl md:text-6xl font-black text-tanArtBlue-600">
                        <NumberFormatter
                            thousandSeparator="."
                            decimalSeparator=","
                            value={parseInt(data.JUMLAH_KURATOR)}
                        />
                    </Text>
                    <Text className="text-2xl">Kurator</Text>
                </div>
            </SimpleGrid>
            <Text className="font-light text-md md:text-xl w-full max-w-[900px] text-center">
                Lebih dari {data.JUMLAH_PELUKIS} pelukis berbakat dan{" "}
                {data.JUMLAH_KURATOR} kurator terkemuka telah bergabung,
                menciptakan kolaborasi seni yang luar biasa dan tak tertandingi.
            </Text>
            <SimpleGrid cols={2} className=" w-full max-w-[1200px]">
                <div className="flex justify-center  ">
                    <div className="max-w-[300px] flex flex-col gap-2">
                        <Image
                            width={300}
                            height={375}
                            alt="pelukis"
                            src={data.FOTO_FEATURED_PELUKIS}
                            loader={landingPageFeaturedLoader}
                            className="aspect-[4/5] w-full object-cover "
                        />
                        <Text className="font-semibold text-xl">
                            {data.NAMA_FEATURED_PELUKIS}
                        </Text>
                        <p className="text-sm font-light">
                            {data.BIO_FEATURED_PELUKIS}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center  ">
                    <div className="max-w-[300px] flex flex-col gap-2">
                        <Image
                            width={300}
                            height={375}
                            alt="kurator"
                            src={data.FOTO_FEATURED_KURATOR}
                            loader={landingPageFeaturedLoader}
                            className="aspect-[4/5] w-full object-cover "
                        />
                        <Text className="font-semibold text-xl">
                            {data.NAMA_FEATURED_KURATOR}
                        </Text>
                        <p className="text-sm font-light">
                            {data.BIO_FEATURED_KURATOR}
                        </p>
                    </div>
                </div>
            </SimpleGrid>
        </div>
    );
}
