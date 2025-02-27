import { createTheme, MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Poppins } from "next/font/google";
import AppLayoutProvider from "../AppLayoutProvider";
import "../globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata = {
    title: "TanArt Virtual Gallery",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={poppins.className}>
                <AppLayoutProvider>{children}</AppLayoutProvider>
            </body>
        </html>
    );
}
