import { Grid, Space, Container, Title } from "@mantine/core";
import UserDataForm from "./UserDataForm";
import UserProfile from "./UserProfile";
import SecondaryAccount from "./SecondaryAccount";
import { getUserDataById } from "@/actions/user";

export default async function Page({ params }) {
    let userData = await getUserDataById(params.userId);
    console.log(userData);
    return (
        <Container fluid>
            <Title order={2}>Edit Akun</Title>
            <Space h="xl" />
            <UserProfile />
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
