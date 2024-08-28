import { Container, Text } from "@mantine/core";
import CaraPembayaran from "../CaraPembayaranSection";
import prisma from "@/lib/prisma";

export const MODE_EDIT = {
    ALUR_PEMBELIAN: "ALUR_PEMBELIAN",
    CARA_PEMBAYARAN: "CARA_PEMBAYARAN",
    NOMOR_REKENING: "NOMOR_REKENING",
};

async function getData(mode) {
    const RICH_TEXT_HTML_PREFIX = "RICH_TEXT_HTML_PREFIX";
    let textEditorData = await prisma.CMSPageVariable.findUnique({
        where: {
            tag: `${RICH_TEXT_HTML_PREFIX}_${mode}`,
        },
        select: {
            tag: true,
            value: true,
        },
    });

    return textEditorData;
}

export default async function Page(props) {
    let paramsMode = props.searchParams.mode;
    if (Object.values(MODE_EDIT).includes(paramsMode)) {
        let data = await getData(paramsMode);
        return (
            <Container fluid>
                <CaraPembayaran mode={paramsMode} content={data?.value || ""} />
            </Container>
        );
    } else {
        return <Text>Mode tidak sesuai!</Text>;
    }
}
