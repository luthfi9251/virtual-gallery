import withAuth from "./withAuthCheck";
import withRoleCheck from "./withRoleCheck";

export default function withAuthAndRoleCheck(Component, page_name) {
    let hoc = withAuth(withRoleCheck(Component, page_name));
    return hoc;
}
