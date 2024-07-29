import {
    Menu,
    MenuTarget,
    MenuLabel,
    MenuItem,
    MenuDropdown,
    MenuDivider,
    UnstyledButton,
    Box,
    Avatar,
    rem,
} from "@mantine/core";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { LogOut } from "./AuthComponent";
import NextImage from "next/image";
import { profileLoaderFotoProfil } from "@/loader/imageLoader";

export const AvatarProfileSmall = ({ src = null, size = "md" }) => {
    return (
        <Avatar
            src={src || "/EMPTY_USER_PROFILE.png"}
            loader={src && profileLoaderFotoProfil}
            className="border cursor-pointer"
            alt="it's me"
        />
    );
};

export default function AvatarNavbar({
    profilePicture,
    isMobile,
    isAdmin = false,
    isKurator = false,
    isPelukis = false,
}) {
    return (
        <Menu
            shadow="md"
            width={200}
            trigger="click-hover"
            openDelay={100}
            closeDelay={400}
            withArrow
            offset={20}
        >
            <MenuTarget>
                {isMobile ? (
                    <Box data-cy="btn-profile">
                        <FaChevronRight
                            style={{ width: rem(14), height: rem(14) }}
                            stroke={1.5}
                        />
                    </Box>
                ) : (
                    <Avatar
                        src={profilePicture || "/EMPTY_USER_PROFILE.png"}
                        loader={profilePicture && profileLoaderFotoProfil}
                        className="border cursor-pointer"
                        alt="it's me"
                        data-cy="btn-profile"
                    />
                )}
            </MenuTarget>

            <MenuDropdown>
                {isAdmin || isPelukis || isKurator ? (
                    <MenuLabel>Dashboard</MenuLabel>
                ) : null}
                {isAdmin && (
                    <MenuItem
                        data-cy="link-to-dadmin"
                        component={Link}
                        href="/a/dashboard"
                    >
                        Dashboard Admin
                    </MenuItem>
                )}
                {isPelukis && (
                    <MenuItem
                        data-cy="link-to-dpelukis"
                        component={Link}
                        href="/p/dashboard"
                    >
                        Dashboard Pelukis
                    </MenuItem>
                )}
                {isKurator && (
                    <MenuItem
                        data-cy="link-to-dkurator"
                        component={Link}
                        href="/k/kurasi-karya"
                    >
                        Dashboard Kurator
                    </MenuItem>
                )}

                {isAdmin || isPelukis || isKurator ? <MenuDivider /> : null}
                <MenuLabel>Jadi Kontributor</MenuLabel>
                <MenuItem
                    href="/jadi-kontributor?type=pelukis"
                    component={Link}
                >
                    Pelukis
                </MenuItem>
                <MenuItem
                    component={Link}
                    href="/jadi-kontributor?type=kurator"
                >
                    Kurator
                </MenuItem>

                <MenuDivider />
                <MenuItem className="text-red-500" component="div">
                    <LogOut>
                        <UnstyledButton
                            type="submit"
                            className="w-full text-sm"
                            data-cy="btn-logout"
                        >
                            Keluar
                        </UnstyledButton>
                    </LogOut>
                </MenuItem>
            </MenuDropdown>
        </Menu>
    );
}
