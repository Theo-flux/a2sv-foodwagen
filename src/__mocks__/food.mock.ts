import { TAddFoodSchema } from '@/components/modals/AddFoodModal';

export const mockFoodItems: Array<TFoodItem> = [
  {
    createdAt: '2025-11-10T08:59:15.343Z',
    name: 'Classi Cheddar Smash Burger',
    avatar: 'https://picsum.photos/seed/6UtNCB020L/1083/2301?blur=2',
    rating: '4.5',
    open: true,
    logo: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80',
    Price: '12.99',
    id: '24',
    restaurant_name: 'Burger Barn',
    image:
      'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80',
    status: 'Open Now',
    food_rating: 4.4
  },
  {
    createdAt: '2025-11-10T17:56:25.751Z',
    name: 'Barrett Shelton',
    avatar: 'https://picsum.photos/seed/qmoV9mhB9L/2223/1914?blur=6',
    rating: '4',
    open: false,
    logo: 'https://www.pexels.com/photo/grayscale-photo-of-fish-in-water-12521170/',
    Price: '384',
    id: '55',
    image:
      'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&w=600&h=400&fit=crop',
    restaurant_name: 'Rhea Powell',
    status: 'Closed'
  },

  {
    id: '81',
    name: 'Test Burger',
    food_name: 'Deluxe Burger',
    Price: '12.99',
    rating: '4.5',
    food_rating: 4.5,
    restaurant_name: 'Burger Palace',
    restaurant_status: 'open',
    food_image: 'https://example.com/burger.jpg',
    restaurant_image: 'https://example.com/restaurant-logo.jpg',
    open: true,
    status: 'open',
    avatar: 'https://example.com/avatar.jpg',
    logo: 'https://example.com/logo.jpg',
    createdAt: '2023-01-01'
  }
];

export const createMockFood = (overrides?: Partial<TAddFoodSchema>): TFoodItem => {
  const createdFood = {
    createdAt: '2025-11-10T13:59:16.179Z',
    name: 'Spaghetti',
    avatar: 'https://picsum.photos/seed/J4uPY/2958/2800?grayscale&blur=9',
    rating: '38937',
    open: false,
    logo: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/88.jpg',
    Price: '9.99',
    id: '59',
    food_image: 'https://pixabay.com/photos/grill-fire-embers-barbecue-food-8225405/',
    food_rating: 4.6,
    restaurant_image: 'https://pixabay.com/photos/cooking-fire-southeast-asia-vietnam-4568742/',
    restaurant_name: 'La Spag',
    restaurant_status: 'Open'
  };

  mockFoodItems.push(createdFood);
  return createdFood;
};

export const getMockFoodById = (id: string): TFoodItem | undefined => {
  return mockFoodItems.find((food) => food.id === id);
};

export const getMockFoodsByName = (name: string): TFoodItem[] => {
  return mockFoodItems.filter((food) => food.name.toLowerCase().includes(name.toLowerCase()));
};

export const mockApiResponses = {
  success: (data: any) => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {}
  }),

  error: (message: string, status: number = 500, statusText: string = 'Error') => ({
    response: {
      data: message,
      status,
      statusText
    },
    message
  }),

  notFound: () => ({
    response: {
      data: 'Not found',
      status: 404,
      statusText: 'Not Found'
    },
    message: 'Not found'
  })
};
