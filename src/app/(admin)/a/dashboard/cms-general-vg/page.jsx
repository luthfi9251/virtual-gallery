import { Container, Space, Stack, Title, Spoiler, Button } from "@mantine/core";
import CaraPembayaran from "./CaraPembayaranSection";
import CardText from "./CardText";
import { URL_TANART } from "@/variables/url";
import { MODE_EDIT } from "./edit/page";

async function getData() {
    const RICH_TEXT_HTML_PREFIX = "RICH_TEXT_HTML_PREFIX";
    let textEditorData = await prisma.CMSPageVariable.findMany({
        where: {
            tag: {
                startsWith: RICH_TEXT_HTML_PREFIX,
            },
        },
        select: {
            tag: true,
            value: true,
        },
    });

    return textEditorData.map((item) => {
        return {
            ...item,
            tag: item.tag.replace("RICH_TEXT_HTML_PREFIX_", ""),
        };
    });
}

export default async function Page() {
    let data = await getData();
    return (
        <Container fluid>
            <Title order={2}>CMS</Title>
            <Space h="xl" />
            <Stack gap="xl">
                <CardText
                    href={URL_TANART.ADMIN_CMS_VIRTUAL_GENERAL_EDIT(
                        MODE_EDIT.ALUR_PEMBELIAN
                    )}
                    tag={MODE_EDIT.ALUR_PEMBELIAN}
                    content={
                        data.find(
                            (item) => item.tag === MODE_EDIT.ALUR_PEMBELIAN
                        )?.value || ""
                    }
                />
                <CardText
                    href={URL_TANART.ADMIN_CMS_VIRTUAL_GENERAL_EDIT(
                        MODE_EDIT.CARA_PEMBAYARAN
                    )}
                    tag={MODE_EDIT.CARA_PEMBAYARAN}
                    content={
                        data.find(
                            (item) => item.tag === MODE_EDIT.CARA_PEMBAYARAN
                        )?.value || ""
                    }
                />
                <CardText
                    href={URL_TANART.ADMIN_CMS_VIRTUAL_GENERAL_EDIT(
                        MODE_EDIT.NOMOR_REKENING
                    )}
                    tag={MODE_EDIT.NOMOR_REKENING}
                    content={
                        data.find(
                            (item) => item.tag === MODE_EDIT.NOMOR_REKENING
                        )?.value || ""
                    }
                />
            </Stack>
        </Container>
    );
}
