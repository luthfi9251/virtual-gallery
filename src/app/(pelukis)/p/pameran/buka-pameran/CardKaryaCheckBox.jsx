import {
    Checkbox,
    CheckboxCard,
    CheckboxIndicator,
    Group,
    CardSection,
    Card,
    Stack,
    Text,
    Button,
} from "@mantine/core";
import Image from "next/image";
import { karyaImageLoader } from "@/loader/imageLoader";
import { AvatarProfileSmall } from "@/components/AvatarNavbar";

export default function CardKaryaCheckBox({ data }) {
    return (
        <CheckboxCard
            value={data.id}
            radius="md"
            className="w-full hover:scale-105 hover:z-10 transition-all"
        >
            <Card shadow="sm" padding="lg" radius="md" className="h-full">
                <CardSection className="relative aspect-square">
                    <Image
                        src={data.lukisan_url}
                        loader={karyaImageLoader}
                        quality={30}
                        alt="card-karya"
                        objectFit="cover"
                        fill
                    />
                    <CheckboxIndicator className="absolute top-2 right-2" />
                </CardSection>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{data.judul}</Text>
                </Group>

                <Text size="sm" c="dimmed" className="line-clamp-2 h-full">
                    {data.deskripsi}
                </Text>
            </Card>
        </CheckboxCard>
    );
}

export function CardKaryaCheckBoxV2({ data }) {
    return (
        <CheckboxCard
            value={data.id}
            radius="md"
            className="w-full hover:scale-105 hover:z-10 transition-all"
        >
            <Card shadow="sm" padding="lg" radius="md" className="h-full">
                <CardSection className="relative">
                    <Image
                        width={300}
                        height={300}
                        src={data.lukisan_url}
                        loader={karyaImageLoader}
                        quality={30}
                        alt="card-karya"
                        className="w-full object-cover aspect-square"
                    />
                    <CheckboxIndicator className="absolute top-2 right-2" />
                </CardSection>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{data.judul}</Text>
                </Group>
                <Group className="overflow-hidden">
                    <AvatarProfileSmall size={15} src={data?.foto_profil} />
                    <Text className="text-sm">{data?.nama_seniman}</Text>
                </Group>
            </Card>
        </CheckboxCard>
    );
}
