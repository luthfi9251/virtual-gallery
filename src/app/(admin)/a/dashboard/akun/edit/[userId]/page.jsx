import { Group, Space, Container, Title, ActionIcon } from "@mantine/core";
import UserDataForm from "./UserDataForm";
import UserProfile from "./UserProfile";
import SecondaryAccount from "./SecondaryAccount";
import { getUserDataById } from "@/actions/user";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { URL_TANART } from "@/variables/url";

export default async function Page({ params }) {
    let userData = await getUserDataById(params.userId);
    return (
        <Container fluid>
            <Group>
                <ActionIcon
                    component={Link}
                    href={URL_TANART.ADMIN_DASHBOARD_AKUN}
                    variant="transparent"
                    color="black"
                    aria-label="Settings"
                >
                    <FaArrowLeft
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
                <Title order={2}>Edit Akun</Title>
            </Group>
            <Space h="xl" />
            <UserProfile
                idUser={params.userId}
                imageProfile={userData.foto_profil}
            />
            <UserDataForm data={userData} />
            {userData.Seniman && (
                <SecondaryAccount
                    jenisAkun={"Akun Pelukis"}
                    data={userData.Seniman}
                />
            )}
            {userData.Kurator && (
                <SecondaryAccount
                    jenisAkun={"Akun Kurator"}
                    data={userData.Kurator}
                />
            )}
        </Container>
    );
}
