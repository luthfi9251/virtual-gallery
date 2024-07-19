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

export default function CardKaryaCheckBox({ data }) {
    return (
        <CheckboxCard
            value={data.id}
            radius="md"
            className="w-full hover:scale-105 hover:z-10 transition-all"
        >
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <CardSection className="relative aspect-square">
                    <Image
                        src={data.lukisan_url}
                        loader={karyaImageLoader}
                        alt="Norway"
                        objectFit="cover"
                        fill
                    />
                    <CheckboxIndicator className="absolute top-2 right-2" />
                </CardSection>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{data.judul}</Text>
                </Group>

                <Text size="sm" c="dimmed" className="line-clamp-2">
                    {data.deskripsi}
                </Text>
            </Card>
        </CheckboxCard>
    );
}
