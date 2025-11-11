"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import { Card } from "../ui/card";

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  searchableColumns?: string[];
  title?: string;
  description?: string;
  addExportOperationsComponent?: React.ReactNode;
  tableFiltersComponent?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
};

export function DataTable<TData>({
  data,
  columns,
  title = "Data Table",
  description = "A table displaying data with sorting, filtering, and pagination capabilities.",
  searchableColumns = [],
  isLoading,
  addExportOperationsComponent,
  tableFiltersComponent,
  isError,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row: any, columnId: any, filterValue: any) => {
      return searchableColumns.some((col) => {
        const value = row.getValue(col);
        return String(value ?? "")
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    },
  });

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  // Helper: compute which pages to show
  const getVisiblePages = (current: number, total: number) => {
    const visible = 4;
    if (total <= visible) return Array.from({ length: total }, (_, i) => i);
    const half = Math.floor(visible / 2);
    let start = Math.max(current - half, 0);
    const end = Math.min(start + visible - 1, total - 1);
    if (end - start + 1 < visible) start = Math.max(end - visible + 1, 0);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="overflow-x-auto w-full">
   <div className="flex flex-col items-center md:flex-row justify-between" >
     <div>
        <h2 className="text-2xl font-semibold text-primary mt-4 ">{title}</h2>
      <p className="text-sm text-secondary mb-2">{description}</p>
    </div>
     {addExportOperationsComponent}
   </div>

      <div className="flex items-center py-5">
        {searchableColumns.length > 0 && (
          <Input
            placeholder={`Search by ${searchableColumns.join(", ")}`}
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-lg rounded-full py-3 px-4 bg-card backdrop-blur-lg border"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col: { getCanHide: () => any }) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {tableFiltersComponent}

      {isLoading ? (
        <div>
          <p>
            <Loader2 className="animate-spin" />
            Loading...
          </p>
        </div>
      ) : (
        <div className=" ">
          {" "}
          {/* Parent container */}
          <Card className="overflow-x-auto w-full text-sm font-medium ">
            <Table className="w-full">
              <TableHeader>
                {table
                  .getHeaderGroups()
                  .map(
                    (headerGroup: {
                      id: React.Key | null | undefined;
                      headers: any[];
                    }) => (
                      <TableRow key={headerGroup.id} className="bg-muted">
                        <TableHead className="w-[60px] text-center">
                          #
                        </TableHead>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    )
                  )}
              </TableHeader>
              <TableBody>
                {table?.getRowModel()?.rows.length ? (
                  table.getRowModel().rows.map((row: any, rowIndex: number) => (
                    <TableRow
                      key={row.id}
                      className="py-2"
                      data-state={row.getIsSelected() && "selected"}
                    >
                      <TableCell className="text-center font-medium">
                        {row.id}
                      </TableCell>
                      {row.getVisibleCells().map((cell: any) => (
                        <TableCell key={cell.id} className="text-base py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      <div className="flex items-center justify-between py-4">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <Pagination className="flex items-center justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.previousPage();
                }}
                className={
                  !table.getCanPreviousPage()
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              />
            </PaginationItem>

            {visiblePages[0] > 0 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(0);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {visiblePages.map((i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={i === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(i);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(totalPages - 1);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.nextPage();
                }}
                className={
                  !table.getCanNextPage()
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
