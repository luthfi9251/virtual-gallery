import { Poppins } from "next/font/google";
import { Notifications } from "@mantine/notifications";
import QueryProvider from "./QueryProvider";
import "./globals.css";

import { createTheme, MantineProvider, ColorSchemeScript } from "@mantine/core";
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const myColor = [
    "#B4E1E9",
    "#A9C7D1",
    "#8DD2DD",
    "#51A3A9",
    "#1D9CB3",
    "#3EB3C6",
    "#00849A",
    "#2C9FA7",
    "#3091A1",
];
const additionalColor = ["#E62F29"];

const theme = createTheme({
    colors: {
        myColor,
    },
    fontFamily: poppins.style.fontFamily,
    primaryColor: "myColor",
    headings: {
        // Use default theme if you want to provide default Mantine fonts as a fallback
        fontFamily: `${poppins.style.fontFamily}`,
    },
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={poppins.className}>
                <QueryProvider>
                    <MantineProvider
                        theme={theme}
                        defaultColorScheme="light"
                        withGlobalStyles
                    >
                        <Notifications />
                        {children}
                    </MantineProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
