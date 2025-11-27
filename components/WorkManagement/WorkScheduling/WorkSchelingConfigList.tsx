"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { CloudDownload } from "lucide-react";
import { DataTable } from "../../common/DataTable";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import TableLoader from "../../common/TableLoader";
import ActionDropdown from "../../common/ActionsDropDown";
import { WorkSchedule } from "./types"; 
import { getAllWorkSchedules } from "./actions";
import { AddShiftScheduleConfig } from "./AddWorkScheduleConfig";
import { DeleteScheduleConfig } from "./DeleteScheduleConfig";
import { UpdateShiftScheduleConfig } from "./UpdateWorkScheduleConfig";

export const columns: ColumnDef<WorkSchedule>[] = [
  {
    accessorKey: "name",
    header: "Day",
  },
  {
    accessorKey: "start_time",
    header: "Start Time",
    cell: ({ row }) => <span>{row.original.start_time}</span>,
  },
  {
    accessorKey: "end_time",
    header: "End Time",
    cell: ({ row }) => <span>{row.original.end_time}</span>,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <span>{formatDate(row.original.created_at)}</span>,
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => <span>{formatDate(row.original.updated_at)}</span>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const schedule = row.original;
      return (
        <ActionDropdown>
            <UpdateShiftScheduleConfig scheduleData={schedule} />
          <DeleteScheduleConfig schedule_id={schedule.id} />
        </ActionDropdown>
      );
    },
  },
];

const AddAndExportSchedules = () => {
  return (
    <div className="flex items-center gap-x-2">
      <AddShiftScheduleConfig />
      <Button variant="outline">
        <CloudDownload />
        Export Schedules
      </Button>
    </div>
  );
};

const WorkScheduleList = ({ initialData }: { initialData: any }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["work-schedule-configs"],
    queryFn: async () => {
        const response = await getAllWorkSchedules();
        return response;
    },
    initialData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full overflow-x-auto">
      {isLoading && <TableLoader />}
      {isError && <div className="text-red-500">Error loading schedules.</div>}

      <DataTable
        data={data?.results || []}
        columns={columns}
        addExportOperationsComponent={<AddAndExportSchedules />}
        searchableColumns={["name", "start_time", "end_time"]}
        title="Work Schedule"
        description="Configure working hours for each day"
      />
    </div>
  );
};

export default WorkScheduleList;
