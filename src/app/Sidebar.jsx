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
import { useEffect } from "react";

export default function Sidebar({ children, navData }) {
    const [opened, { toggle, close }] = useDisclosure();
    const pathname = usePathname();

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
                    <Text>LOGO TANART</Text>
                </Group>
            </AppShellHeader>
            <AppShellNavbar>
                <AppShellSection p="md" bg={"white"} className=" border-b-2">
                    <Group>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Text>LOGO TANART</Text>
                    </Group>
                </AppShellSection>
                <AppShellSection p="md" grow component={ScrollArea}>
                    {navData.map((item, index) => {
                        return (
                            <Stack gap="0" my="sm">
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
                    <UnstyledButton w="100%">
                        <Group>
                            <Avatar
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                                radius="xl"
                            />

                            <div style={{ flex: 1 }}>
                                <Text
                                    size="sm"
                                    fw={500}
                                    className=" cursor-default"
                                >
                                    Harriette Spoonlicker
                                </Text>

                                <Text
                                    c="dimmed"
                                    size="xs"
                                    className=" cursor-default"
                                >
                                    hspoonlicker@outlook.com
                                </Text>
                            </div>

                            <FaChevronRight
                                style={{ width: rem(14), height: rem(14) }}
                                stroke={1.5}
                            />
                        </Group>
                    </UnstyledButton>
                </AppShellSection>
            </AppShellNavbar>
            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}
