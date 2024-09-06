'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataTableOne from "@/components/DataTables/DataTableOne";

interface ResultsData {
    url: string;
    raw_subject: string;
    description: string;
    request_email: string;
    request_name: string;
    assignee: string;
    status: string;
    created_at: string;
}


interface TicketTableProps {
  results: ResultsData[];
}

const renderDescriptionRow = (description: string) => {
    return (
        <p>{description}</p>
    )
}

const TicketTables = ({ results }: TicketTableProps) => {
    const columns = [
        {
            Header: "Url",
            accessor: "url",
        },
        {
            Header: "Raw Subject",
            accessor: "raw_subject",
        },
        {
            Header: "Description",
            accessor: "description",
            Cell: ({ value }: any) => renderDescriptionRow(value)
        },
        {
            Header: "Request Email",
            accessor: "request_email",
        },
        {
            Header: "Request Name",
            accessor: "request_name",
        },
        {
            Header: "Assignee",
            accessor: "assignee",
        },
        {
            Header: "Status",
            accessor: "status",
        },
        {
            Header: "Created At",
            accessor: "created_at",
        }
    ]
  return (
    <>
        <h1 className="text-title-md font-semibold text-rose-800 dark:text-white mt-5">
            Tickets Table
        </h1>
    
        <DataTableOne
            results={results}
            columns={columns}
        />

    </>
  );
};

export default TicketTables;
