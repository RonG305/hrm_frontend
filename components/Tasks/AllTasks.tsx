"use client";
import React from "react";
import { DataTable } from "../common/DataTable";
import { formatDate } from "@/lib/utils";
import { Task } from "./types";
import { Badge } from "../ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../common/ActionsDropDown";
import { useQuery } from "@tanstack/react-query";
import { getUserTasks } from "./actions";
import TableLoader from "../common/TableLoader";
import {AddTask} from "./AddTask";
import { DeleteTask } from "./DeleteTask";
import { UpdateTask } from "./UpdateTask";
import Link from "next/link";
import { EyeIcon } from "lucide-react";

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Task Name",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.title}</p>
          <p className="text-xs text-muted-foreground">
            created on {formatDate(row.original.date_created)} by{" "}
            {row.original.assigned_by}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "due_date",
    header: "Due By",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.due_date)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.status === "Pending" ? (
            <Badge variant={"warning"}>Pending</Badge>
          ) : row.original.status === "In Progress" ? (
            <Badge variant={"info"}>In Progress</Badge>
          ) : (
            <Badge variant={"success"}>Completed</Badge>
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
        <UpdateTask task={row.original} />
        <Link className="text-primary flex items-center gap-x-2" href={`/dashboard/tasks/${row.original.id}`}>
          <EyeIcon />
            <p>View</p>
          </Link>
        <DeleteTask task_id={row.original.id} />
      </ActionDropdown>;
    },
  },
];

const AllTasks = ({ initialData }: { initialData: Task[] }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => getUserTasks(),
    initialData: initialData,
  });

  const AddAndExportTasks = () => {
    return (
      <div className="flex items-center gap-x-2">
        <AddTask />
      </div>
    );
  };

  return (
    <div>
      {isLoading && <TableLoader />}
      {isError && <div className="text-red-500">Error loading tasks.</div>}
      {data && (
        <DataTable
          columns={columns}
          searchableColumns={["title", "assigned_by"]}
          title="All your tasks"
          addExportOperationsComponent={<AddAndExportTasks />}
          description="List of tasks "
          data={data?.results || []}
        />
      )}
    </div>
  );
};

export default AllTasks;
