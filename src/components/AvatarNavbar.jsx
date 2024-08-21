import {
    Menu,
    MenuTarget,
    MenuLabel,
    MenuItem,
    MenuDropdown,
    MenuDivider,
    UnstyledButton,
    Box,
    rem,
    // Avatar,
    Button,
} from "@mantine/core";
import Avatar from "./Avatar";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import { profileLoaderFotoProfil } from "@/loader/imageLoader";
import { URL_TANART } from "@/variables/url";
import { signOutAction } from "@/actions/authAction";

export const AvatarProfileSmall = ({ src = null, size = 30 }) => {
    return (
        <Avatar
            src={src || "/EMPTY_USER_PROFILE.png"}
            loader={src && profileLoaderFotoProfil}
            className="border cursor-pointer"
            alt="it's meeee"
            width={size}
            height={size}
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
            width={300}
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
                        alt="foto profil"
                        data-cy="btn-profile"
                    />
                )}
            </MenuTarget>

            <MenuDropdown className="max-h-[400px] overflow-y-auto">
                <div className="w-full flex flex-col items-center p-2">
                    <Image
                        src={profilePicture || "/EMPTY_USER_PROFILE.png"}
                        width={150}
                        height={150}
                        loader={profilePicture && profileLoaderFotoProfil}
                        className="rounded-[50%]"
                        alt="profile picture"
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
                        className="text-center my-2 bg-tanArtBlue-600 text-white hover:bg-tanArtBlue-900"
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
                <MenuItem
                    data-cy="link-to-status-pembayaran"
                    component={Link}
                    href={URL_TANART.USER_STATUS_PEMBAYARAN}
                >
                    Status Pembayaran
                </MenuItem>

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
