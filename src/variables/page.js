export const ROLE = {
    ADMIN: "ADMIN",
    PELUKIS: "PELUKIS",
    KURATOR: "KURATOR",
    USER: "USER",
};

export const PAGE_CONFIG = {
    ADMIN_DASHBOARD: {
        name: "ADMIN_DASHBOARD",
        allowedRole: ROLE.ADMIN,
    },
    PELUKIS_DASHBOARD: {
        name: "PELUKIS_DASHBOARD",
        allowedRole: ROLE.PELUKIS,
    },
    KURATOR_DASHBOARD: {
        name: "KURATOR_DASHBOARD",
        allowedRole: ROLE.KURATOR,
    },
    USER_DASHBOARD: {
        name: "USER_DASHBOARD",
        allowedRole: ROLE.USER,
    },
};
