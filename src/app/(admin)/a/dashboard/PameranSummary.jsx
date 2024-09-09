import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { SimpleGrid } from "@mantine/core";
import clsx from "clsx";
import dayjs from "dayjs";

const CardItem = ({ title, value }) => {
    return (
        <div className="bg-slate-100 rounded p-2 md:p-5 flex flex-col items-start justify-center w-full">
            <p className="text-4xl font-bold">{value}</p>
            <p className="">{title}</p>
        </div>
    );
};

async function getPameranSummary() {
    let session = await auth();

    if (session.user?.Seniman) {
        let data = await prisma.Pameran.findMany({
            where: {},
        });
        let currentDate = dayjs();

        let reduced = data.reduce(
            (accumulator, currentVal) => {
                let addOneDay = dayjs(currentVal.tgl_selesai)
                    .add(1, "day")
                    .toDate();
                if (addOneDay < currentDate) {
                    accumulator.close += 1;
                    accumulator.total += 1;
                } else if (currentVal.tgl_mulai > currentDate) {
                    accumulator.scheduled += 1;
                    accumulator.total += 1;
                } else {
                    accumulator.open += 1;
                    accumulator.total += 1;
                }

                return accumulator;
            },
            { scheduled: 0, open: 0, close: 0, total: 0 }
        );

        return [
            {
                title: "Total Pameran",
                value: reduced.total,
                className: "",
            },
            {
                title: "Pameran Terbuka",
                value: reduced.open,
                className: "",
            },
            {
                title: "Pameran Terjadwal",
                value: reduced.scheduled,
                className: "",
            },
            {
                title: "Pameran Ditutup",
                value: reduced.close,
                className: "",
            },
        ];
    } else {
        return [
            {
                title: "Total Pameran",
                value: 0,
                className: "",
            },
            {
                title: "Pameran Terbuka",
                value: 0,
                className: "",
            },
            {
                title: "Pameran Terjadwal",
                value: 0,
                className: "",
            },
            {
                title: "Pameran Ditutup",
                value: 0,
                className: "",
            },
        ];
    }
}

export default async function PameranSummary() {
    let dataResponse = await getPameranSummary();
    return (
        <div className="rounded-lg p-2 md:p-5 border shadow-lg space-y-5 bg-gradient-to-r from-tanArtBlue-100 to-tanArtBlue-400">
            <p className="text-lg font-semibold text-white">Pameran Pelukis</p>
            <SimpleGrid cols={2} className=" place-items-center">
                {dataResponse.map((item, key) => (
                    <CardItem key={key} title={item.title} value={item.value} />
                ))}
            </SimpleGrid>
        </div>
    );
}
