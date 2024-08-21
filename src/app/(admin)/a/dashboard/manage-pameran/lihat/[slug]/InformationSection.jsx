"use client";
import Image from "next/image";
import { Title, Spoiler } from "@mantine/core";
import { useElementSize, useViewportSize } from "@mantine/hooks";
import { pameranSampulLoader } from "@/loader/imageLoader";

export default function InformationSection({ dataPameran }) {
    const { ref, width, height } = useElementSize();
    const viewport = useViewportSize();
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Image
                width={433}
                height={520}
                alt={dataPameran?.slug}
                src={dataPameran?.sampul_url}
                loader={pameranSampulLoader}
                ref={ref}
                className="aspect-[5/6] object-cover col-span-1 place-self-center"
            />
            <Spoiler
                maxHeight={viewport.width > 768 ? height : 200}
                showLabel={<p className="w-[90px] text-sm">Show More</p>}
                hideLabel={<p className="w-[90px] text-sm">Hide</p>}
                styles={{
                    control: {
                        left: "calc(50% - 45px)",
                    },
                }}
                className="text-center col-span-1 md:col-span-2 flex flex-col justify-center p-2 gap-2"
            >
                <Title order={3} className="text-2xl font-medium">
                    Informasi Pameran
                </Title>
                <p className="text-light py-2 md:p-2 text-xs xl:text-sm xl:leading-loose">
                    {dataPameran.deskripsi}
                </p>
            </Spoiler>
        </div>
    );
}
