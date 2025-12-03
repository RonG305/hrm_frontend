"use client";
import { DataTable } from "../../common/DataTable";
import { formatDate } from "@/lib/utils";
import { LeaveType, LeaveTypeResponse } from "./types";
import { Badge } from "../../ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../../common/ActionsDropDown";
import { AddLeaveType } from "./AddLeaveType";
import { UpdateLeaveType } from "./UpdateLeaveType";
import { DeleteLeaveType } from "./DeleteLeaveType";


const columns: ColumnDef<LeaveType>[] = [
  {
    accessorKey: "name",
    header: "Leave Type",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.description}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "date_created",
    header: "Created On",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.date_created)}</div>;
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return <ActionDropdown>
       <UpdateLeaveType leaveType={row.original} />
       <DeleteLeaveType leaveType_id={row.original.id} />
      </ActionDropdown>;
    },
  },
];

const LeaveTypesList = ({ initialData }: { initialData: LeaveTypeResponse }) => {

  const AddAndExportTasks = () => {
    return (
      <div className="flex items-center gap-x-2">
       <AddLeaveType />
      </div>
    );
  };

  return (
    <div>
      {initialData && (
        <DataTable
          columns={columns}
          searchableColumns={["name", "description"]}
          title="All your leave types"
          addExportOperationsComponent={<AddAndExportTasks />}
          description="List of all your leave types"
          data={initialData?.results || []}
        />
      )}
    </div>
  );
};

export default LeaveTypesList;
