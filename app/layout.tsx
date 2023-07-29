import "./globals.css";
import React from "react";

import { IBM_Plex_Mono } from "next/font/google";

const ibm = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Kanban Board",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ibm.className}>{children}</body>
    </html>
  );
}
