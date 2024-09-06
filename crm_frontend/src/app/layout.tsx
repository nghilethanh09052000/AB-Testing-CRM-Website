import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "nouislider/dist/nouislider.css";
import "dropzone/dist/dropzone.css";
import "@/css/satoshi.css";
import "@/css/simple-datatables.css";
import "@/css/style.css";

import _ from 'lodash'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import { headers } from "next/headers";
import AuthContextProvider from "@/hooks/useAuthContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const session = await getServerSession(authOptions)
  if(!session && !_.includes(pathname, '/auth/signin')) redirect('/auth/signin')
  return (
    <html lang="en">
      <AuthContextProvider session={session}>
      <body>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {children}
        </div>
      </body>
      </AuthContextProvider>
    </html>
  );
}
