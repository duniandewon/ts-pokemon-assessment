export interface PaginatedResponse extends Response {
  pagination: Pagination;
}

export interface Response {
  meta: Meta;
}

interface Meta {
  code: number;
  message: string;
}

interface Pagination {
  hasNext: boolean;
  nextOffset: number;
}
