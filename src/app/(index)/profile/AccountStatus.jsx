import { Title, Text } from "@mantine/core";
import CardWrapper from "./CardWrapper";

const StatusWrapper = ({ data, type }) => {
    return (
        <div className=" border-[1px] p-2 rounded flex justify-between items-center shadow-md">
            <div>
                <Text className="font-medium text-sm">
                    Pengajuan Akun {type === "SENIMAN" ? "Pelukis" : "Kurator"}
                </Text>
                <Text className="text-xs font-light flex items-center gap-2">
                    22 Juli 2024{" "}
                    <span className="w-1 h-1 rounded-[50%] inline-block bg-black"></span>{" "}
                    10.55 WIB
                </Text>
            </div>
            {data.is_verified ? (
                <Text className="text-white bg-tanArt-green py-2 px-8 cursor-default text-xs font-semibold rounded">
                    Disetujui
                </Text>
            ) : (
                <Text className="text-white bg-tanArt-grey py-2 px-8 cursor-default text-xs font-semibold rounded">
                    Pending
                </Text>
            )}
        </div>
    );
};

export default function AccountStatus({ data }) {
    return (
        <CardWrapper>
            <Title order={3}>Pengajuan Akun</Title>
            <div className="mt-3 space-y-3">
                {data.kurator && (
                    <StatusWrapper type="KURATOR" data={data.kurator} />
                )}
                {data.seniman && (
                    <StatusWrapper type="SENIMAN" data={data.seniman} />
                )}
            </div>
        </CardWrapper>
    );
}
