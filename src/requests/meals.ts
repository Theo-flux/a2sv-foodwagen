import { FOOD } from '@/constants/api';
import server from '.';
import { TAddFoodSchema } from '@/components/modals/AddFoodModal';

export const postAddFood = async (payload: TAddFoodSchema) =>
  server.post(FOOD.GET_ALL, { ...payload });

export const putUpdateFood = async ({
  id,
  payload
}: {
  id: string;
  payload: Partial<TAddFoodSchema>;
}) => server.put(FOOD.BY_ID.replace(':id', id), { ...payload });

export const delFood = async (id: string) => server.delete(FOOD.BY_ID.replace(':id', id));
