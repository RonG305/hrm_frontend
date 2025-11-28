"use client";
import { DataTable } from "../../common/DataTable";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../../common/ActionsDropDown";
import { useQuery } from "@tanstack/react-query";
import TableLoader from "../../common/TableLoader";
import { AssetCategory } from "./types";
import { getAssetCategories } from "./actions";
import { AddCategory } from "./AddCategory";
import { DeleteCategory } from "./DeleteCategory";
import { UpdateCategory } from "./UpdateCategory";

const columns: ColumnDef<AssetCategory>[] = [
  {
    accessorKey: "name",
    header: "Department Name",
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
    header: "Created At",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.date_created)}</div>;
    },
  },

    
  {
    accessorKey: "date_updated",
    header: "Updated At",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.date_updated)}</div>;
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <ActionDropdown>
          <UpdateCategory category={row.original} />
          <DeleteCategory category_id={row.original.id.toString()} />
        </ActionDropdown>
      );
    },
  },
];

const CategoriesList = ({ initialData }: { initialData: AssetCategory[] }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["asset_categories"],
    queryFn: async () => getAssetCategories(),
    initialData: initialData,
  });

  const AddAndExportDepartments = () => {
    return (
      <div className="flex items-center gap-x-2">
       <AddCategory />
      </div>
    );
  };

  return (
    <div>
      {isLoading && <TableLoader />}
      {isError && <div className="text-red-500">Error loading categories</div>}
      {data && (
        <DataTable
          columns={columns}
          searchableColumns={["name", "code"]}
          title="All Categories"
          addExportOperationsComponent={<AddAndExportDepartments />}
          description="List of all categories in the organization"
          data={data?.results || []}
        />
      )}
    </div>
  );
};

export default CategoriesList;
