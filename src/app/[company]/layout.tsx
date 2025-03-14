import type { Metadata } from "next";
import "./globals.css";

import ReduxProvider from "@/stores/redux-provider";
import Header from "@/components/root/header";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Shwapno QR",
  description: "Quick Retails: Scan and Order Online",
  icons: [
    {
      rel: "icon",
      url: "/shwapno-logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background-primary">
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
