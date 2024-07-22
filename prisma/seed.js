const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function templateSeedPelukisAndKaryaSiapPamer(pelukisId, kuratorId) {
    // //generate akun pelukis
    // const PelukisAccount1 = await prisma.user.upsert({
    //     where: { email: "pelukis1@pelukis.com" },
    //     update: {},
    //     create: {
    //         email: "pelukis1@pelukis.com",
    //         username: "pelukishandal1",
    //         nama_lengkap: "Pelukis Handal 1",
    //         tempat_lhr: "Demak",
    //         tgl_lhr: new Date().toISOString(),
    //         role: "USER",
    //         Seniman: {
    //             create: {
    //                 is_verified: true,
    //                 verified_at: new Date().toISOString(),
    //                 deskripsi:
    //                     "saya tidak memiliki pengalamana sebagai pelukis hehehehehhehehhehehhehehehheheh",
    //             },
    //         },
    //         password:
    //             "$2a$10$7DHdR6aHst478sBQyl8.quRLxEHjuUuWgJGSpb7q/V8Ro6zRGyIFa", //passwordadmin
    //     },
    // });

    //tambah karya
    let uploadKarya = await prisma.Karya.create({
        data: {
            judul: "My First Painting",
            deskripsi:
                "Sebuah lukisan pertama saya yang menggambarkan keinfahan sungai",
            aliran: "sesat",
            media: "canvas",
            teknik: "water painting",
            harga: 50000,
            panjang: 20,
            lebar: 30,
            status: "SELESAI",
            lukisan_url: "fecce36d-8854-4d88-991e-cba972d8d465.jpg",
            Seniman: {
                connect: {
                    id: pelukisId,
                },
            },
        },
    });

    //kurasi karya

    //buat akun kurator

    let addKurasiKarya = await prisma.KurasiKarya.create({
        data: {
            Kurator: {
                connect: {
                    id: kuratorId,
                },
            },
            Karya: {
                connect: {
                    id: uploadKarya.id,
                },
            },
            komentar: "lukisan ayng unik dan sangat bagus sekali coyyy",
            harga_maks: 50000,
            harga_min: 0,
        },
    });

    return { uploadKarya, addKurasiKarya };
}

async function main() {
    const AdminAccount = await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            email: "admin@admin.com",
            username: "admin",
            nama_lengkap: "Admin Super",
            tempat_lhr: "Demak",
            tgl_lhr: new Date().toISOString(),
            role: "ADMIN",
            password:
                "$2a$10$7DHdR6aHst478sBQyl8.quRLxEHjuUuWgJGSpb7q/V8Ro6zRGyIFa", //passwordadmin
        },
    });
    const PelukisAccount1 = await prisma.user.upsert({
        where: { email: "pelukis1@pelukis.com" },
        update: {},
        create: {
            email: "pelukis1@pelukis.com",
            username: "pelukishandal1",
            nama_lengkap: "Pelukis Handal 1",
            tempat_lhr: "Demak",
            tgl_lhr: new Date().toISOString(),
            role: "USER",
            Seniman: {
                create: {
                    is_verified: true,
                    verified_at: new Date().toISOString(),
                    deskripsi:
                        "saya tidak memiliki pengalamana sebagai pelukis hehehehehhehehhehehhehehehheheh",
                },
            },
            password:
                "$2a$10$7DHdR6aHst478sBQyl8.quRLxEHjuUuWgJGSpb7q/V8Ro6zRGyIFa", //passwordadmin
        },
        include: {
            Seniman: {
                select: {
                    id: true,
                },
            },
        },
    });
    // const PelukisAccount2 = await prisma.user.upsert({
    //     where: { email: "pelukis2@pelukis.com" },
    //     update: {},
    //     create: {
    //         email: "pelukis2@pelukis.com",
    //         username: "pelukishandal2",
    //         nama_lengkap: "Pelukis Handal 2",
    //         tempat_lhr: "Demak",
    //         tgl_lhr: new Date().toISOString(),
    //         role: "USER",
    //         Seniman: {
    //             create: {
    //                 is_verified: true,
    //                 verified_at: new Date().toISOString(),
    //                 deskripsi:
    //                     "saya tidak memiliki pengalamana sebagai pelukis hehehehehhehehhehehhehehehheheh",
    //             },
    //         },
    //         password:
    //             "$2a$10$7DHdR6aHst478sBQyl8.quRLxEHjuUuWgJGSpb7q/V8Ro6zRGyIFa", //passwordadmin
    //     },
    // });

    const KuratorAccount1 = await prisma.user.upsert({
        where: { email: "kurator1@kurator.com" },
        update: {},
        create: {
            email: "kurator1@kurator.com",
            username: "kuratorhandal1",
            nama_lengkap: "Kurator Handal 1",
            tempat_lhr: "Demak",
            tgl_lhr: new Date().toISOString(),
            role: "USER",
            Kurator: {
                create: {
                    is_verified: true,
                    verified_at: new Date().toISOString(),
                    deskripsi:
                        "saya tidak memiliki pengalamana sebagai kurator hehehehehhehehhehehhehehehheheh",
                },
            },
            password:
                "$2a$10$7DHdR6aHst478sBQyl8.quRLxEHjuUuWgJGSpb7q/V8Ro6zRGyIFa", //passwordadmin
        },
        include: {
            Kurator: {
                select: {
                    id: true,
                },
            },
        },
    });
    // const KuratorAccount2 = await prisma.user.upsert({
    //     where: { email: "kurator2@kurator.com" },
    //     update: {},
    //     create: {
    //         email: "kurator2@kurator.com",
    //         username: "kuratorhandal2",
    //         nama_lengkap: "Kurator Handal 2",
    //         tempat_lhr: "Demak",
    //         tgl_lhr: new Date().toISOString(),
    //         role: "USER",
    //         Kurator: {
    //             create: {
    //                 is_verified: true,
    //                 verified_at: new Date().toISOString(),
    //                 deskripsi:
    //                     "saya tidak memiliki pengalamana sebagai kurator hehehehehhehehhehehhehehehheheh",
    //             },
    //         },
    //         password:
    //             "$2a$10$7DHdR6aHst478sBQyl8.quRLxEHjuUuWgJGSpb7q/V8Ro6zRGyIFa", //passwordadmin
    //     },
    // });
    // const KuratorAccount3 = await prisma.user.upsert({
    //     where: { email: "kurator3@kurator.com" },
    //     update: {},
    //     create: {
    //         email: "kurator3@kurator.com",
    //         username: "kuratorhandal3",
    //         nama_lengkap: "Kurator Handal 3",
    //         tempat_lhr: "Demak",
    //         tgl_lhr: new Date().toISOString(),
    //         role: "USER",
    //         Kurator: {
    //             create: {
    //                 is_verified: true,
    //                 verified_at: new Date().toISOString(),
    //                 deskripsi:
    //                     "saya tidak memiliki pengalamana sebagai kurator hehehehehhehehhehehhehehehheheh",
    //             },
    //         },
    //         password:
    //             "$2a$10$7DHdR6aHst478sBQyl8.quRLxEHjuUuWgJGSpb7q/V8Ro6zRGyIFa", //passwordadmin
    //     },
    // });

    let tambahKarya = await templateSeedPelukisAndKaryaSiapPamer(
        PelukisAccount1.Seniman.id,
        KuratorAccount1.Kurator.id
    );

    console.log({
        AdminAccount,
        PelukisAccount1,
        // PelukisAccount2,
        KuratorAccount1,
        tambahKarya,
        // KuratorAccount2,
        // KuratorAccount3,
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
