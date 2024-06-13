import LoginForm from "../../LoginForm";
import { registerPelukis } from "../../_actions/register";
export default function Page() {
    return (
        <div>
            <p>Login Pelukis</p>
            <LoginForm registerHandler={registerPelukis} />
        </div>
    );
}
