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
    const PelukisAccount = await prisma.user.upsert({
        where: { email: "pelukis@pelukis.com" },
        update: {},
        create: {
            email: "pelukis@pelukis.com",
            username: "pelukishandal",
            nama_lengkap: "Pelukis Handal",
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
    const KuratorAccount = await prisma.user.upsert({
        where: { email: "kurator@kurator.com" },
        update: {},
        create: {
            email: "kurator@kurator.com",
            username: "kuratorhandal",
            nama_lengkap: "Kurator Handal",
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
    console.log({ AdminAccount, PelukisAccount, KuratorAccount });
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
