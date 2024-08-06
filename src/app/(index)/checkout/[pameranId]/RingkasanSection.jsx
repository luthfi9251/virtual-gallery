"use client";
import { formatToRupiah } from "@/lib/formatter";
import { Button, Checkbox, Stack, Title } from "@mantine/core";
import { useCheckouFormContext } from "./ChekoutProvider";
import { useMemo } from "react";

export default function RingkasanSection({ data }) {
    const form = useCheckouFormContext();
    const formValue = form.getValues("isProvideRightData");
    const computeDisabled = useMemo(
        () => !(formValue.isKnowAlurPembelian && formValue.isProvideRightData),
        [formValue.isKnowAlurPembelian, formValue.isProvideRightData]
    );
    return (
        <div className="flex flex-col gap-8 p-3 border border-black rounded">
            <Title order={4}>Ringkasan Pesan</Title>
            <Stack>
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-sm">Karya</p>
                    <p className="text-3xl font-light">
                        {data?.dataKarya?.judul}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-sm">Pameran</p>
                    <p className="text-3xl font-light">
                        {data?.dataPameran?.nama_pameran}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-sm">Total</p>
                    <p className="text-3xl font-light">
                        {formatToRupiah(data?.dataKarya?.harga)}
                    </p>
                </div>
            </Stack>
            <div className="flex flex-col gap-2">
                <Checkbox
                    size="xs"
                    label={
                        <span className="font-bold ">
                            Saya telah memahami alur pembelian karya pada
                            TanArtspace
                        </span>
                    }
                    {...form.getInputProps("isKnowAlurPembelian")}
                    key={form.key("isKnowAlurPembelian")}
                />
                <Checkbox
                    size="xs"
                    label={
                        <span className="font-bold ">
                            Saya telah mengisi data pembeli dengan benar
                        </span>
                    }
                    {...form.getInputProps("isProvideRightData")}
                    key={form.key("isProvideRightData")}
                />
            </div>
            <Button disabled={computeDisabled} type="submit">
                Pesan Karya
            </Button>
        </div>
    );
}
