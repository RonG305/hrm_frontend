"use client";
import { DataTable } from "../common/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../common/ActionsDropDown";
import { Employee } from "../Employees/types";
import { UserResponse } from "./types";
import { Badge } from "../ui/badge";
import { UpdateEmployee } from "../Employees/UpdateEmployee";
import { DeleteEmployee } from "../Employees/DeleteEmployee";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { ToggleActiveStatus } from "../Employees/ToggleActiveStatus";
import { AddEmployee } from "../Employees/AddEmployee";

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-medium">
            {row.original.first_name} {row.original.last_name}
          </p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      );
    },
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
          <Link
            className="text-primary flex items-center gap-x-2"
            href={`/dashboard/profile/${row.original.id}`}
          >
            <UserIcon />
            <p>View Profile</p>
          </Link>
          <ToggleActiveStatus employee={row.original} />
        </ActionDropdown>
      );
    },
  },
];

const UsersList = ({ initialData }: { initialData: UserResponse }) => {
  const AddAndExportDepartments = () => {
    return (
      <div className="flex items-center gap-x-2">
        <AddEmployee title="Add User" />
      </div>
    );
  };

  return (
    <div>
      {initialData && (
        <DataTable
          columns={columns}
          searchableColumns={["name", "code"]}
          title="All Users"
          addExportOperationsComponent={<AddAndExportDepartments />}
          description="List of all users in the organization"
          data={initialData?.results || []}
        />
      )}
    </div>
  );
};

export default UsersList;
