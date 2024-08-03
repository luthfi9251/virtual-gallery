export const URL_TANART = {
    ADMIN_DASHBOARD_AKUN: "/a/dashboard/akun",
    ADMIN_DASHBOARD_AKUN_EDIT: (id) => `/a/dashboard/akun/edit/${id}`,
    KURATOR_DASHBOARD_KURASI: "/k/kurasi-karya",
    PELUKIS_KARYA: "/p/karya",
    PELUKIS_BUKA_PAMERAN: "/p/pameran/buka-pameran",
    PELUKIS_PAMERAN: "/p/pameran",
    PELUKIS_PAMERAN_EDIT: (idPameran) => `/p/pameran/edit/${idPameran}`,
    USER_PROFILE: "/profile",
    USER_PROFILE_EDIT: "/profile/edit",
    PAMERAN_VIEW: (slug) => `/pameran/${slug}`,
};
