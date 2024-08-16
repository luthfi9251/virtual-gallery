import { Button, Title } from "@mantine/core";
import Image from "next/image";

export default function GallerySection() {
    return (
        <div className=" p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black">
                Gallery
            </Title>
            <div className="w-full grid md:grid-cols-5 grid-rows-2 p-5 gap-5">
                <div className="group bg-red-300 md:col-span-3 md:row-span-2 relative">
                    <div className=" backdrop-blur-sm group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                        <Button>Ubah Gambar</Button>
                    </div>
                    <Image fill src="/bg-login.jpg" className="object-cover" />
                </div>
                <div className="group bg-red-500 md:col-span-2 aspect-video relative">
                    <div className=" backdrop-blur-sm group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                        <Button>Ubah Gambar</Button>
                    </div>
                    <Image fill src="/bg-login.jpg" className="object-cover" />
                </div>
                <div className="group bg-red-600 md:col-span-2 aspect-video relative">
                    <div className=" backdrop-blur-sm group-hover:opacity-100 flex transition-all opacity-0 absolute top-0 z-20 inset-0  justify-center items-center">
                        <Button>Ubah Gambar</Button>
                    </div>
                    <Image fill src="/bg-login.jpg" className="object-cover" />
                </div>
            </div>
        </div>
    );
}
