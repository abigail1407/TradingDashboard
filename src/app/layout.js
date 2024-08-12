import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CoinRoutes",
  description: "CoinRoutes Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
