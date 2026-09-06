import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bapita Roy | Project Manager · QA & Automation · Technology",
  description:
    "Professional portfolio of Bapita Roy - Project Manager with a background in QA and Automation, focused on technology, quality and software delivery.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}