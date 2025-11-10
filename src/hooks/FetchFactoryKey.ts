import { FOOD } from '@/constants/api';

export const food = {
  getFood(name?: string) {
    return {
      path: FOOD.GET_ALL,
      keys: () => [FOOD.GET_ALL, name] as const,
      params: { name }
    };
  }
};
