import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  UsePaginationProps,
} from "@/hooks/pagination/types";
import { usePagination } from "@/hooks/pagination/usePagination";

type DataPaginationProps = UsePaginationProps & { className?: string };
export function DataPagination({
  className,
  ...paginationProps
}: DataPaginationProps) {
  const {
    onNextPage,
    onPreviousPage,
    onPageSelection,
    state: { pageIndex, totalPages },
  } = usePagination(paginationProps);

  const hasPreviousPage = pageIndex > 0;
  const hasMultiplePreviousPages = pageIndex > 1;

  const hasNextPage = pageIndex < totalPages - 1;
  const hasMultipleNextPages = pageIndex < totalPages - 2;

  return (
    <Pagination className={className}>
      <PaginationContent>
        {hasPreviousPage && (
          <>
            <PaginationItem>
              <PaginationPrevious onClick={onPreviousPage} />
            </PaginationItem>
            {hasMultiplePreviousPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => onPageSelection(pageIndex - 1)}>
                {pageIndex}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink isActive>{pageIndex + 1}</PaginationLink>
        </PaginationItem>
        {hasNextPage && (
          <>
            <PaginationItem onClick={() => onPageSelection(pageIndex + 1)}>
              <PaginationLink>{pageIndex + 2}</PaginationLink>
            </PaginationItem>
            {hasMultipleNextPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem onClick={onNextPage}>
              <PaginationNext />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
