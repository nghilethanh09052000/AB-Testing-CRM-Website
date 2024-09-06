import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import HomePage from "./(home)/_components/Home";
import api from "@/utils/api";


export const metadata: Metadata = {
  title:
    "Sipher Odyssey CRM Dashboard Overview",
  description: "This is Sipher Odyssey CRM Dashboard Overview Page",
};

export default async function Page() {
  const [
    userInfo, 
    zendeskTickets
  ] = await Promise.all([
    api.getUserInfo(),
    api.getZendeskTickets(),
  ]);

  return (
    <>
      <DefaultLayout>
        <HomePage
          userInfo={userInfo}
          zendeskTickets={zendeskTickets}
        />
      </DefaultLayout>
    </>
  );
}
