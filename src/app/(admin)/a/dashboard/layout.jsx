import Sidebar from "../../../Sidebar";
import { Text } from "@mantine/core";
import {
    FaChevronRight,
    FaPaintbrush,
    FaClipboardList,
    FaUserTie,
    FaFileInvoiceDollar,
} from "react-icons/fa6";
import { RiSlideshow4Line } from "react-icons/ri";
import { BsHouseGearFill } from "react-icons/bs";
import { FaHome, FaPenFancy, FaRegImages } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import withAuthAndRoleCheck from "@/hoc/withAuthAndRoleCheck";
import { PAGE_CONFIG } from "@/variables/page";

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
    {
        group: "Karya",
        link: [
            {
                label: (
                    <Text fz="md" fw="500">
                        Karya
                    </Text>
                ),
                href: "/a/dashboard/manage-karya",
                leftSection: <FaRegImages size="1rem" stroke={1.5} />,
            },
            {
                label: (
                    <Text fz="md" fw="500">
                        Pameran
                    </Text>
                ),
                href: "/a/dashboard/manage-pameran",
                leftSection: <RiSlideshow4Line size="1rem" stroke={1.5} />,
            },
            {
                label: (
                    <Text fz="md" fw="500">
                        Validasi Pembayaran
                    </Text>
                ),
                href: "/a/dashboard/validasi-pembayaran",
                leftSection: <FaFileInvoiceDollar size="1rem" stroke={1.5} />,
            },
        ],
    },
    {
        group: "CMS",
        link: [
            {
                label: (
                    <Text fz="md" fw="500">
                        Virtual Gallery
                    </Text>
                ),
                href: "#",
                leftSection: <BsHouseGearFill size="1rem" stroke={1.5} />,
                children: [
                    {
                        label: (
                            <Text fz="md" fw="500">
                                Landing Page
                            </Text>
                        ),
                        href: "/a/dashboard/cms-virtual-gallery",
                    },
                    {
                        label: (
                            <Text fz="md" fw="500">
                                Umum
                            </Text>
                        ),
                        href: "/a/dashboard/cms-general-vg",
                    },
                ],
            },
            {
                label: (
                    <Text fz="md" fw="500">
                        Company Profile
                    </Text>
                ),
                href: "/a/dashboard/cms-company-profile",
                leftSection: <BsHouseGearFill size="1rem" stroke={1.5} />,
            },
        ],
    },
];

async function layout({ children, session }) {
    return (
        <Sidebar navData={NAV_DATA_GROUP} session={session}>
            {children}
        </Sidebar>
    );
}

export default withAuthAndRoleCheck(layout, PAGE_CONFIG.ADMIN_DASHBOARD.name);
