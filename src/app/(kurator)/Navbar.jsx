"use client";
import {
    AppShell,
    AppShellHeader,
    AppShellNavbar,
    AppShellMain,
    AppShellSection,
    Burger,
    Group,
    UnstyledButton,
    Text,
    Image,
    Flex,
    Button,
    Box,
    Stack,
} from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { Avatar } from "@mantine/core";
import AvatarNavbar from "@/components/AvatarNavbar";
import { useMemo } from "react";
import myImageLoader, { profileLoaderFotoProfil } from "@/loader/imageLoader";

function NavItem({ href, title }) {
    return (
        <Link
            href={href}
            className="md:h-full text-sm font-bold hover:bg-tanArtBlue-800 hover:text-white duration-200 transition p-2 rounded-sm"
        >
            {title}
        </Link>
    );
}

export default function Navbar({ children, session }) {
    const [opened, { toggle }] = useDisclosure();
    const imageUrl = useMemo(
        () => session?.user?.foto_profil || null,
        [session]
    );
    const roleAccess = useMemo(() => {
        return {
            admin: session?.user.role === "ADMIN",
            pelukis: session?.user.Seniman?.is_verified,
            kurator: session?.user.Kurator?.is_verified,
        };
    }, [session]);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { desktop: true, mobile: !opened },
            }}
            padding="md"
        >
            <AppShellHeader>
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Flex className="md:w-full items-center">
                        <Link href="/" className=" w-48">
                            <Group className=" font-bold text-tanArtBlue-600">
                                <Image
                                    component={NextImage}
                                    src="/tanart-logo.png"
                                    alt="Logo"
                                    width={35}
                                    height={35}
                                />
                                Tan Artspace
                            </Group>
                        </Link>
                        <Group
                            ml="xl"
                            gap="lg"
                            visibleFrom="sm"
                            className="grow"
                        >
                            <span></span>
                        </Group>
                        {/* <AvatarNavbar /> */}
                        <Box visibleFrom="sm">
                            {session?.user ? (
                                <AvatarNavbar
                                    namaLengkap={session?.user.nama_lengkap}
                                    email={session?.user.email}
                                    profilePicture={imageUrl}
                                    isMobile={false}
                                    isAdmin={roleAccess.admin}
                                    isKurator={roleAccess.kurator}
                                    isPelukis={roleAccess.pelukis}
                                />
                            ) : (
                                <Link href="/login">
                                    <Button>Masuk</Button>
                                </Link>
                            )}
                        </Box>
                    </Flex>
                </Group>
            </AppShellHeader>

            <AppShellNavbar py="md" px={4}>
                <AppShellSection grow>
                    <Stack gap="sm" className="h-full w-full"></Stack>
                </AppShellSection>
                <AppShellSection px="md">
                    {session?.user ? (
                        <UnstyledButton w="100%">
                            <Group>
                                <Avatar
                                    src={
                                        imageUrl
                                            ? profileLoaderFotoProfil({
                                                  src: imageUrl,
                                              })
                                            : "/EMPTY_USER_PROFILE.png"
                                    }
                                    radius="xl"
                                />

                                <div style={{ flex: 1 }}>
                                    <Text
                                        size="sm"
                                        fw={500}
                                        className=" cursor-default"
                                    >
                                        {session?.user.nama_lengkap}
                                    </Text>

                                    <Text
                                        c="dimmed"
                                        size="xs"
                                        className=" cursor-default"
                                    >
                                        {session?.user.email}
                                    </Text>
                                </div>
                                <AvatarNavbar
                                    namaLengkap={session?.user.nama_lengkap}
                                    email={session?.user.email}
                                    profilePicture={imageUrl}
                                    isMobile={true}
                                    isAdmin={roleAccess.admin}
                                    isKurator={roleAccess.kurator}
                                    isPelukis={roleAccess.pelukis}
                                />
                            </Group>
                        </UnstyledButton>
                    ) : (
                        <Link href="/login">
                            <Button>Masuk</Button>
                        </Link>
                    )}
                </AppShellSection>
            </AppShellNavbar>

            <AppShellMain className="px-0 md:px-4">{children}</AppShellMain>
        </AppShell>
    );
}
