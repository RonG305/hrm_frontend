"use client";
import { DataTable } from "../../common/DataTable";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../../common/ActionsDropDown";
import { useQuery } from "@tanstack/react-query";
import TableLoader from "../../common/TableLoader";
import { AssetRequest, AssetRequestResponse } from "./types";
import { getAssetRequests } from "./actions";
import { Badge } from "@/components/ui/badge";
import { SendAssetRequest } from "./SendAssetRequest";
import { DeleteAssetRequest } from "./DeleteRequest";
import { UpdateAssetRequest } from "./UpdateAssetRequest";
import { ViewAssetRequest } from "./ViewAssetRequest";

const columns: ColumnDef<AssetRequest>[] = [
  {
    accessorKey: "asset",
    header: "Asset Name",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">{row.original.asset}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "requested_by.first_name",
    header: "Requested By",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">
            {row.original.requested_by.first_name}{" "}
            {row.original.requested_by.last_name}
          </p>
          <p className="text-sm text-muted-foreground">
            {row.original.requested_by.email}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "request_date",
    header: "Request Date",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.request_date)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.original.status === "Approved"
              ? "success"
              : row.original.status === "Pending"
              ? "warning"
              : "destructive"
          }
        >
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
          <ViewAssetRequest request={row.original} />
          <UpdateAssetRequest request={row.original} />
          <DeleteAssetRequest request_id={row.original.id.toString()} />
        </ActionDropdown>
      );
    },
  },
];

const AssetRequestList = ({ initialData }: { initialData: AssetRequestResponse }) => {
  const AddAndExportAssetRequests = () => {
    return (
      <div className="flex items-center gap-x-2">
        <SendAssetRequest />
      </div>
    );
  };

  return (
    <div>
      {initialData && (
        <DataTable
          columns={columns}
          searchableColumns={["name", "code"]}
          title="All Asset Requests"
          addExportOperationsComponent={<AddAndExportAssetRequests />}
          description="List of all asset requests in the organization"
          data={initialData?.results || []}
        />
      )}
    </div>
  );
};

export default AssetRequestList;
