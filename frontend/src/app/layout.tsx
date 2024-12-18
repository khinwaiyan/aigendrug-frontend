import type { Metadata } from "next";
import "./globals.css";
import { Work_Sans } from "next/font/google";
import { ServiceProvider } from "@/service/ServiceContext";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className}  antialiased`}>
        <ServiceProvider>
          <div>{children}</div>
        </ServiceProvider>
      </body>
    </html>
  );
}
