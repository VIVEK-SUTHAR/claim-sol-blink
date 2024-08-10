import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { tree } from "next/dist/build/templates/app-page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClaimSol - Reclaim Your SOL Rent",
  description: "Seamlessly close unused token accounts and reclaim the SOL rent you're owed. Recover your assets with just a few clicks.",
  authors: [{
    url: "https://devvivek.tech",
    name: "VS",
  }],
  openGraph: {
    images: "https://res.cloudinary.com/dazemzk7u/image/upload/v1723235594/zgsmeu9qj3s60o6u6bbn.png",
    description: "Seamlessly close unused token accounts and reclaim the SOL rent you're owed. Recover your assets with just a few clicks.",
    title: "ClaimSol - Reclaim Your SOL Rent",
    type: "website",
    siteName: "ClaimSol",
  },
  keywords: ["solana", "close account", "claim rent", "close token accounts", "recover SOL rent", "SOL rent recovery",
    "SOL account closure", "ClaimSol", "reclaim SOL"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      follow: true,
      index: true,
    },
  },
  twitter: {
    title: "ClaimSol - Reclaim Your SOL Rent",
    description: "Seamlessly close unused token accounts and reclaim the SOL rent you're owed. Recover your assets with just a few clicks.",
    images: ["https://res.cloudinary.com/dazemzk7u/image/upload/v1723235594/zgsmeu9qj3s60o6u6bbn.png"],
    card: "summary_large_image",
    creator: "@theviveksuthar",
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
