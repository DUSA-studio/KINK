import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KinkForge - Kink Image Generator",
  description: "Consensual adult kink image exploration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white">{children}</body>
    </html>
  );
}
