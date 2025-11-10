import { FOOD } from '@/constants/api';

export const food = {
  getFood(name?: string) {
    return {
      path: FOOD.GET_ALL,
      keys: () => [FOOD.GET_ALL, name] as const,
      params: { name }
    };
  },

  getFoodByID(id: string) {
    return {
      path: FOOD.BY_ID.replace(':id', id),
      keys: () => [FOOD.GET_ALL, FOOD.BY_ID, id] as const
    };
  }
};
