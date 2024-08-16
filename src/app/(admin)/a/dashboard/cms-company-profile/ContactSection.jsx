import { Button, Textarea, TextInput, Title } from "@mantine/core";

export default function ContactSection() {
    return (
        <div className=" p-5 shadow">
            <Title order={3} className="text-tanArtBlue-900 font-black">
                Informasi Kontak
            </Title>
            <form>
                <div className="flex gap-5 flex-col ">
                    <TextInput
                        label="Instagram"
                        description="Tag digunakan untuk menandai item hero"
                        className=""
                    />
                    <TextInput
                        label="X"
                        description="Tag digunakan untuk menandai item hero"
                        className=""
                    />
                    <TextInput
                        label="Gmail"
                        description="Tag digunakan untuk menandai item hero"
                        className=""
                    />
                    <Textarea label="Alamat" withAsterisk rows={4} />
                    <Button className="self-end" type="submit">
                        Tambah
                    </Button>
                </div>
            </form>
        </div>
    );
}
