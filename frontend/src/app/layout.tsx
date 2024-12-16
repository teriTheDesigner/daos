import "~/styles/globals.css";
import { type Metadata } from "next";

import { Oswald } from "next/font/google";
import { Montserrat } from "next/font/google";
import Footer from "./components/Footer/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-oswald",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "DAOS",
  description: "Danish Amateur Orchestra Association",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} ${montserrat.variable}`}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
