"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CloudDownload } from "lucide-react";
import { DataTable } from "../common/DataTable";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";
import { Project } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "./actions";
import TableLoader from "../common/TableLoader";
import { AddProject } from "./AddProject";
import ActionDropdown from "../common/ActionsDropDown";
import { ViewProject } from "./ViewProject";
import { DeleteProject } from "./DeleteProject";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "project title",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <span>{row.original.category?.name}</span>;
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      return <span>{formatDate(row.original.start_date)}</span>;
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      return <span>{formatDate(row.original.end_date)}</span>;
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
      const project: Project = row.original;
      return (
        <ActionDropdown>
        <ViewProject data={project} />
        <DeleteProject project_id={project.id} />
        </ActionDropdown>
      )
    },
  }
];

const AddAndExportProjects = () => {
  return (
    <div className="flex items-center gap-x-2">
     <AddProject />
      <Button variant={"outline"}>
        <CloudDownload />
        Export projects
      </Button>
    </div>
  );
};


const ProjectsList = ({initialData}: {initialData: Project[]}) => {

  const {data, isLoading, isError} = useQuery({
    queryKey: ['projects'],
    queryFn: async () => getAllProjects(),
    initialData: initialData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <div className="w-full overflow-x-auto">
        {isLoading && <TableLoader />}
        {isError && <div className="text-red-500">Error loading projects.</div>}

        <DataTable
          data={data || []}
          columns={columns}
          addExportOperationsComponent={<AddAndExportProjects />}
          searchableColumns={["title", "category", "status"]}
          title="Projects List"
          description="View and manage the projects"
        />
      </div>
    </div>
  );
};

export default ProjectsList;
