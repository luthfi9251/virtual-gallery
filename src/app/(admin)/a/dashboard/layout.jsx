import Sidebar from "../../../Sidebar";
import { Text } from "@mantine/core";
import {
    FaChevronRight,
    FaPaintbrush,
    FaClipboardList,
    FaUserTie,
} from "react-icons/fa6";
import { FaHome, FaPenFancy } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

let NAV_DATA_GROUP = [
    {
        group: null,
        link: [
            {
                label: (
                    <Text fz="md" fw="500">
                        Dashboard
                    </Text>
                ),
                href: "/a/dashboard",
                leftSection: <FaHome size="1rem" stroke={1.5} />,
            },
        ],
    },
    {
        group: "Akun",
        link: [
            {
                label: (
                    <Text fz="md" fw="500">
                        Kelola Akun
                    </Text>
                ),
                href: "#",
                leftSection: <MdManageAccounts size="1rem" stroke={1.5} />,
                children: [
                    {
                        label: (
                            <Text fz="md" fw="500">
                                User
                            </Text>
                        ),
                        href: "/a/dashboard/akun",
                        leftSection: <FaUserTie size="1rem" stroke={1.5} />,
                    },
                ],
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
                            <Text fz="md" fw="500">
                                Pelukis
                            </Text>
                        ),
                        href: "/a/dashboard/verifikasi-pelukis",
                        leftSection: <FaPaintbrush size="1rem" stroke={1.5} />,
                    },
                    {
                        label: (
                            <Text fz="md" fw="500">
                                Kurator
                            </Text>
                        ),
                        href: "/a/dashboard/verifikasi-kurator",
                        leftSection: <FaPenFancy size="1rem" stroke={1.5} />,
                    },
                ],
            },
        ],
    },
];

export default function layout({ children }) {
    return <Sidebar navData={NAV_DATA_GROUP}>{children}</Sidebar>;
}
