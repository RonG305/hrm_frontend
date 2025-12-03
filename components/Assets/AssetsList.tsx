"use client";
import { DataTable } from "../common/DataTable";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../common/ActionsDropDown";
import { Asset, AssetResponse } from "./types";
import { Badge } from "../ui/badge";
import { AddAsset } from "./AddAsset";
import { UpdateAsset } from "./UpdateAsset";
import { DeleteAsset } from "./DeleteAsset";
import { AssignAsset } from "./AssignAsset";

const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "name",
    header: "Department Name",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.name}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "serial_number",
    header: "Serial Number",
    cell: ({ row }) => {
      return <div>{row.original.serial_number}</div>;
    },
  },

  {
    accessorKey: "warranty_expiry_date",
    header: "Warranty Expiry Date",
    cell: ({ row }) => {
      const daysRemaining = Math.ceil((new Date(row.original.warranty_expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return <div>
        {row.original.warranty_expiry_date < new Date().toISOString() ? (
            <Badge variant="destructive">Expired</Badge>
          ) : (
            <Badge variant={"success"}>Valid | {daysRemaining} days remaining</Badge>
        )}
      </div>;
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge variant={
            row.original.status === 'Available' ? 'success' :
            row.original.status === 'Assigned' ? 'info' :
            row.original.status === 'Under Maintenance' ? 'warning' :
            row.original.status === 'Retired' ? 'destructive' :
            'default'
        }>{row.original.status}</Badge>
      );
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <ActionDropdown>
          <UpdateAsset asset={row.original} />
          <AssignAsset asset={row.original} />
          <DeleteAsset asset_id={row.original.id.toString()} />
        </ActionDropdown>
      );
    },
  },
];

const AssetsList = ({ initialData }: { initialData: AssetResponse }) => {

  const AddAndExportAssets = () => {
    return (
      <div className="flex items-center gap-x-2">
      <AddAsset />
      </div>
    );
  };

  return (
    <div>
      {initialData && (
        <DataTable
          columns={columns}
          searchableColumns={["name", "code"]}
          title="All Assets"
          addExportOperationsComponent={<AddAndExportAssets />}
          description="List of all assets in the organization"
          data={initialData?.results || []}
        />
      )}
    </div>
  );
};

export default AssetsList;
