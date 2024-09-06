import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import api from "@/utils/api";
import { ZendeskTicket } from "@/types/api/social";import _ from "lodash";
import ZenDeskCards from "./_containers/Cards";
import AssigneeTable from "./_containers/AssigneeTable";
import EmailCountTicketTables from "./_containers/TicketTable";
import TicketTables from "./_containers/TicketsTables";


interface ProcessedData {
  emailCountTable: { name: string; email: string; count: number }[];
  ticketDetailsTable: {
    url: string;
    raw_subject: string;
    description: string;
    request_email: string;
    request_name: string;
    assignee: string;
    status: string;
    created_at: string;
  }[];
  totalTickets: number;
  totalTicketsByStatus: Record<string, number>;
  ticketsByAssignee: {
    assignee_name: string;
    total_ticket: number;
    solved: number;
    closed: number;
    new: number;
    open: number;
    pending: number;
  }[];
}

export const metadata: Metadata = {
  title: "Sipher Game Social Zendesk",
  description: "This is Sipher Game Social Zendesk Dashboard",
};

function handleProcessTicketData(tickets: ZendeskTicket[]): ProcessedData {
  const emailCountMap = _(tickets)
    .groupBy("requester_email")
    .mapValues((group) => ({
      name: _.get(group, "[0].requester_name", ""),
      count: group.length,
    }))
    .value();

  const emailCountTable = _.map(emailCountMap, (value, email) => ({
    email,
    name: value.name,
    count: value.count,
  }));
  const ticketDetailsTable = tickets.map((ticket) => ({
    url: ticket.url,
    raw_subject: ticket.raw_subject,
    description: ticket.description,
    request_email: ticket.requester_email,
    request_name: ticket.requester_name,
    assignee: ticket.assignee_name,
    status: ticket.status,
    created_at: ticket.created_at,
  }));

  // Total tickets by status
  const totalTickets = tickets.length;
  const totalTicketsByStatus = _.countBy(tickets, "status");

  // Assignee name and ticket counts by status
  const ticketsByAssignee = _(tickets)
    .groupBy("assignee_name")
    .map((tickets, assignee_name) => ({
      assignee_name,
      total_ticket: tickets.length,
      solved: _.filter(tickets, { status: "solved" }).length,
      closed: _.filter(tickets, { status: "closed" }).length,
      new: _.filter(tickets, { status: "new" }).length,
      open: _.filter(tickets, { status: "open" }).length,
      pending: _.filter(tickets, { status: "pending" }).length,
    }))
    .value();

  return {
    emailCountTable,
    ticketDetailsTable,
    totalTickets,
    totalTicketsByStatus,
    ticketsByAssignee,
  };
}

export default async function Page() {
  const tickets: ZendeskTicket[] = await api.getZendeskTickets();

  const {
    emailCountTable,
    ticketDetailsTable,
    totalTickets,
    totalTicketsByStatus,
    ticketsByAssignee,
  } = handleProcessTicketData(tickets)

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Zendesk Ticket" />

        <ZenDeskCards
          totalTickets={totalTickets}
          totalTicketsByStatus={totalTicketsByStatus}
        />
        <AssigneeTable results={ticketsByAssignee} />
        <EmailCountTicketTables results={emailCountTable} />
        <TicketTables results={ticketDetailsTable}/>
      </DefaultLayout>
    </>
  );
}
