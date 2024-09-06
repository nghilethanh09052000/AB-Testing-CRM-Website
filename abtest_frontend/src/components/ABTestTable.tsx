"use client";
import {  useState } from "react";
import { 
  ABTestChevronUpDown,
  ABTestSearchIcons
} from "./icons/icons";
import _ from "lodash";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

interface TableColumns {
  title: string;
  field: string;
  render?: (value: any) => string | JSX.Element;
}


interface TableData {
  [key: string]: any;
}
interface TableActions {
  type: 'edit' | 'add' | 'delete' | 'json' | 'chart' | 'details';
  icon: JSX.Element;
  tooltip: string;
  onClick: (rowData: any) => void
  disable?: boolean
}

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
}


interface ABTestTableProps {
  data: TableData[];
  columns: TableColumns[];
  actions?: TableActions[];
  pagination?: PaginationProps;
  buttons?: React.ReactNode[] 
  isSearchable?: boolean
}


interface RenderTableHeaderColumnsProps {
  columns: TableColumns[]
  actions: TableActions[] | undefined
}


const RenderHeaderTable = (
  buttons: React.ReactNode[],
  isSearchable: boolean
) => {
  return (
    <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-700">
      <div className="mb-8 flex items-center justify-between gap-8">


        <div className="w-1/2">
          {
            isSearchable
            &&
            <Input
              label="Search..."
              icon={<ABTestSearchIcons className="h-5 w-5 text-white" />}
              crossOrigin={''}
              color="black"
              size="lg"
              className="text-white"
            />
          }
          
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          {
          _.map(buttons, (button, index) =>
            (
              <div key={index} className="flex">
                {button}
              </div>
            )
          )}
        </div>

      </div>
    </CardHeader>
  );
};

const RenderTableHeaderColumns = (
  { 
    columns, 
    actions 
  } : RenderTableHeaderColumnsProps 
  )=> {

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  columns = actions ? [...columns, { title: "Action", field: "" }] : columns;

  const handleSort = (column: TableColumns) => {
    if (sortColumn === column.field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column.field);
      setSortOrder('asc');
    }
  };

  console.log({
    sortColumn,
    sortOrder
  })

  return (
    <thead>
      <tr>
        {
        _.map(columns, (column, index) => (
          <th
            key={index}
            className="cursor-pointer border-y border-x border-blue-gray-100 p-2 transition-colors hover:bg-blue-gray-50"
            style={{ background: "#000" }}
          >
            <Typography
              variant="lead"
              color="white"
              className="flex items-center bold justify-star "
              style={{ color: "#f75934" }}
            >
              {column.title}
              { index !== (actions ? columns.length - 1 : columns.length ) && (
                <ABTestChevronUpDown 
                  strokeWidth={2} 
                  className={`h-4 w-4 ${
                    sortOrder === 'asc' ? 'rotate-180' : ''
                  }`}
                  onClick={() => handleSort(column)}
                />
              )}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const RenderTableData = (
  data: TableData[],
  columns: TableColumns[],
  actions: TableActions[] | undefined
) => {
  return (
    <tbody>

      {_.map(data, (rowData, index) => {
        return ( 
          <tr key={index} className="even:bg-blue-gray-50/50">
            {_.map(columns, (column, index) => {
              return (
                <td className="p-2 text-white border w-fit" key={index}>
                  {column.render
                    ? column.render(
                        column.field 
                        ? rowData[column.field]
                        : rowData
                    )
                    : rowData[column.field]}
                </td>
              )

            })}

            {actions && (
              <td className="py-4 flex items-center border">
                {
                  _.map(actions, (action, index) => (
                    <div key={index}>
                      <Tooltip
                        content={action.tooltip}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <IconButton 
                          onClick={ () => action.onClick(rowData) } 
                          className="bg-transparent"
                          variant="text"
                          disabled={action.disable}
                        >
                          {action.icon}
                        </IconButton>
                      </Tooltip>
                    </div>
                  ))
                }
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

const RenderPaginationWrapper = ({
  page,
  totalPages,
  totalItems,

}: PaginationProps) => {

  const [initPage, setInitPage ] = useState(page)

  

  const handleNavigation = (event: React.ChangeEvent<unknown>, newPage: number) => {

    console.log('Nghi')
    
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePageCount = 10; // Number of visible page numbers

    // Calculate the range of visible page numbers
    let startPage = Math.max(1, initPage - Math.floor(visiblePageCount / 2));
    let endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

    // Adjust the range if it exceeds the total number of pages
    const maxVisiblePages = 7; // Maximum number of visible pages before showing ellipsis
    if (endPage - startPage + 1 > maxVisiblePages) {
      const overflow = endPage - startPage + 1 - maxVisiblePages;
      if (startPage === 1) {
        endPage -= overflow;
      } else if (endPage === totalPages) {
        startPage += overflow;
      } else {
        const offset = Math.floor(overflow / 2);
        startPage += offset;
        endPage -= overflow - offset;
      }
    }

    // Render initPage numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <div
          key={i}
          onClick={(e) => handleNavigation(e, i)}
          className={`relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold ${
            i === page ? "bg-red-900 text-black" : "text-white" 
          } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black focus:z-20 focus:outline-offset-0`}
        >
          {i}
        </div>
      );
    }

    // Add ellipsis if necessary
    if (startPage > 1) {
      pageNumbers.unshift(
        <div
          key="start-ellipsis"
          onClick={(e) => handleNavigation(e, totalPages)}
          className="relative cursor-pointer pointer-events-auto inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300"
        >
          ...
        </div>
      );
    }
    if (endPage < totalPages) {
      pageNumbers.push(
        <div
          key="end-ellipsis"
          onClick={(e) => handleNavigation(e, 1)}
          className="relative cursor-pointer pointer-events-auto inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300"
        >
          ...
        </div>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between bg-black px-4 py-3 sm:px-6  border-y border-x">
      <div className="flex flex-1 justify-between sm:hidden">
        {initPage > 1 && (
          <div
            onClick={(e) => handleNavigation(e, 1)}
            className="relative cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </div>
        )}

        {renderPageNumbers()}

        {initPage < totalPages && (
          <div
            onClick={(e) => handleNavigation(e, initPage + 1)}
            className="relative ml-3 cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </div>
        )}
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white" >
            Showing Page: <span className="font-medium">{initPage}</span> to Page{" "}
            <span className="font-medium">{totalPages}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="RenderPaginationWrapper"
          >
            {initPage > 1 && (
              <div
                onClick={(e) => handleNavigation(e, initPage - 1)}
                className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                Previous
              </div>
            )}
            {renderPageNumbers()}
            {initPage < totalPages && (
              <div
                onClick={(e) => handleNavigation(e, initPage + 1)}
                className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default function ABTestTable({
  data,
  columns,
  actions,
  pagination,
  buttons,
  isSearchable
}: ABTestTableProps) {
  return (
    <Card className="h-full w-full bg-gray-700">
      {
        (
          buttons
          ||
          isSearchable
        )
        &&
        RenderHeaderTable(
          buttons=buttons || [],
          isSearchable=isSearchable || false
        )
      }
      <CardBody className="overflow-scroll-y px-0 p-0">
        <table className="w-full min-w-max table-auto max-h-screen">
          <RenderTableHeaderColumns
            columns={columns}
            actions={actions}
          />
          {/* {RenderTableHeaderColumns(columns, actions)} */}
          {RenderTableData(data, columns, actions)}
        </table>
        {
          pagination
          &&
          (
            <RenderPaginationWrapper 
              page={pagination.page} 
              totalPages={pagination.totalPages} 
              totalItems={pagination.totalItems}
            />
          )
        }
      </CardBody>
    </Card>
  );
}
