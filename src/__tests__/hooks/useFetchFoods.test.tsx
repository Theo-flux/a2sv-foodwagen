import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import QueryClientTestProvider, { QueryClientTest } from '../test-utils/QueryClientProvider';
import {
  mockFoodItems,
  getMockFoodsByName,
  createMockFood,
  mockApiResponses
} from '@/__mocks__/food.mock';
import { useFetchFoods } from '@/hooks/useFetchFoods';
import foodServer from '@/requests';

describe('useFetchFoods', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = QueryClientTest();
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should fetch all meals successfully', async () => {
    (foodServer.get as any).mockResolvedValueOnce(mockApiResponses.success(mockFoodItems));

    const { result } = renderHook(() => useFetchFoods(), {
      wrapper: QueryClientTestProvider(queryClient)
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockFoodItems);
    expect(result.current.data).toHaveLength(3);
    expect(result.current.error).toBeNull();
    expect(foodServer.get).toHaveBeenCalledWith('/Food', { params: {} });
  });

  it('should fetch meals filtered by name', async () => {
    const classiItems = getMockFoodsByName('Classi');

    (foodServer.get as any).mockResolvedValueOnce(mockApiResponses.success(classiItems));

    const { result } = renderHook(() => useFetchFoods('Classi'), {
      wrapper: QueryClientTestProvider(queryClient)
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(classiItems);
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].name).toContain('Classi');
    expect(foodServer.get).toHaveBeenCalledWith('/Food', { params: { name: 'Classi' } });
  });

  it('should handle network errors', async () => {
    const errorMessage = 'Network error';
    (foodServer.get as any).mockRejectedValueOnce(
      mockApiResponses.error(errorMessage, 500, 'Internal Server Error')
    );

    const { result } = renderHook(() => useFetchFoods(), {
      wrapper: QueryClientTestProvider(queryClient)
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });

  it('should work with custom mock data', async () => {
    const customFood = createMockFood({
      name: 'Spaghetti',
      food_image: 'https://pixabay.com/photos/grill-fire-embers-barbecue-food-8225405/',
      food_rating: '4.6',
      Price: '9.99',
      restaurant_image: 'https://pixabay.com/photos/cooking-fire-southeast-asia-vietnam-4568742/',
      restaurant_name: 'La Spag',
      restaurant_status: 'Open'
    });

    (foodServer.get as any).mockResolvedValueOnce(mockApiResponses.success([customFood]));

    const { result } = renderHook(() => useFetchFoods(), {
      wrapper: QueryClientTestProvider(queryClient)
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.[0]).toEqual(customFood);
    expect(result.current.data?.[0].name).toBe('Spaghetti');
  });
});
