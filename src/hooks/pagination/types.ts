export type UsePaginationState = {
  pageIndex: number;
  pageSize: number;
  totalEntities: number;
};

export type UsePaginationProps = {
  state: UsePaginationState;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onSelectPage: (pageIndex: number) => void;
  onResetPage: () => void;
};
