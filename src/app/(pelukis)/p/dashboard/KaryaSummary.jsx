import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { SimpleGrid } from "@mantine/core";
import clsx from "clsx";

const CardItem = ({ title, value }) => {
    return (
        <div className="bg-slate-100 rounded p-2 md:p-5 flex flex-col items-start justify-center w-full">
            <p className="text-4xl font-bold">{value}</p>
            <p className="">{title}</p>
        </div>
    );
};

async function getSummaryKarya() {
    let session = await auth();

    if (session.user?.Seniman) {
        let data = await prisma.Karya.groupBy({
            by: ["status"],
            where: {
                Seniman: {
                    id: session.user.Seniman.id,
                },
            },
            _count: true,
        });
        return [
            {
                title: "Total Karya",
                value: data.reduce((acc, curr) => (acc += curr._count), 0),
                className: "",
            },
            {
                title: "Karya Terjual",
                value:
                    data.find((item) => item.status === "TERJUAL")?._count || 0,
            },
            {
                title: "Karya Selesai Kurasi",
                value:
                    data.find((item) => item.status === "TERKURASI")?._count ||
                    0,
                className: "",
            },
            {
                title: "Karya Dalam Kurasi",
                value:
                    data.find((item) => item.status === "DIKURASI")?._count ||
                    0,
                className: "",
            },
        ];
    } else {
        return [
            {
                title: "Total Karya",
                value: 0,
                className: "",
            },
            {
                title: "Karya Terjual",
                value: 0,
                className: "",
            },
            {
                title: "Karya Selesai Kurasi",
                value: 0,
                className: "",
            },
            {
                title: "Karya Dalam Kurasi",
                value: 0,
                className: "",
            },
        ];
    }
}

export default async function KaryaSummary() {
    let dataResponse = await getSummaryKarya();
    return (
        <div className="rounded-lg p-2 md:p-5 border shadow-lg space-y-5 bg-gradient-to-r to-tanArtBlue-200 from-tanArtBlue-400">
            <p className="text-lg font-semibold">Karya Pelukis</p>
            <SimpleGrid cols={2} className=" place-items-center">
                {dataResponse.map((item, key) => (
                    <CardItem key={key} title={item.title} value={item.value} />
                ))}
            </SimpleGrid>
        </div>
    );
}
