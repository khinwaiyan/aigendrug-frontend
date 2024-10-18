import type { Metadata } from "next";
import "./globals.css";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Aigendrug F조",
  description: "Find out the appropriate Protein by using Ensemble Models",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className}  antialiased`}>
        <div>{children}</div>
        <div>{modal}</div>
      </body>
    </html>
  );
}
