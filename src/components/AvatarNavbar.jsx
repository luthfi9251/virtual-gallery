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
import Image from "next/image";
import { profileLoaderFotoProfil } from "@/loader/imageLoader";
import { URL_TANART } from "@/variables/url";
import { signOutAction } from "@/actions/authAction";

export const AvatarProfileSmall = ({ src = null, size = "md" }) => {
    return (
        <Avatar
            src={
                src
                    ? profileLoaderFotoProfil({
                          src,
                      })
                    : "/EMPTY_USER_PROFILE.png"
            }
            className="border cursor-pointer"
            alt="it's meeee"
        />
    );
};

export default function AvatarNavbar({
    namaLengkap,
    email,
    profilePicture,
    isMobile,
    isAdmin = false,
    isKurator = false,
    isPelukis = false,
}) {
    const logOutHandler = async () => {
        await signOutAction();
    };

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
                        src={
                            profilePicture
                                ? profileLoaderFotoProfil({
                                      src: profilePicture,
                                  })
                                : "/EMPTY_USER_PROFILE.png"
                        }
                        className="border cursor-pointer"
                        alt="foto profil"
                        data-cy="btn-profile"
                    />
                )}
            </MenuTarget>

            <MenuDropdown>
                <div className="w-full flex flex-col items-center p-2">
                    <Image
                        src={profilePicture || "/default/1.jpg"}
                        width={150}
                        height={150}
                        loader={profilePicture && profileLoaderFotoProfil}
                        className="rounded-[50%]"
                    />
                    <p className="line-clamp-1 font-bold text-lg mt-1">
                        {namaLengkap}
                    </p>
                    <p className="text-xs cursor-default line-clamp-1">
                        {email}
                    </p>
                    <MenuItem
                        data-cy="link-to-profile"
                        component={Link}
                        href={URL_TANART.USER_PROFILE}
                        className="text-center my-2"
                    >
                        Profil
                    </MenuItem>
                </div>
                <MenuDivider />
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
                    <UnstyledButton
                        type="submit"
                        className="w-full text-sm"
                        data-cy="btn-logout"
                        onClick={logOutHandler}
                    >
                        Keluar
                    </UnstyledButton>
                </MenuItem>
            </MenuDropdown>
        </Menu>
    );
}
