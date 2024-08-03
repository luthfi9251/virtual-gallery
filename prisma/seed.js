const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");

async function seedPelukisAccount() {
    const email = faker.internet.email({ provider: "pelukis.com" });
    const pelukisAccount = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            username: faker.internet.userName(),
            nama_lengkap: faker.person.fullName(),
            tempat_lhr: faker.location.country(),
            tgl_lhr: new Date().toISOString(),
            role: "USER",
            Seniman: {
                create: {
                    is_verified: true,
                    verified_at: new Date().toISOString(),
                    deskripsi: faker.lorem.sentences({ min: 7, max: 10 }),
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

    return pelukisAccount;
}

async function seedKuratorAccount() {
    const email = faker.internet.email({ provider: "kurator.com" });
    const KuratorAccount1 = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            username: faker.internet.userName(),
            nama_lengkap: faker.person.fullName(),
            tempat_lhr: faker.location.country(),
            tgl_lhr: new Date().toISOString(),
            role: "USER",
            Kurator: {
                create: {
                    is_verified: true,
                    verified_at: new Date().toISOString(),
                    deskripsi: faker.lorem.sentences({ min: 7, max: 10 }),
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
    return KuratorAccount1;
}

async function seedKaryaPelukis({ idPelukis }) {
    let KARYA_SIZE = [
        { width: 600, height: 600 },
        { width: 600, height: 400 },
        { width: 600, height: 750 },
    ];
    let uploadKarya = await prisma.Karya.create({
        data: {
            judul: faker.lorem.sentence(5),
            deskripsi: faker.lorem.sentences({ min: 10, max: 20 }),
            aliran: "sesat",
            media: "canvas",
            teknik: "water painting",
            harga: 50000,
            panjang: 20,
            lebar: 30,
            status: "DIKURASI",
            lukisan_url: faker.image.urlPicsumPhotos(
                faker.helpers.arrayElement(KARYA_SIZE)
            ),
            Seniman: {
                connect: {
                    id: idPelukis,
                },
            },
        },
    });
    return uploadKarya;
}

async function seedKurasiKarya({ idKurator, idKarya }) {
    let addKurasiKarya = await prisma.KurasiKarya.create({
        data: {
            Kurator: {
                connect: {
                    id: idKurator,
                },
            },
            Karya: {
                connect: {
                    id: idKarya,
                },
            },
            komentar: faker.lorem.sentence(),
            harga_maks: 50000,
            harga_min: 0,
        },
    });

    let updateStatusKarya = await prisma.Karya.update({
        where: {
            id: idKarya,
        },
        data: {
            status: "TERKURASI",
        },
    });

    return addKurasiKarya;
}

async function seedPameranPelukis({ idPelukis, idsKarya }) {
    const NAMA_PAMERAN = faker.lorem.words({ min: 2, max: 7 });
    const TODAY = new Date();
    const generateSlugPameran =
        faker.helpers.slugify(NAMA_PAMERAN) + "-" + idPelukis.slice(-6);
    let bukaPameran = await prisma.Pameran.create({
        data: {
            nama_pameran: NAMA_PAMERAN,
            deskripsi: faker.lorem.sentences({ min: 10, max: 20 }),
            banner_url: faker.image.urlPicsumPhotos(),
            sampul_url: faker.image.urlPicsumPhotos(),
            tgl_mulai: new Date().toISOString(),
            tgl_selesai: new Date(
                TODAY.setDate(TODAY.getDate() + 6)
            ).toISOString(),
            slug: generateSlugPameran,
            status: "OPEN",
            Seniman: {
                connect: {
                    id: idPelukis,
                },
            },
            KaryaPameran: {
                create: idsKarya.map((item) => {
                    return {
                        Karya: {
                            connect: {
                                id: item,
                            },
                        },
                    };
                }),
            },
        },
    });
    return bukaPameran;
}

async function templateSeedPelukisAndKaryaSiapPamer(pelukisId, kuratorId) {
    //tambah karya
    let uploadKarya = await seedKaryaPelukis({ idPelukis: pelukisId });

    //kurasi karya
    let addKurasiKarya = await seedKurasiKarya({
        idKurator: kuratorId,
        idKarya: uploadKarya.id,
    });

    let upateHargaPelukis = await prisma.Karya.update({
        where: {
            id: uploadKarya.id,
        },
        data: {
            harga: 5000000,
            status: "SELESAI",
        },
    });

    return { uploadKarya, addKurasiKarya, upateHargaPelukis };
}

async function templateSeedPameranPelukisComplete(count) {
    let pelukisRandom1 = await seedPelukisAccount();
    let kuratorrRandom1 = await seedKuratorAccount();
    const COUNT_KARYA = 5;
    let promKarya = [];
    for (let i = 0; i < COUNT_KARYA; i++) {
        promKarya.push(
            templateSeedPelukisAndKaryaSiapPamer(
                pelukisRandom1.Seniman.id,
                kuratorrRandom1.Kurator.id
            )
        );
    }
    let karyaList = await Promise.all(promKarya);
    let seedPameran = await seedPameranPelukis({
        idPelukis: pelukisRandom1.Seniman.id,
        idsKarya: karyaList.map((item) => item.uploadKarya.id),
    });

    return seedPameran;
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

    for (let i = 0; i < 3; i++) {
        await seedKaryaPelukis({ idPelukis: PelukisAccount1.Seniman.id });
    }

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

    let pelukisRandom1 = await seedPelukisAccount();
    let kuratorrRandom1 = await seedKuratorAccount();

    // let tambahKarya1 = await templateSeedPelukisAndKaryaSiapPamer(
    //     pelukisRandom1.Seniman.id,
    //     kuratorrRandom1.Kurator.id
    // );
    // let tambahKarya2 = await templateSeedPelukisAndKaryaSiapPamer(
    //     pelukisRandom1.Seniman.id,
    //     kuratorrRandom1.Kurator.id
    // );
    // let tambahKarya3 = await templateSeedPelukisAndKaryaSiapPamer(
    //     pelukisRandom1.Seniman.id,
    //     kuratorrRandom1.Kurator.id
    // );

    const COUNT_KARYA = 8;
    let promKarya = [];
    for (let i = 0; i < COUNT_KARYA; i++) {
        promKarya.push(
            templateSeedPelukisAndKaryaSiapPamer(
                pelukisRandom1.Seniman.id,
                kuratorrRandom1.Kurator.id
            )
        );
    }

    let karyaList = await Promise.all(promKarya);
    let seedPameran = await seedPameranPelukis({
        idPelukis: pelukisRandom1.Seniman.id,
        idsKarya: karyaList.map((item) => item.uploadKarya.id),
    });

    let pelukisRandom2 = await templateSeedPameranPelukisComplete();
    let pelukisRandom3 = await templateSeedPameranPelukisComplete();

    console.log({
        AdminAccount,
        PelukisAccount1,
        KuratorAccount1,
        // KuratorAccount2,
        // KuratorAccount3,
    });

    console.log({
        pelukisRandom1,
        kuratorrRandom1,
        seedPameran,
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
