export const URL_TANART = {
    ADMIN_DASHBOARD_AKUN: "/a/dashboard/akun",
    ADMIN_DASHBOARD_AKUN_EDIT: (id) => `/a/dashboard/akun/edit/${id}`,
    ADMIN_VALIDASI_PEMBAYARAN: "/a/dashboard/validasi-pembayaran",
    ADMIN_CMS_COMPANY_PROFILE: "/a/dashboard/cms-company-profile",
    ADMIN_BUKA_PAMERAN: "/a/dashboard/manage-pameran/buka",
    ADMIN_MANAGE_PAMERAN: "/a/dashboard/manage-pameran",
    ADMIN_PAMERAN_EDIT: (idPameran) =>
        `/a/dashboard/manage-pameran/edit/${idPameran}`,
    ADMIN_PAMERAN_SEE: (slug) => `/a/dashboard/manage-pameran/lihat/${slug}`,
    ADMIN_CMS_VIRTUAL_GENERAL: "/a/dashboard/cms-general-vg",
    ADMIN_CMS_VIRTUAL_GENERAL_EDIT: (mode) =>
        `/a/dashboard/cms-general-vg/edit?mode=${mode}`,
    KURATOR_DASHBOARD_KURASI: "/k/kurasi-karya",
    PELUKIS_KARYA: "/p/karya",
    PELUKIS_BUKA_PAMERAN: "/p/pameran/buka-pameran",
    PELUKIS_PAMERAN: "/p/pameran",
    PELUKIS_PAMERAN_EDIT: (idPameran) => `/p/pameran/edit/${idPameran}`,
    USER_LOGIN_WITH_REDIRECT: (redirect) => `/login?redirect=${redirect}`,
    USER_DAFTAR: "/login?action=register",
    USER_PROFILE: "/profile",
    USER_PROFILE_EDIT: "/profile/edit",
    USER_CHECKOUT: (pameranId, karyaId) =>
        `/checkout/${pameranId}?karya=${karyaId}`,
    USER_STATUS_PEMBAYARAN: "/status-pembayaran",
    USER_BAYAR: (idInvoice) => `/status-pembayaran/bayar?invoice=${idInvoice}`,
    PAMERAN_VIEW: (slug) => `/pameran/${slug}`,
};
