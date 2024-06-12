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
    Skeleton,
    Text,
    UnstyledButton,
    rem,
    Avatar,
    NavLink,
} from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { FaChevronRight, FaPaintbrush, FaClipboardList } from "react-icons/fa6";
import { FaHome, FaPenFancy } from "react-icons/fa";

let NAV_DATA = [
    {
        label: (
            <Text fz="md" fw="500">
                Dashboard
            </Text>
        ),
        href: "#",
        leftSection: <FaHome size="1rem" stroke={1.5} />,
    },
    {
        label: (
            <Text fz="md" fw="500">
                Verfikasi Akun
            </Text>
        ),
        href: "#",
        leftSection: <FaClipboardList size="1rem" stroke={1.5} />,
        children: [
            {
                label: (
                    <Text fz="md" fw="400">
                        Pelukis
                    </Text>
                ),
                href: "/dashboard/pelukis",
                leftSection: <FaPaintbrush size="1rem" stroke={1.5} />,
            },
            {
                label: (
                    <Text fz="md" fw="400">
                        Kurator
                    </Text>
                ),
                href: "#",
                leftSection: <FaPenFancy size="1rem" stroke={1.5} />,
            },
        ],
    },
];

export default function Sidebar({ children }) {
    const [opened, { toggle }] = useDisclosure();

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
                    {/* <MantineLogo size={30} /> */}
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
                    {NAV_DATA.map((item, index) => {
                        return (
                            <NavLink
                                key={index}
                                my="3"
                                component={Link}
                                href={item.href}
                                label={item.label}
                                leftSection={item.leftSection}
                            >
                                {item.children
                                    ? item.children.map((item2, index2) => (
                                          <NavLink
                                              active={index2 == 0}
                                              key={index2}
                                              my="3"
                                              href={item2.href}
                                              label={item2.label}
                                              leftSection={item2.leftSection}
                                              component={Link}
                                          />
                                      ))
                                    : null}
                            </NavLink>
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
