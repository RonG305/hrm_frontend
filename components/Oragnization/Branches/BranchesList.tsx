"use client";
import { DataTable } from "../../common/DataTable";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../../common/ActionsDropDown";
import { Branch, BranchResponse } from "./types";
import { AddBranch } from "./AddBranch";
import { UpdateBranch } from "./UpdateBranch";
import { DeleteBranch } from "./DeleteBranch";

const columns: ColumnDef<Branch>[] = [
 
 {
    accessorKey: "name",
    header: "Branch Name",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.email}
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
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      return <div>{row.original.address}</div>;
    },
  },

   {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return <div>{row.original.phone}</div>;
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
          <UpdateBranch branch={row.original} />
          <DeleteBranch branch_id={row.original.id.toString()} />
        </ActionDropdown>
      );
    },
  },
];

const BranchesList = ({ initialData }: { initialData: BranchResponse }) => {

  const AddAndExportBranches = () => {
    return (
      <div className="flex items-center gap-x-2">
        <AddBranch />
      </div>
    );
  };

  return (
    <div>
      {initialData && (
        <DataTable
          columns={columns}
          searchableColumns={["name", "code"]}
          title="All Branches"
          addExportOperationsComponent={<AddAndExportBranches />}
          description="List of all branches in the organization"
          data={initialData?.results || []}
        />
      )}
    </div>
  );
};

export default BranchesList;
