/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "4001",
                pathname: "/img/**",
            },
            {
                protocol: "http",
                hostname: "imageservice.luthficode.my.id",
                pathname: "/img/**",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                pathname: "/**",
            },
        ],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/landing_page",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,DELETE,PATCH,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
