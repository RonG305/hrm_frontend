"use client";
import { DataTable } from "../../common/DataTable";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../../common/ActionsDropDown";
import { useQuery } from "@tanstack/react-query";
import TableLoader from "../../common/TableLoader"
import { Unit } from "./types";
import { getAllUnits } from "./actions";
import { AddUnit } from "./AddUnit";
import { DeleteUnit } from "./DeleteUnit";
import { UpdateUnit } from "./UpdateUnit";


const columns: ColumnDef<Unit>[] = [
  {
    accessorKey: "name",
    header: "Unit Name",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.code}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => {
      return <div>{row.original.code}</div>;
    },
  },

  {
    accessorKey: "date_created",
    header: "Created At",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.created_at)}</div>;
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <ActionDropdown>
          <UpdateUnit unit={row.original} />
          <DeleteUnit unit_id={row.original.id.toString()} />
        </ActionDropdown>
      );
    },
  },
];

const UnitsList = ({ initialData }: { initialData: Unit[] }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["units"],
    queryFn: async () => getAllUnits(),
    initialData: initialData,
  });

  const AddAndExportBranches = () => {
    return (
      <div className="flex items-center gap-x-2">
       <AddUnit />
      </div>
    );
  };

  return (
    <div>
      {isLoading && <TableLoader />}
      {isError && <div className="text-red-500">Error loading units.</div>}
      {data && (
        <DataTable
          columns={columns}
          searchableColumns={["name", "code"]}
          title="All Units"
          addExportOperationsComponent={<AddAndExportBranches />}
          description="List of all units in the organization"
          data={data?.results || []}
        />
      )}
    </div>
  );
};

export default UnitsList;
