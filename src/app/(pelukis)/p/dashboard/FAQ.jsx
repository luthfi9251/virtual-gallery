import {
    Container,
    Title,
    Accordion,
    AccordionItem,
    AccordionControl,
    AccordionPanel,
} from "@mantine/core";

const placeholder =
    "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export default function FAQ() {
    return (
        <div className="w-full p-2 md:p-5 rounded shadow-xl mb-5">
            <Title order={4} ta="center" className="mb-5">
                Frequently Asked Questions
            </Title>

            <Accordion variant="separated" className="w-full">
                <AccordionItem className="" value="reset-password">
                    <AccordionControl>
                        Bagaimana cara untuk mengunggah Karya?
                    </AccordionControl>
                    <AccordionPanel>
                        Untuk mengunggah karya, anda dapat menuju halaman Karya
                        melalui menu Karya lalu tekan tombol Tambah. Silahkan
                        pilih foto karya dan masukkan informasi mengenai karya
                        yang akan anda unggah. Setiap karya yang akan diunggah,
                        akan melewati proses kurasi terlebih dahulu oleh para
                        kurator kami. Setelah melalui proses kurasi, maka anda
                        dapat menentukan harga dari karya yang anda unggah.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem className="" value="another-account">
                    <AccordionControl>
                        Bagaimana cara membuka pameran?
                    </AccordionControl>
                    <AccordionPanel>
                        Untuk membuka pameran, anda harus memiliki minimal satu
                        karya yang sudah dalam status "Selesai". Silahkan menuju
                        halaman pameran melalui menu "Pameran" lalu tekan tombol
                        "Buka Pameran". SIlahkan isi informasi pameran dan pilih
                        karya yang akan ditampilkan.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
