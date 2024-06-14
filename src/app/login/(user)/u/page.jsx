import { testData, loginUser } from "../../_actions/register";
import { Container } from "@mantine/core";
import FormLogin from "../../FormLogin";
import FormRegister from "../../FormRegister";
export default function Page() {
    return (
        <div>
            <p>Login User</p>
            <Container>
                <FormLogin loginHandler={loginUser} />
                <FormRegister registerHandler={testData} />
            </Container>
        </div>
    );
}
