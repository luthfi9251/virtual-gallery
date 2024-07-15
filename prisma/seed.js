const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    });
    const PelukisAccount2 = await prisma.user.upsert({
        where: { email: "pelukis2@pelukis.com" },
        update: {},
        create: {
            email: "pelukis2@pelukis.com",
            username: "pelukishandal2",
            nama_lengkap: "Pelukis Handal 2",
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
    });
    const KuratorAccount2 = await prisma.user.upsert({
        where: { email: "kurator2@kurator.com" },
        update: {},
        create: {
            email: "kurator2@kurator.com",
            username: "kuratorhandal2",
            nama_lengkap: "Kurator Handal 2",
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
    });
    const KuratorAccount3 = await prisma.user.upsert({
        where: { email: "kurator3@kurator.com" },
        update: {},
        create: {
            email: "kurator3@kurator.com",
            username: "kuratorhandal3",
            nama_lengkap: "Kurator Handal 3",
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
    });
    console.log({
        AdminAccount,
        PelukisAccount1,
        PelukisAccount2,
        KuratorAccount1,
        KuratorAccount2,
        KuratorAccount3,
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
