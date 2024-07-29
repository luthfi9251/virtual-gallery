"use client";
import { Title, Textarea } from "@mantine/core";
import CardWrapper from "../CardWrapper";
import { useProfileFormContext } from "./ProfileProvider";

export default function BioEditSection() {
    const form = useProfileFormContext();
    return (
        <CardWrapper>
            <Title order={3}>Bio</Title>
            <Textarea
                className="mt-3"
                rows={4}
                placeholder="Deskripsikan diri anda"
                key={form.key("bio")}
                {...form.getInputProps("bio")}
            />
        </CardWrapper>
    );
}
