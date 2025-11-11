import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import QueryClientTestProvider, { QueryClientTest } from './QueryClientProvider';
import { mockApiResponses, getMockFoodById } from '@/__mocks__/food.mock';
import { useFetchFoodByID } from '@/hooks/useFetchFoodByID';
import foodServer from '@/requests';

vi.mock('@/requests', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}));

vi.mock('@/constants/api', () => ({
  FOOD: {
    GET_ALL: '/Food',
    BY_ID: '/Food/:id'
  }
}));

describe('useFetchFoodByID', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = QueryClientTest();
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should fetch a meal by ID successfully', async () => {
    const id = '55';
    const foodById = getMockFoodById(id);
    (foodServer.get as any).mockResolvedValueOnce(mockApiResponses.success(foodById));

    const { result } = renderHook(() => useFetchFoodByID(id), {
      wrapper: QueryClientTestProvider(queryClient)
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(foodById);
    expect(result.current.data?.name).toContain(foodById?.name);
    expect(foodServer.get).toHaveBeenCalledWith('/Food/55', { params: undefined });
  });

  it('should handle unavailable ID gracefully', async () => {
    const id = '67890098666';
    (foodServer.get as any).mockResolvedValueOnce(mockApiResponses.notFound());

    const { result } = renderHook(() => useFetchFoodByID(id), {
      wrapper: QueryClientTestProvider(queryClient)
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.name).toBeUndefined;
    expect(foodServer.get).toHaveBeenCalledWith('/Food/67890098666', { params: undefined });
  });
});
