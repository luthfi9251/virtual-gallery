/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                tanArtBlue: {
                    50: "#B4E1E9",
                    100: "#A9C7D1",
                    200: "#8DD2DD",
                    300: "#51A3A9",
                    400: "#1D9CB3",
                    500: "#3EB3C6",
                    600: "#00849A",
                    700: "#977669",
                    800: "#2C9FA7",
                    900: "#3091A1",
                },
            },
        },
    },
    plugins: [],
};
