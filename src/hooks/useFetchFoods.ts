import { useQuery } from '@tanstack/react-query';
import { food } from './FetchFactoryKey';
import { useCallback } from 'react';

export const useFetchFoods = (name?: string): IQueryHookResponse<Array<TFoodItem> | undefined> => {
  const meta = food.getFood(name);
  const memoizedSelect = useCallback((resp: Array<TFoodItem>) => resp, []);

  const { data, isLoading, error, status, isFetching } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 0
  });

  return { data, isLoading, error, status, isFetching };
};
