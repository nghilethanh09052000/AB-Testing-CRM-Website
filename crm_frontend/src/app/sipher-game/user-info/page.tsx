
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DataTables from "@/components/DataTables";
import api from "@/utils/api";


export const metadata: Metadata = {
  title: "Sipher Game User Info",
  description: "This is Sipher Game User Info Dashboard",
};



export default async function Page() {
  const data = await api.getUserInfo()
  
  const columns = [
    {
      Header: "Ather Id",
      accessor: "ather_id"
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Ather User Name",
      accessor: "ather_user_name",
    },
    {
      Header: "Game User Id",
      accessor: "game_user_id",
    },
    {
      Header: "Game User Name",
      accessor: "game_user_name",
    },
    {
        Header: "Created Timestamp",
        accessor: "ather_created_timestamp",
    },
    {
        Header: "Game Day 0 Datetime",
        accessor: "game_day0_datetime_tzutc",
    }
  ];

  return (
    <>
      <DefaultLayout>
            <DataTables
                pageName="User Info"
                results={data}
                columns={columns}
            />
        </DefaultLayout>
    </>
  );
}
