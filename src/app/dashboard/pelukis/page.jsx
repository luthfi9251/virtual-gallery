import { Title, Container, Space } from "@mantine/core";
import DataTable from "./DataTable";

let DATA_VERIF = [
    {
        nama_lengkap: "Muhammad Luthfi",
        email: "luthfi@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: false,
        deskripsi:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nihil eveniet, ratione deleniti mollitia architecto doloribus numquam reprehenderit delectus libero?",
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
    {
        nama_lengkap: "Robby Hairdryer",
        email: "Robby@irfan.com",
        tgl_pengajuan: new Date().toLocaleString(),
        is_verified: true,
    },
];

export default function Page() {
    return (
        <Container fluid>
            <Title order={2}>Verifikasi Pelukis</Title>
            <Space h="xl" />
            <DataTable records={DATA_VERIF} />
        </Container>
    );
}
