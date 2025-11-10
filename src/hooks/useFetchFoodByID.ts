import { useQuery } from '@tanstack/react-query';
import { food } from './FetchFactoryKey';
import { useCallback } from 'react';

export function useFetchFoodByID(id: string): IQueryHookResponse<TFoodItem | undefined> {
  const meta = food.getFoodByID(id);
  const memoizedSelect = useCallback((resp: TFoodItem) => resp, []);

  const { data, isLoading, isFetching, error, status } = useQuery({
    queryKey: meta.keys(),
    meta,
    enabled: !!id,
    select: memoizedSelect
  });

  return { data, isLoading, isFetching, error, status };
}
