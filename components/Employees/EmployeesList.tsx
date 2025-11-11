
'use client'

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CloudDownload } from "lucide-react";
import { DataTable } from "../common/DataTable";
import { Badge } from "../ui/badge";
import { employees } from "./employees";
import EmployeesRender from "./EmployeesRender";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "employee_type",
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
            row.original.status === "Active"
              ? "success"
              : row.original.status === "On Leave"
              ? "outline"
              : "destructive"
          }`}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
];

const AddAndExportEmployees = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Button>Add Employee</Button>
      <Button variant={"outline"}>
        <CloudDownload />
        Export Employees
      </Button>
    </div>
  );
};

const EmployeesList = () => {
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        {/* {isLoading && <TableSkeleton />}
                {isError || error && <TableError />} */}

        <DataTable
          data={employees}
          columns={columns}
          searchableColumns={["name", "position", "department", "status"]}
          addExportOperationsComponent={<AddAndExportEmployees />}
          title="Employees List"
          description="View and manage the employees"
        />
      </div>
    </div>
  );
};

export default EmployeesList;
