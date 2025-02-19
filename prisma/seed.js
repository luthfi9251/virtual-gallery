const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

function hashPassword(string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(string, salt);
}

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

async function seedVirtualGalleryLandingPageData(idAdmin) {
    // /300x375/fe310b00-1eda-449c-bab7-a587ea412507.jpeg
    const TAG_CMS_VIRTUAL_GALLERY = {
        JUMLAH_KURATOR: 40,
        JUMLAH_PELUKIS: 20,
        NAMA_FEATURED_KURATOR: "Melanie",
        NAMA_FEATURED_PELUKIS: "Ahmad Sukri",
        BIO_FEATURED_KURATOR:
            "Telah mengkurasi berbagai karya lukisan dengan keahlian yang tajam dan sentuhan artistik, menyusun pameran yang tidak hanya menginspirasi, tetapi juga memberikan perspektif baru bagi para penikmat seni.",
        BIO_FEATURED_PELUKIS:
            "Seorang seniman produktif yang telah menghasilkan berbagai karya lukisan, masing-masing menampilkan keunikan dan kedalaman visi kreatifnya, serta mampu menyentuh hati dan pikiran banyak orang.",
        FOTO_FEATURED_PELUKIS:
            "https://res.cloudinary.com/dwsf7qb6y/image/upload/c_thumb,w_200,g_face/v1739969633/tanart/uhgblewx97gohdsl0ois.jpg",
        FOTO_FEATURED_KURATOR:
            "https://res.cloudinary.com/dwsf7qb6y/image/upload/c_thumb,w_200,g_face/v1739969631/tanart/lvvlvjukw1sypythsp2q.png",
    };
    const PAGE_GROUP = "CMS_VIRTUAL_GALLERY";
    let tagList = Object.keys(TAG_CMS_VIRTUAL_GALLERY);
    let prismaPromList = tagList.map((item) => {
        return prisma.cMSPageVariable.upsert({
            where: {
                tag: item,
            },
            update: {
                value: "" + TAG_CMS_VIRTUAL_GALLERY[item],
                page_group: PAGE_GROUP,
                UpdatedBy: {
                    connect: {
                        id: idAdmin,
                    },
                },
            },
            create: {
                tag: item,
                value: "" + TAG_CMS_VIRTUAL_GALLERY[item],
                page_group: PAGE_GROUP,
                UpdatedBy: {
                    connect: {
                        id: idAdmin,
                    },
                },
            },
        });
    });

    let result = await Promise.all(prismaPromList);
    return result;
}

async function main() {
    const PASSWORD_ADMIN = process.env.SUPER_ADMIN_PASSWORD || "passwordadmin";
    const EMAIL_ADMIN = process.env.SUPER_ADMIN_EMAIL || "admin@admin.com";
    const AdminAccount = await prisma.user.upsert({
        where: { email: EMAIL_ADMIN },
        update: {},
        create: {
            email: EMAIL_ADMIN,
            username: "admin",
            nama_lengkap: "Super Admin",
            tempat_lhr: "Demak",
            tgl_lhr: new Date().toISOString(),
            role: "ADMIN",
            password: hashPassword(PASSWORD_ADMIN), //passwordadmin
            Seniman: {
                create: {
                    is_verified: true,
                    verified_at: new Date().toISOString(),
                    deskripsi:
                        "saya tidak memiliki pengalamana sebagai pelukis hehehehehhehehhehehhehehehheheh",
                },
            },
            Kurator: {
                create: {
                    is_verified: true,
                    verified_at: new Date().toISOString(),
                    deskripsi:
                        "saya tidak memiliki pengalamana sebagai kurator hehehehehhehehhehehhehehehheheh",
                },
            },
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

    await seedVirtualGalleryLandingPageData(AdminAccount.id);

    if (process.env.USE_DUMMY_DATA === "true") {
        for (let i = 0; i < 6; i++) {
            await seedKaryaPelukis({ idPelukis: PelukisAccount1.Seniman.id });
        }

        let pelukisRandom1 = await seedPelukisAccount();
        let kuratorrRandom1 = await seedKuratorAccount();

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
    }

    console.log({
        AdminAccount,
        PelukisAccount1,
        KuratorAccount1,
        // KuratorAccount2,
        // KuratorAccount3,
    });

    // console.log({
    //     pelukisRandom1,
    //     kuratorrRandom1,
    //     seedPameran,
    // });
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
