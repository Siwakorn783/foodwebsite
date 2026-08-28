import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Thai Kitchen - เมนูอาหารไทย",
  description: "เว็บแอปพลิเคชันสำหรับดูเมนูอาหารไทย วิธีทำ และวัตถุดิบ",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🍜</span>
              <span className="text-xl font-bold tracking-tight group-hover:opacity-90 transition-opacity">
                Food Website
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className="hover:text-accent-light transition-colors"
              >
                หน้าแรก
              </Link>
              <Link
                href="/random"
                className="hover:text-accent-light transition-colors"
              >
                สุ่มเมนู
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>

      </body>
    </html>
  );
}
