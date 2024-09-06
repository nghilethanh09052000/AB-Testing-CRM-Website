import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "@/components/Auth/Signin";


export const metadata: Metadata = {
  title: "Sipher Game Sign In",
  description: "This is Sipher Game Sign In Dashboard",
};


const Page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sign In" />
      <SignIn/>
    </DefaultLayout>
  );
};

export default Page;
