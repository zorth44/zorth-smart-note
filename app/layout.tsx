import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 font-sans antialiased flex flex-col",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex items-center justify-center">{children}</main>
            <footer className="w-full flex items-center justify-center py-3 bg-gray-900 bg-opacity-50">
              <span className="text-default-600 text-sm">© 2024 zorth</span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
