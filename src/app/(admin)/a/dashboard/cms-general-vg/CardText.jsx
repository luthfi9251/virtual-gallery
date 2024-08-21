import HTMLInjector from "@/components/HTMLInjector";
import { Button, Spoiler, Title } from "@mantine/core";
import Link from "next/link";

export default function CardText({ tag = "", content, href = "#" }) {
    return (
        <div className="p-5 shadow flex flex-col gap-3">
            <Title order={4}>{tag.replace("_", " ")}</Title>
            <Spoiler showLabel="Show more" hideLabel="Hide">
                <HTMLInjector content={content} />
            </Spoiler>
            <Button className="self-start" component={Link} href={href}>
                Ubah
            </Button>
        </div>
    );
}
