import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diecast Collection",
  description: "Vintage Hot Wheels and Matchbox diecast cars from the 1970s and 1980s",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-content">
            <h1>
              <Link href="/">Diecast Collection</Link>
            </h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
