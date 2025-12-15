import z from "zod";

export const paginationRequestSchema = z.object({
  page: z.int().min(1).default(1),
  pageSize: z.int().min(1).default(10),
});

export type PaginationRequest = z.infer<typeof paginationRequestSchema>;

export type PaginationResult<T> = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: T[];
};

export type CreatePaginationResultParams<T> = {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
};

export function createPaginationResult<T>(
  params: CreatePaginationResultParams<T>,
) {
  return {
    page: params.page,
    pageSize: params.pageSize,
    totalItems: params.totalItems,
    totalPages: Math.ceil(params.totalItems / params.pageSize),
    hasNextPage: params.page * params.pageSize < params.totalItems,
    hasPreviousPage: params.page > 1,
    items: params.items,
  };
}
