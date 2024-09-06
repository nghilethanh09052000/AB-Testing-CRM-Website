import React from "react";
import DataTables from "@/components/DataTables";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserInventoryBalanceCards from "./_containers/Cards";
import api from "@/utils/api";
import _ from 'lodash'
export const metadata: Metadata = {
  title: "Sipher Game Info",
  description: "Sipher Game Info",
};

export default async function Page() {
  const [userInfo, userInventoryBalance] = await Promise.all([
    api.getUserInfo(),
    api.getUserInventoryBalance(),
  ]);

  const columns = [
    {
      Header: "User Id",
      accessor: "user_id",
    },
    {
      Header: "Ather Id",
      accessor: "ather_id",
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
      Header: "Instance Id",
      accessor: "instance_id",
    },
    {
      Header: "Previous Balance",
      accessor: "previous_balance",
    },
    {
      Header: "Update Balance",
      accessor: "updated_balance",
    },
    {
      Header: "Change In Balance",
      accessor: "change_in_balance",
    },
    {
      Header: "Balance Change Type",
      accessor: "balance_change_type",
    },
    {
      Header: "Update Balance Date",
      accessor: "updated_balance_date",
    },
  ];

  const instanceIds = _.map(userInventoryBalance , data => ({value: data['instance_id'], label:data['instance_id' ]}))

  return (
    <>
      <DefaultLayout>
        <UserInventoryBalanceCards
          userInfo={userInfo}
          instanceIds={instanceIds}
        />
        <DataTables
          pageName="User Inventory Balance"
          results={userInventoryBalance}
          columns={columns}
        />
      </DefaultLayout>
    </>
  );
}
