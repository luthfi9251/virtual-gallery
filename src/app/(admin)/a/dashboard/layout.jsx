import Sidebar from "../../../Sidebar";
import { Text } from "@mantine/core";
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
                href: "/a/dashboard/verifikasi-pelukis",
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

export default function layout({ children }) {
    return <Sidebar navData={NAV_DATA}>{children}</Sidebar>;
}
