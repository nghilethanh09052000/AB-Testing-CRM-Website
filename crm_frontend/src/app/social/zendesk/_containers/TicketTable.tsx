"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataTableOne from "@/components/DataTables/DataTableOne";

interface ResultsData {
     name: string; 
     email: string; 
     count: number 
}


interface EmailCountTicketTableProps {
  results: ResultsData[];
}

const EmailCountTicketTables = ({ results }: EmailCountTicketTableProps) => {
    const columns = [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Ticket",
            accessor: "count",
        },
    ]
  return (
    <>
        <h1 className="text-title-md font-semibold text-rose-800 dark:text-white mt-5">
            Email Count Ticket
        </h1>
    
        <DataTableOne
            results={results}
            columns={columns}
        />

    </>
  );
};

export default EmailCountTicketTables;
