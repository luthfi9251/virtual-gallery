import { registerPelukis, loginPelukis } from "../../_actions/register";
import { Container } from "@mantine/core";
import FormLogin from "../../FormLogin";
import FormRegister from "../../FormRegister";
export default function Page() {
    return (
        <div>
            <p>Login Pelukis</p>
            <Container>
                <FormLogin loginHandler={loginPelukis} />
                <FormRegister registerHandler={registerPelukis} useDeskripsi />
            </Container>
        </div>
    );
}
