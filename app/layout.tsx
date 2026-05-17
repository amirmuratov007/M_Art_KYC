import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://heimdal-group.ru"),
  title: "HEIMDALL Group — Enterprise Intelligence & Background Checks",
  description: "Premium B2B platform for counterparty, client, employee and candidate due diligence. Проверка контрагентов, клиентов, сотрудников и кандидатов.",
  keywords: ["HEIMDALL", "KYC", "background checks", "due diligence", "проверка контрагентов", "проверка кандидатов", "OSINT"],
  openGraph: {
    title: "HEIMDALL Group",
    description: "Enterprise intelligence for high-stakes business decisions.",
    url: "https://heimdal-group.ru",
    siteName: "HEIMDALL Group",
    locale: "ru_RU",
    type: "website"
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#06080d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
