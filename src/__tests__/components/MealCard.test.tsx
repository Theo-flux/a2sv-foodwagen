import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MealCard from '@/components/MealCard';
import { mockFoodItems } from '@/__mocks__/food.mock';

const mockToggleModals = vi.fn();

vi.mock('@/store', () => ({
  useStore: () => ({
    AppConfigStore: {
      toggleModals: mockToggleModals
    }
  })
}));

vi.mock('next/image', () => {
  return {
    default: ({ src, alt, className, onError }: any) => {
      return (
        <img
          src={src}
          alt={alt}
          className={className}
          data-testid={alt === 'Restaurant logo' ? 'food-restaurant-logo' : 'food-image'}
          onError={onError}
        />
      );
    }
  };
});

describe('MealCard', () => {
  let user: ReturnType<typeof userEvent.setup>;
  const mockMealWithFallbacks: TFoodItem = {
    id: '2',
    name: 'Fallback Meal',
    Price: '8.99',
    rating: '4.0',
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
  };

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    cleanup();
  });

  it('should render all meal information correctly', () => {
    render(<MealCard meal={mockFoodItems[0]} />);

    expect(screen.getByText('Classi Cheddar Smash Burger')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByText('4.4')).toBeInTheDocument();
    expect(screen.getByText('Open Now')).toBeInTheDocument();
  });

  it('should use fallback values when primary props are missing', () => {
    render(<MealCard meal={mockMealWithFallbacks} />);

    expect(screen.getByText('Fallback Meal')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('$8.99')).toBeInTheDocument();
  });

  it('should display "Closed" when restaurant is not open', () => {
    const mockClosedMeal: TFoodItem = {
      ...mockFoodItems[0],
      restaurant_status: 'Closed',
      open: false,
      status: 'closed'
    };
    render(<MealCard meal={mockClosedMeal} />);

    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('should render all images with correct sources and fallbacks', () => {
    render(<MealCard meal={mockFoodItems[1]} />);

    const foodImage = screen.getByTestId('food-image');
    expect(foodImage).toHaveAttribute(
      'src',
      'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&w=600&h=400&fit=crop'
    );

    const restaurantLogo = screen.getByTestId('food-restaurant-logo');
    expect(restaurantLogo).toHaveAttribute(
      'src',
      'https://www.pexels.com/photo/grayscale-photo-of-fish-in-water-12521170/'
    );
  });

  it('should render dropdown menu with edit and delete options', async () => {
    render(<MealCard meal={mockFoodItems[1]} />);

    const dropdownTrigger = screen.getByTestId('food-dropdown-trigger');
    await user.click(dropdownTrigger);

    expect(screen.getByTestId('food-edit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-delete-btn')).toBeInTheDocument();
  });

  it('should call toggleModals with correct parameters when edit is clicked', async () => {
    render(<MealCard meal={mockFoodItems[2]} />);

    const dropdownTrigger = screen.getByTestId('food-dropdown-trigger');
    await user.click(dropdownTrigger);

    const editButton = screen.getByTestId('food-edit-btn');
    await user.click(editButton);

    expect(mockToggleModals).toHaveBeenCalledWith({
      open: true,
      name: 'ADD_FOOD_MODAL',
      id: '81'
    });
  });

  it('should call toggleModals with correct parameters when delete is clicked', async () => {
    render(<MealCard meal={mockFoodItems[0]} />);

    const dropdownTrigger = screen.getByTestId('food-dropdown-trigger');
    await user.click(dropdownTrigger);

    await screen.findByTestId('food-delete-btn');

    const deleteButton = screen.getByTestId('food-delete-btn');
    await user.click(deleteButton);

    expect(mockToggleModals).toHaveBeenCalledWith({
      open: true,
      name: 'DELETE_FOOD_MODAL',
      id: '24'
    });
  });

  it('should apply correct CSS classes for closed restaurant', () => {
    render(<MealCard meal={mockFoodItems[1]} />);

    const statusElement = screen.getByText('Closed');
    expect(statusElement).toHaveClass('bg-orange-100', 'text-orange-600');
  });

  it('should render rating with star icon', () => {
    render(<MealCard meal={mockFoodItems[0]} />);

    const ratingElement = screen.getByText('4.4');
    expect(ratingElement).toBeInTheDocument();

    const starIcon = screen.getByTestId('food-rating-star');
    expect(starIcon).toBeInTheDocument();

    const ratingContainer = ratingElement.closest('div');
    expect(ratingContainer).toContainElement(starIcon);
  });
});
