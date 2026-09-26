import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Component/Homepage/Navbar";
import Footer from "./Component/Homepage/Footer";
import { PlanProvider } from "@/app/context/PlanContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FITLOG",
  description: "Workout Library — Train hard, log honest.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
        />
      </body>
    </html>
  );
}