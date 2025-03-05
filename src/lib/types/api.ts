// types/api.ts
export interface ApiResponse<T = unknown> {
  success: true;
  code: number;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  code: number;
  message: string;
  data?: never;
}

export type ApiResponseType<T = unknown> = ApiResponse<T> | ApiErrorResponse;

// Type guard for successful response
export function isApiResponseError(
  response: unknown,
): response is ApiErrorResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    !response.success
  );
}
