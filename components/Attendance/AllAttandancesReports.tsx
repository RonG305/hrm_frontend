"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {  CloudDownload } from "lucide-react";
import { DataTable } from "../common/DataTable";
import { useQuery } from "@tanstack/react-query";
import TableLoader from "../common/TableLoader";
import ActionDropdown from "../common/ActionsDropDown";
import { AttendanceRecord } from "./types";
import { getAllAttendanceRecords } from "./actions";
import { Badge } from "../ui/badge";
import { formatDateTime } from "@/lib/utils";
import { MarkAttendance } from "./MarkAttendance";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <p> {formatDateTime(row.original.timestamp)}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "user",
    header: "Employee",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <p> {row.original.user}</p>
        </div>
      );
    },
  },

  {
    accessorKey: 'latitude',
    header: 'Latitude',
  },
  {
    accessorKey: 'longitude',
    header: 'Longitude',
  },
  {
    accessorKey: 'distance_meters',
    header: 'Distance (meters)',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({row}) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "Present" ? "success" : "destructive"}>{status}</Badge>
      )
    }
  },

];

const AddAndExportProjectCategories = () => {
  return (
    <div className="flex items-center gap-x-2">
      <MarkAttendance />
      <Button variant={"outline"}>
        <CloudDownload />
        Export Reports
      </Button>
    </div>
  );
};

const AttendanceReportsList = ({
  initialData,
}: {
  initialData: AttendanceRecord[];
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendance_records"],
    queryFn: async () => getAllAttendanceRecords(),
    initialData: initialData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        {isLoading && <TableLoader />}
        {isError && (
          <div className="text-red-500">Error loading attendance records.</div>
        )}

        <DataTable
          data={data?.results || []}
          columns={columns}
          searchableColumns={["user", "status"]}
          addExportOperationsComponent={<AddAndExportProjectCategories />}
          title="Attendance Records List"
          description="View and manage the attendance records"
        />
      </div>
    </div>
  );
};

export default AttendanceReportsList;
