import DataTableOne from "@/components/DataTables/DataTableOne";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface ResultsData {
  assignee_name: string;
  total_ticket: number;
  solved: number;
  closed: number;
  new: number;
  open: number;
  pending: number;
}
interface AssigneeTableProps {
  results: ResultsData[];
}

const AssigneeTable = ({ results }: AssigneeTableProps) => {

  return (
    <>
        <h1 className="text-title-md font-semibold text-rose-800 dark:text-white mt-5">
            Ticket Assignee
          </h1>
      <div className="mt-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Assignee
          </h4>
        </div>

        <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 bg-gray">
          <div className="col-span-2 flex">
            <p className="font-medium">Assignee Name</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Total Ticket</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Solved</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Closed</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">New</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Open</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Pending</p>
          </div>
        </div>

        {results.map((result, key) => (
          <div
            className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 "
            key={key}
          >
            <div className="col-span-2 flex">
              <p className="text-sm text-black dark:text-white">
                {result.assignee_name}
              </p>
            </div>
            <div className="col-span-1 flex">
              <p className="text-sm text-black dark:text-white">
                {result.total_ticket}
              </p>
            </div>
            <div className="col-span-1 hidden sm:flex">
              <p className="text-sm text-black dark:text-white">
                {result.solved}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-black dark:text-white">
                {result.closed}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-black dark:text-white">{result.new}</p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-meta-3">{result.open}</p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-meta-3">{result.pending}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AssigneeTable;
