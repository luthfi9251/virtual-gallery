"use client";

import {
    Title,
    Stack,
    Text,
    Group,
    NumberFormatter,
    Spoiler,
} from "@mantine/core";
import BaseModalKarya from "@/components/BaseModalKarya";
import { useQuery } from "@tanstack/react-query";
import { getKaryaByID } from "@/actions/karya";
import { AvatarProfileSmall } from "@/components/AvatarNavbar";

export default function ModalDetailKarya({ disclosure, karyaId }) {
    const [opened, { open, close }] = disclosure;
    const { data, isLoading } = useQuery({
        queryKey: ["karya_by_id", karyaId],
        queryFn: async () => {
            if (karyaId) {
                let response = await getKaryaByID(karyaId);
                if (!response.isError) {
                    return response.data;
                } else {
                    throw response.error;
                }
            }
        },
        staleTime: 1000 * 60 * 1,
    });

    return (
        <BaseModalKarya
            disclosure={disclosure}
            imageSrc={data?.lukisan_url}
            isLoading={isLoading}
        >
            <Stack gap="xs">
                <Group>
                    <AvatarProfileSmall size="xs" src={data?.foto_profil} />
                    <Text className="text-sm">{data?.nama_lengkap}</Text>
                </Group>
                <Title className="font-medium text-lg md:text-2xl xl:text-4xl">
                    {data?.judul}
                </Title>
                <Spoiler
                    maxHeight={100}
                    className="font-light text-sm xl:text-md"
                    showLabel={<p className="text-xs">Show More</p>}
                    hideLabel={<p className="text-xs">Hide</p>}
                >
                    {data?.deskripsi}
                </Spoiler>
                <div>
                    <p className="text-sm md:text-md font-extralight">
                        Tahun : {new Date(data?.created_at).getFullYear()}
                    </p>
                    <p className="text-sm md:text-md font-extralight">
                        {data?.teknik}
                    </p>
                    <p className="text-sm md:text-md font-extralight">
                        {data?.panjang}x{data?.lebar} cm
                    </p>
                </div>
                <p className="font-medium text-lg md:text-2xl xl:text-4xl">
                    <NumberFormatter
                        prefix="Rp. "
                        value={data?.harga}
                        thousandSeparator="."
                        decimalSeparator=","
                    />
                </p>
            </Stack>
        </BaseModalKarya>
    );
}
