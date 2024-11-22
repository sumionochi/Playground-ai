import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import IsAuthorised from "@/components/isAuthorised";
import AppProvider from "@/components/AppProvider"; // Import your AppProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workflow Playground - Visual Automation & AI Tools",
  description:
    "Create, manage, and automate workflows visually with Offline AI-powered Workflow Playground. Write, Summarize, translate, scrape, and automate tasks seamlessly using an intuitive drag-and-drop interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <SidebarProvider>
            <main className="w-full">{children}</main>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html>
  );
}
