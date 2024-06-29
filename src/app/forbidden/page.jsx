import Link from "next/link";
export default function Page() {
    return (
        <div>
            <p>Anda tidak memiliki akses ke halaman ini!</p>
            <Link href="/">Kembali ke Home</Link>
        </div>
    );
}
