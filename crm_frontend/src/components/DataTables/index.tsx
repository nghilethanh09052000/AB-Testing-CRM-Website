"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataTableOne from "@/components/DataTables/DataTableOne";
import DataTableTwo from "@/components/DataTables/DataTableTwo";
import React from "react";


interface DataTableProps{
  pageName: string
  results: any;
  columns: any;
}




const DataTables = ({ pageName, results, columns }: DataTableProps) => {
  return (
    <>
      <Breadcrumb pageName={pageName} />

      <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
        <DataTableOne 
          results={results}
          columns={columns}
         />
      </div>
    </>
  );
};

export default DataTables;
