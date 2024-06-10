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
  UsePaginationState,
} from "@/hooks/pagination/types";
import { usePagination } from "@/hooks/pagination/usePagination";

type DataPaginationProps = UsePaginationProps;
export function DataPagination(props: DataPaginationProps) {
  const { onNextPage, onPreviousPage, onPageSelection } = usePagination(props);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPreviousPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => onPageSelection(1)}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem onClick={onNextPage}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
