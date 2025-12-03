"use client";
import { DataTable } from "../common/DataTable";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "../common/ActionsDropDown";
import { useQuery } from "@tanstack/react-query";
import TableLoader from "../common/TableLoader";
import { Department, DepartmentResponse } from "./types";
import { getDepartments } from "./actions";
import { AddDepartment } from "./AddDepartment";
import { UpdateDepartment } from "./UpdateDepartment";
import { DeleteDepartment } from "./DeleteDepartment";

const columns: ColumnDef<Department>[] = [
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
      return <div>{formatDate(row.original.date_created)}</div>;
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <ActionDropdown>
          <UpdateDepartment department={row.original} />
          <DeleteDepartment department_id={row.original.id.toString()} />
        </ActionDropdown>
      );
    },
  },
];

const DepartmentsList = ({ initialData }: { initialData: DepartmentResponse }) => {

  const AddAndExportDepartments = () => {
    return (
      <div className="flex items-center gap-x-2">
        <AddDepartment />
      </div>
    );
  };

  return (
    <div>
      {initialData && (
        <DataTable
          columns={columns}
          searchableColumns={["name", "code"]}
          title="All Departments"
          addExportOperationsComponent={<AddAndExportDepartments />}
          description="List of all departments in the organization"
          data={initialData?.results || []}
        />
      )}
    </div>
  );
};

export default DepartmentsList;
