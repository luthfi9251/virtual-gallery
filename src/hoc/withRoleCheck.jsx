import { redirect } from "next/navigation";
import { PAGE_CONFIG } from "@/variables/page";

export default function withRoleCheck(Component, page_name) {
    return async function withRoleCheck(props) {
        const session = props.session.user;

        if (!session) return;

        let config = PAGE_CONFIG[page_name];

        if (!config) {
            throw Error(
                "Page name tidak ditemukan, harap definisikan di page.js"
            );
        }

        // let checkUserhasGroup = config.allowedGroup.findIndex((item) =>
        //     session.groups.includes(item)
        // );

        let checkUserisAllowed = session.accessRole.includes(
            config.allowedRole
        );

        if (!checkUserisAllowed) {
            redirect("/forbidden");
            return null;
        }

        return <Component {...props} />;
    };
}
