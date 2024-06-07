export type PaginatedResponse<T> = {
  entities: T[];
  total_entities: number;
  page: number;
  page_size: number;
  total_pages: number;
};
