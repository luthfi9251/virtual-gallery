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

async function getSummaryUser() {
    let session = await auth();

    if (session.user?.Seniman) {
        let userCount = prisma.user.count();
        let senimanCount = prisma.Seniman.count();
        let kuratorCount = prisma.Kurator.count();

        let result = await Promise.all([userCount, senimanCount, kuratorCount]);
        return [
            {
                title: "Total User",
                value: result[0],
                className: "",
            },
            {
                title: "Total Pelukis",
                value: result[1],
                className: "",
            },
            {
                title: "Total Kurator",
                value: result[2],
                className: "",
            },
        ];
    } else {
        return [
            {
                title: "Total User",
                value: 0,
                className: "",
            },
            {
                title: "Total Pelukis",
                value: 0,
                className: "",
            },
            {
                title: "Total Kurator",
                value: 0,
                className: "",
            },
        ];
    }
}

export default async function UserSummary() {
    let dataResponse = await getSummaryUser();
    return (
        <div className="rounded-lg p-2 md:p-5 border shadow-lg space-y-5 bg-gradient-to-r from-indigo-500 to-sky-200">
            <p className="text-lg font-semibold text-white">User</p>
            <SimpleGrid
                cols={{ base: 2, md: 3 }}
                className=" place-items-center"
            >
                {dataResponse.map((item, key) => (
                    <CardItem key={key} title={item.title} value={item.value} />
                ))}
            </SimpleGrid>
        </div>
    );
}
