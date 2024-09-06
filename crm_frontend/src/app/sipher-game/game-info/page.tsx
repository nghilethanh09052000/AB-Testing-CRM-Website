import React from "react";
import DataTables from "@/components/DataTables";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import api from "@/utils/api";

export const metadata: Metadata = {
  title: "Sipher Game Info",
  description:
    "Sipher Game Info",
  // other metadata
};

export default async function Page() {
 

  return (
    <>
      <DefaultLayout>
            <div></div>
        </DefaultLayout>
    </>
  );
}
