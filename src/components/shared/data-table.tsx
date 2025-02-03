"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  RowData,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { NoResults } from "@/components/projects/no-results";
import { Project } from "../../../db/schema";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

declare module "@tanstack/table-core" {
  interface FilterFns {
    customFilter: <TData extends RowData>(
      row: TData,
      columnId: string,
      filterValue: boolean,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addMeta: (meta: any) => void
    ) => boolean;
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const searchParams = useSearchParams();

  // Get filter values from URL
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";
  const priorityFilter = searchParams.get("priority") || "";
  const statusFilter = searchParams.get("status")?.toLowerCase() || "";
  const departmentFilter = searchParams.get("department") || "";

  // Custom filter function
  const customFilter = (row: TData) => {
    const project = row as unknown as Project;

    // Search filter
    const searchMatches =
      !searchQuery ||
      project.projectName.toLowerCase().includes(searchQuery) ||
      project.department.toLowerCase().includes(searchQuery) ||
      (project.bdNumber?.toLowerCase() || "").includes(searchQuery);

    // Priority filter
    const priorityMatches =
      !priorityFilter || project.priority === priorityFilter;

    // Status filter
    const statusMatches =
      !statusFilter || project.status.toLowerCase() === statusFilter;

    // Department filter
    const departmentMatches =
      !departmentFilter || project.department === departmentFilter;

    return (
      searchMatches && priorityMatches && statusMatches && departmentMatches
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: true,
    },
    filterFns: {
      customFilter: () => true, // Placeholder to satisfy TypeScript
    },
    globalFilterFn: (row) => customFilter(row.original),
    enableFilters: true,
  });

  const filteredRows = table.getRowModel().rows;

  if (filteredRows.length === 0) {
    return <NoResults />;
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
            ))}
          </TableHeader>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
