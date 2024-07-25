import { Title, Textarea } from "@mantine/core";
import CardWrapper from "../CardWrapper";

export default function BioEditSection() {
    return (
        <CardWrapper>
            <Title order={3}>Bio</Title>
            <Textarea
                className="mt-3"
                rows={4}
                placeholder="Deskripsikan diri anda"
            />
        </CardWrapper>
    );
}
