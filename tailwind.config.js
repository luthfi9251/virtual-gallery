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
                    900: "#005766",
                },
                error: {
                    50: "#FFEAEA",
                    100: "#EF7975",
                    200: "#E62F29",
                },
                success: {
                    50: "#E4F6EC",
                    100: "#4BC27E",
                    200: "#2B7E4E",
                },
                tanArt: {
                    grey: "#A0A0A0",
                    greyDark: "#F2F2F2",
                    greyLight: "#A6A6A6",
                    yellow: "#FFC63B",
                    green: "#4BC27E",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
