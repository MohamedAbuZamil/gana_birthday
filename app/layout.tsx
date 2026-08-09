import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Countdown to Dr. Gana's Birthday",
  description: "عدّ تنازلي مميز لعيد ميلاد د. Gana Wael يوم 25 مايو",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
