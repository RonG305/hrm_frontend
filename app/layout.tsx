import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "sonner";

const poppins = Poppins({subsets: ["latin"], weight: ["400", "500", "700"]});
const inter = Inter({subsets: ["latin"], variable: "--font-inter"});

export const metadata: Metadata = {
  title: "HRM Portal",
  description: "Human Resource Management Portal",
  openGraph: {
    title: "HRM Portal",
    description: "Human Resource Management Portal",
    url: "https://hrm-portal.example.com",
    siteName: "HRM Portal",
    type: "website",
  },
  keywords: [
    "HRM",
    "Human Resource Management",
    "Employee Management",
    "Payroll",
    "Attendance",
    "Performance",
    "Recruitment",
    "Onboarding",
    "Training",
    "Benefits",
    "Compliance",
    "Time Tracking",
    "Leave Management",
    "Workforce Analytics",
    "Talent Management",
    "Employee Self-Service",
    "HR Software",
    "HRIS",
    "HRMS",
    "Human Capital Management",
    "Employee Engagement",
    "HR Analytics",
  ]
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <QueryProvider>
               <Toaster richColors position="top-right" closeButton />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
