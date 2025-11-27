"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CloudDownload } from "lucide-react";
import { DataTable } from "../common/DataTable";
import { useQuery } from "@tanstack/react-query";
import TableLoader from "../common/TableLoader";
import ActionDropdown from "../common/ActionsDropDown";
import { getAllProjectCategories } from "./actions";
import { ProjectCategory } from "./types";
import { AddProjectCategories } from "./AddProjectCategories";
import { DeleteCategory } from "./DeleteCategory";
import { UpdateProjectCategories } from "./UpdateProjectCategories";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <p> {row.original.name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.description}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <ActionDropdown>
          <UpdateProjectCategories category={row.original} />
          <DeleteCategory category_id={row.original.id} />
        </ActionDropdown>
      );
    },
  },
];

const AddAndExportProjectCategories = () => {
  return (
    <div className="flex items-center gap-x-2">
      <AddProjectCategories />
      <Button variant={"outline"}>
        <CloudDownload />
        Export Project Categories
      </Button>
    </div>
  );
};

const ProjectCategoriesList = ({
  initialData,
}: {
  initialData: ProjectCategory[];
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project_categories"],
    queryFn: async () => {
      const response = await getAllProjectCategories();
      return response?.results || [];
    },
    initialData: initialData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        {isLoading && <TableLoader />}
        {isError && (
          <div className="text-red-500">Error loading project categories.</div>
        )}

        <DataTable
          data={data}
          columns={columns}
          searchableColumns={["name", "description"]}
          addExportOperationsComponent={<AddAndExportProjectCategories />}
          title="Project Categories List"
          description="View and manage the project categories"
        />
      </div>
    </div>
  );
};

export default ProjectCategoriesList;
