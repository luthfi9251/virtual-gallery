import withAuthAndRoleCheck from "@/hoc/withAuthAndRoleCheck";
import { PAGE_CONFIG } from "@/variables/page";

async function layout({ children }) {
    return <>{children}</>;
}

export default withAuthAndRoleCheck(layout, PAGE_CONFIG.PELUKIS_DASHBOARD.name);
