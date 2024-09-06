"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataTableOne from "@/components/DataTables/DataTableOne";
import CardDataStats from "@/components/CardDataStats";
import _ from "lodash";
import { ZendeskTicket } from "@/types/api/social";
import ZenDeskCards from "@/app/social/zendesk/_containers/Cards";


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
  zendeskTickets: ZendeskTicket[];
}

const renderDescriptionRow = (description: string) => {
  return <p>{description}</p>;
};

const getEmailResults = (zendeskTickets: ZendeskTicket[]) => {
  const emailCountMap = _(zendeskTickets)
    .groupBy("requester_email")
    .mapValues((group) => ({
      name: _.get(group, "[0].requester_name", ""),
      count: group.length,
    }))
    .value();

  return _.map(emailCountMap, (value, email) => ({
    email,
    name: value.name,
    count: value.count,
  }))
}

const Social = ({ zendeskTickets }: TicketTableProps) => {
  const totalTickets = zendeskTickets.length
  const totalTicketsByStatus = _.countBy(zendeskTickets, "status");
  const emailResults = getEmailResults(zendeskTickets)
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
      <div className="mt-10 px-10 py-10">
        <ZenDeskCards totalTickets={totalTickets} totalTicketsByStatus={totalTicketsByStatus}/>

        <DataTableOne results={emailResults} columns={columns} /> 
      </div>

    </>
  );
};

export default Social;
