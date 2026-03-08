import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HousingAlert",
  description: "Get notified when affordable housing waitlists open in your county.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0A0A0A] text-white min-h-screen antialiased flex flex-col`}>
        {children}
      </body>
    </html>
  );
}