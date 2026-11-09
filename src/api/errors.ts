export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number | null = null,
    public readonly code: string = 'API_ERROR',
    public readonly detail?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
