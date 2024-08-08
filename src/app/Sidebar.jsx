"use client";
import {
    AppShell,
    AppShellHeader,
    AppShellNavbar,
    AppShellMain,
    AppShellSection,
    ScrollArea,
    Burger,
    Group,
    Stack,
    Text,
    UnstyledButton,
    rem,
    Avatar,
    NavLink,
} from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { FaChevronRight, FaPaintbrush, FaClipboardList } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import { profileLoaderFotoProfil } from "@/loader/imageLoader";
import AvatarNavbar from "@/components/AvatarNavbar";

export default function Sidebar({ children, navData, session }) {
    const [opened, { toggle, close }] = useDisclosure();
    const pathname = usePathname();
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

    useEffect(() => {
        close();
    }, [pathname]);

    return (
        <AppShell
            layout="alt"
            header={{ height: { base: 60, md: 0, lg: 0 } }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
            color="myColor"
        >
            <AppShellHeader hiddenFrom="md">
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                </Group>
            </AppShellHeader>
            <AppShellNavbar>
                <AppShellSection p="sm" bg={"white"} className=" border-b-2">
                    <Group>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Image
                            src="/tanart-logo.png"
                            width={50}
                            height={50}
                            alt="Logo"
                        />
                        <Text
                            size="md"
                            fw="bold"
                            color="myColor"
                            className=" cursor-default"
                        >
                            Tan Artspace
                        </Text>
                    </Group>
                </AppShellSection>
                <AppShellSection p="md" grow component={ScrollArea}>
                    {navData.map((item, index) => {
                        return (
                            <Stack gap="0" my="sm" key={index}>
                                {item.group && (
                                    <Text
                                        size="sm"
                                        px="md"
                                        fw={300}
                                        className=" cursor-default"
                                    >
                                        {item.group}
                                    </Text>
                                )}
                                {item.link.map((item1, index1) => {
                                    return (
                                        <NavLink
                                            key={index1}
                                            h="3rem"
                                            my="3"
                                            active={pathname == item1.href}
                                            data-cy={`nav-parent-${item1.label}`}
                                            component={Link}
                                            href={item1.href}
                                            label={item1.label}
                                            leftSection={item1.leftSection}
                                            className="rounded data-[active=true]:bg-tanArtBlue-900 data-[active=true]:text-white text-tanArtBlue-900"
                                        >
                                            {item1.children
                                                ? item1.children.map(
                                                      (item2, index2) => (
                                                          <NavLink
                                                              active={
                                                                  pathname ==
                                                                  item2.href
                                                              }
                                                              key={index2}
                                                              my="3"
                                                              href={item2.href}
                                                              data-cy={`nav-to-${item2.label}`}
                                                              label={
                                                                  item2.label
                                                              }
                                                              leftSection={
                                                                  item2.leftSection
                                                              }
                                                              component={Link}
                                                              className="rounded data-[active=true]:bg-tanArtBlue-900 data-[active=true]:text-white text-tanArtBlue-900"
                                                          />
                                                      )
                                                  )
                                                : null}
                                        </NavLink>
                                    );
                                })}
                            </Stack>
                        );
                    })}
                </AppShellSection>
                <AppShellSection p="md">
                    {session?.user && (
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
                    )}
                </AppShellSection>
            </AppShellNavbar>
            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}
