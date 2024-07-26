import { Title } from "@mantine/core";
import CardWrapper from "./CardWrapper";

export default function BioSection({ data }) {
    return (
        <CardWrapper>
            <Title order={3}>Bio</Title>
            <p className="text-sm font-light mt-3 cursor-default">{data.bio}</p>
        </CardWrapper>
    );
}
