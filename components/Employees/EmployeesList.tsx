
'use client'

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CloudDownload, UserIcon } from "lucide-react";
import { DataTable } from "../common/DataTable";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "./actions";
import TableLoader from "../common/TableLoader";
import { AddEmployee } from "./AddEmployee";
import ActionDropdown from "../common/ActionsDropDown";
import { UpdateEmployee } from "./UpdateEmployee";
import { DeleteEmployee } from "./DeleteEmployee";
import { ToggleActiveStatus } from "./ToggleActiveStatus";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => {
      return <div className="font-medium">
       <p> {row.original.first_name} {row.original.last_name}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>;
    }
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "employment_type",
    header: "Employee Type",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={`${
            row.original.is_active
              ? "success"
              : row.original.status === "On Leave"
              ? "outline"
              : "destructive"
          }`}
        >
          {row.original.is_active ? "Active" : "Inactive"}
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
         <UpdateEmployee employee={row.original} />
          <DeleteEmployee employee_id={row.original.id} />
          <Link className="text-primary flex items-center gap-x-2" href={`/dashboard/profile/${row.original.id}`}>
          <UserIcon />
            <p>View Profile</p>
          </Link>
          <ToggleActiveStatus employee={row.original} />
        </ActionDropdown>
      )
    },
  }
];

const AddAndExportEmployees = () => {
  return (
    <div className="flex items-center gap-x-2">
      <AddEmployee />
      <Button variant={"outline"}>
        <CloudDownload />
        Export Employees
      </Button>
    </div>
  );
};

const EmployeesList = ({initialData, currentType}: {initialData: any, currentType: string}) => {

  const {data, isLoading, isError} = useQuery({
    queryKey: ['employees', currentType],
    queryFn: async () => getEmployees({search: currentType}),
    initialData: initialData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        {isLoading && <TableLoader />}
        {isError && <div className="text-red-500">Error loading employees.</div>}

        <DataTable
          data={data?.results || []}
          columns={columns}
          searchableColumns={["first_name", 'last_name', "position", "department", "status"]}
          addExportOperationsComponent={<AddAndExportEmployees />}
          title="Employees List"
          description="View and manage the employees"
        />
      </div>
    </div>
  );
};

export default EmployeesList;
