declare module '*.css' {
  const content: Record<string, string>;

  export default content;
}

type TOption = { value: string; label: string; disable?: boolean };

interface IQueryHookResponse<D> {
  data: D;
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
  status: 'error' | 'success' | 'pending';
}

type TFoodItem = {
  createdAt: string;
  name: string;
  avatar: string;
  rating: string;
  open: Boolean;
  logo: string;
  Price: string;
  id: string;
  food_name?: string;
  food_rating?: number;
  food_image?: string;
  restaurant_name?: string;
  restaurant_image?: string;
  restaurant_status?: string;
  image?: string;
  status?: string;
};
