export type UsePaginationState = {
  pageIndex: number;
  pageSize: number;
  totalEntities: number;
  totalPages: number;
};

export const DEFAULT_PAGINATION_STATE: UsePaginationState = {
  pageIndex: 0,
  pageSize: 0,
  totalEntities: 0,
  totalPages: 0,
};

export type UsePaginationProps = {
  state: UsePaginationState;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onSelectPage: (pageIndex: number) => void;
  onResetPage: () => void;
};
