"use client";
import React from "react";
import { DataTable } from "../../common/DataTable";
import { formatDate } from "@/lib/utils";
import { Badge } from "../../ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../../common/ActionsDropDown";
import { useQuery } from "@tanstack/react-query";
import TableLoader from "../../common/TableLoader";
import { JobRequisitions } from "./types";
const columns: ColumnDef<JobRequisitions>[] = [
  {
    accessorKey: "title",
    header: "Task Name",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.title}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "post_type",
    header: "Post Type",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.post_type}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "requisition_type",
    header: "Requisition Type",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.requisition_type}</p>
        </div>
      );
    },
  },

   {
    accessorKey: "number_of_positions",
    header: "NUmber of Positions ",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.number_of_positions}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "date_created",
    header: "Date Created",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.date_created)}</div>;
    },
  },

  {
    accessorKey: "closing_date",
    header: "Date Created",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.closing_date)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.status === "pending_approval" ? (
            <Badge variant={"warning"}>Pending</Badge>
          ) : row.original.status === "rejected" ? (
            <Badge variant={"destructive"}>Rejected</Badge>
          ) : (
            <Badge variant={"success"}>Approved</Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return <ActionDropdown>
       acrtions
      </ActionDropdown>;
    },
  },
];

const JobRequisitionsList = ({ initialData }: { initialData: JobRequisitions[] }) => {

  const AddAndExportTasks = () => {
    return (
      <div className="flex items-center gap-x-2">
       send requistion
      </div>
    );
  };

  return (
    <div>
      {initialData && (
        <DataTable
          columns={columns}
          searchableColumns={["title", "post_type"]}
          title="Job Requisitions"
          addExportOperationsComponent={<AddAndExportTasks />}
          description="List of tasks "
          data={initialData || []}
        />
      )}
    </div>
  );
};

export default JobRequisitionsList;
