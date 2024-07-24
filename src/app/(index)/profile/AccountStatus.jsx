import { Title, Text } from "@mantine/core";

const StatusWrapper = ({ status, color }) => {
    return (
        <div className=" border-[1px] p-2 rounded flex justify-between items-center shadow-md">
            <div>
                <Text className="font-medium">Pengajuan Akun Pelukis</Text>
                <Text className="text-xs font-light flex items-center gap-2">
                    22 Juli 2024{" "}
                    <span className="w-1 h-1 rounded-[50%] inline-block bg-black"></span>{" "}
                    10.55 WIB
                </Text>
            </div>
            {color === "GREY" ? (
                <Text className="text-white bg-tanArt-grey py-2 px-8 cursor-default text-xs font-semibold rounded">
                    {status}
                </Text>
            ) : (
                <Text className="text-white bg-tanArt-green py-2 px-8 cursor-default text-xs font-semibold rounded">
                    {status}
                </Text>
            )}
        </div>
    );
};

export default function AccountStatus() {
    return (
        <div className="w-full rounded-lg shadow-lg p-10">
            <Title order={3}>Pengajuan Akun</Title>
            <div className="mt-3 space-y-3">
                <StatusWrapper status="Pending" color="GREY" />
                <StatusWrapper status="Disetujui" />
            </div>
        </div>
    );
}
