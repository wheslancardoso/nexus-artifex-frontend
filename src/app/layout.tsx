import type { Metadata } from "next";
import { Spline_Sans } from "next/font/google";
import "./globals.css";

const splineSans = Spline_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nexus Artifex - Oceano de Ideias",
  description:
    "Plataforma de pensamento criativo baseada em grafos. Onde ideias são criadas, conectadas e evoluídas.",
  keywords: ["criatividade", "ideias", "grafo", "pensamento visual", "brainstorm"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${splineSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
