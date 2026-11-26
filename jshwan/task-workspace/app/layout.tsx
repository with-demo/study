import type { Metadata } from "next";
import "./task.css";

export const metadata: Metadata = {
  title: "Task — 나의 작업 공간",
  description: "오늘의 집중부터 프로젝트의 완성까지. 나만의 작업 공간.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
