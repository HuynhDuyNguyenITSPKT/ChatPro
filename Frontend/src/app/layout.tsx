import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatPro - Collaborative Platform",
  description: "Next-generation workspace for collaboration and digital asset management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
