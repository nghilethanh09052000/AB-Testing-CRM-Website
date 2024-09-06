import "../../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppContextProvider } from "@/context/AppContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AB Testing Project",
  description: "Login To AB Testing Project",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <html lang="en">
      <body className={inter.className}>
        {<AppContextProvider>{children}</AppContextProvider>}
      </body>
    </html>
  );
}
