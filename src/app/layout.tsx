import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BPJS JKK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`} cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
