"use client";
import {
    AppShell,
    AppShellHeader,
    AppShellNavbar,
    AppShellMain,
    Burger,
    Group,
    UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function NavLink() {
    return (
        <>
            <UnstyledButton>Home</UnstyledButton>
            <UnstyledButton>Blog</UnstyledButton>
            <UnstyledButton>Contacts</UnstyledButton>
            <UnstyledButton>Support</UnstyledButton>
        </>
    );
}

export default function Navbar({ children }) {
    const [opened, { toggle }] = useDisclosure();
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
                    <Group justify="space-between" style={{ flex: 1 }}>
                        {/* <MantineLogo size={30} /> */}
                        <Group ml="xl" gap={0} visibleFrom="sm">
                            <NavLink />
                        </Group>
                    </Group>
                </Group>
            </AppShellHeader>

            <AppShellNavbar py="md" px={4}>
                <NavLink />
            </AppShellNavbar>

            <AppShellMain>{children}</AppShellMain>
        </AppShell>
    );
}
