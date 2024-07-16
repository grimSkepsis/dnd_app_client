"use client";

import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataPagination } from "./data-pagination";
import { UsePaginationState } from "@/hooks/pagination/types";
import isNil from "lodash/isNil";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  rowCount?: number;
  onPaginationChange: OnChangeFn<PaginationState>;
  onSortingChange?: OnChangeFn<SortingState>;
  sortingState?: SortingState;
  paginationState?: UsePaginationState;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  onPageSelection?: (pageIndex: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  rowCount,
  onPaginationChange,
  onSortingChange,
  paginationState,
  sortingState,
  onNextPage: handleNextPage,
  onPreviousPage: handlePreviousPage,
  onPageSelection: handlePageSelection,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount,
    rowCount,
    onPaginationChange,
    onSortingChange,
    state: {
      pagination: {
        pageIndex: paginationState?.pageIndex ?? 0,
        pageSize: paginationState?.pageSize ?? 10,
      },
      sorting: sortingState,
    },
  });

  function onNextPage() {
    handleNextPage?.();
  }

  function onPreviousPage() {
    handlePreviousPage?.();
  }

  function onResetPage() {}

  function onPageSelection(pageIndex: number) {
    handlePageSelection?.(pageIndex);
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
      </div>
      {!isNil(paginationState) && (
        <DataPagination
          state={paginationState}
          onNextPage={onNextPage}
          onResetPage={onResetPage}
          onPreviousPage={onPreviousPage}
          onSelectPage={onPageSelection}
        />
      )}
    </>
  );
}
