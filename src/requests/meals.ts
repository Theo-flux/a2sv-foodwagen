import { FOOD } from '@/constants/api';
import server from '.';

export const delFood = async (id: string) => server.delete(FOOD.BY_ID.replace(':id', id));
