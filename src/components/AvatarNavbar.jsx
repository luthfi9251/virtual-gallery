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
import myImageLoader from "@/loader/imageLoader";

export const AvatarProfileSmall = ({ src = null, size = "md" }) => {
    return (
        <Avatar
            src={
                src
                    ? myImageLoader({
                          src: src,
                          width: 100,
                          quality: 75,
                      })
                    : "/EMPTY_USER_PROFILE.png"
            }
            className="border cursor-pointer"
            alt="it's me"
            size={size}
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
                    <Box>
                        <FaChevronRight
                            style={{ width: rem(14), height: rem(14) }}
                            stroke={1.5}
                        />
                    </Box>
                ) : (
                    <Avatar
                        src={
                            profilePicture
                                ? myImageLoader({
                                      src: profilePicture,
                                      width: 100,
                                      quality: 75,
                                  })
                                : "/EMPTY_USER_PROFILE.png"
                        }
                        className="border cursor-pointer"
                        alt="it's me"
                    />
                )}
            </MenuTarget>

            <MenuDropdown>
                {isAdmin || isPelukis || isKurator ? (
                    <MenuLabel>Dashboard</MenuLabel>
                ) : null}
                {isAdmin && (
                    <MenuItem component={Link} href="/a/dashboard">
                        Dashboard Admin
                    </MenuItem>
                )}
                {isPelukis && (
                    <MenuItem component={Link} href="/p/dashboard">
                        Dashboard Pelukis
                    </MenuItem>
                )}
                {isKurator && <MenuItem>Dashboard Kurator</MenuItem>}

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
                        >
                            Keluar
                        </UnstyledButton>
                    </LogOut>
                </MenuItem>
            </MenuDropdown>
        </Menu>
    );
}
