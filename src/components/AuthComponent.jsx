import { signOutAction } from "@/actions/authAction";

export function LogOut({ children }) {
    return (
        <form action={signOutAction} className="w-full">
            {children}
        </form>
    );
}
