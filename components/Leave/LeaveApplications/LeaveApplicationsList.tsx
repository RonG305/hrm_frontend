"use client";
import { DataTable } from "../../common/DataTable";
import { formatDate } from "@/lib/utils";
import { Badge } from "../../ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../../common/ActionsDropDown";
import { LeaveApplication, LeaveApplicationResponse } from "./types";
import { AddLeaveApplications } from "./AddLeaveApplications";
import { UpdateLeaveApplication } from "./UpdateLeaveApplication";
import { DeleteLeaveApplication } from "./DeleteLeaveApplication";
import { UpdateLeaveApplicationStatus } from "./UpdateLeaveApplicationStatus";

const columns: ColumnDef<LeaveApplication>[] = [
  {
    accessorKey: "leave_type.name",
    header: "Leave Type",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.leave_type.name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.leave_type.description}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.user}</div>;
    },
  },

  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.start_date)}</div>;
    },
  },

  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.end_date)}</div>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let variant: "default" | "success" | "destructive" | "warning" =
        "default";
      if (row.original.status === "approved") {
        variant = "success";
      } else if (row.original.status === "rejected") {
        variant = "destructive";
      } else if (row.original.status === "pending") {
        variant = "warning";
      }
      return (
        <Badge variant={variant} className="capitalize">
          {row.original.status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <ActionDropdown>
          <UpdateLeaveApplication leave_application={row.original} />
          <UpdateLeaveApplicationStatus leave_application={row.original} />
          <DeleteLeaveApplication leaveApplication_id={row.original.id} />
        </ActionDropdown>
      );
    },
  },
];

const LeaveApplicationsList = ({
  initialData,
}: {
  initialData: LeaveApplicationResponse;
}) => {
  const AddAndExportTasks = () => {
    return (
      <div className="flex items-center gap-x-2">
        <AddLeaveApplications />
      </div>
    );
  };

  return (
    <div>
      {initialData && (
        <DataTable
          columns={columns}
          searchableColumns={["name", "description"]}
          title="All your leave applications"
          addExportOperationsComponent={<AddAndExportTasks />}
          description="List of all your leave applications"
          data={initialData?.results || []}
        />
      )}
    </div>
  );
};

export default LeaveApplicationsList;
