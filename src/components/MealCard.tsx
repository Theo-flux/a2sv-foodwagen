import { foodwagenIcon, foodwagenLogo } from '@/constants';
import { EllipsisVertical, Star, Tag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Button } from './ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

const MealCard = ({ meal }: { meal: TFoodItem }) => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  const foodImage = meal.food_image || meal.image || meal.avatar || '';
  const foodName = meal.food_name || meal.name;
  const foodRating = meal.food_rating?.toString() || meal.rating;
  const restaurantLogo = meal.restaurant_image || meal.logo;
  const restaurantName = meal.restaurant_name || meal.name;
  const isOpen = meal.restaurant_status === 'open' || meal.status === 'open' || meal.open;

  return (
    <div className="w-full overflow-clip bg-white">
      <div className="relative">
        <figure className="h-64 w-full overflow-clip rounded-lg bg-neutral-100">
          <Image
            src={foodImage}
            alt={foodName}
            width={100}
            height={100}
            className="h-full w-full object-cover"
            loader={({ src }) => src}
            onError={(event) => {
              event.currentTarget.id = foodwagenLogo;
              event.currentTarget.srcset = foodwagenLogo;
              event.currentTarget.style.scale = '0.5';
              event.currentTarget.style.objectFit = 'contain';
            }}
          />
        </figure>

        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-lg font-bold text-white shadow-lg">
          <Tag />
          <span>${meal.Price}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <figure className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={restaurantLogo}
                alt="Restaurant logo"
                width={100}
                height={100}
                className="h-full w-full object-cover"
                loader={({ src }) => src}
                onError={(event) => {
                  event.currentTarget.id = foodwagenIcon;
                  event.currentTarget.srcset = foodwagenIcon;
                  event.currentTarget.style.scale = '0.5';
                  event.currentTarget.style.objectFit = 'contain';
                }}
              />
            </figure>
            <div>
              <h3 className="line-clamp-1 text-xl font-bold text-ellipsis text-gray-900">
                {restaurantName}
              </h3>
              <div className="mt-1 flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold text-yellow-500">{foodRating}</span>
              </div>
            </div>
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              asChild
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Button variant="ghost" className="data-[state=open]:bg-muted flex">
                <EllipsisVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-fit">
              <DropdownMenuItem
                onClick={() =>
                  toggleModals({ open: true, name: AppModals.ADD_FOOD_MODAL, id: meal.id })
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  toggleModals({ open: true, name: AppModals.DELETE_FOOD_MODAL, id: meal.id })
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div
          data-restaurant-status={isOpen}
          className="inline-block rounded-full bg-orange-100 px-6 py-2 text-base font-semibold text-orange-600 data-[restaurant-status=true]:bg-green-100 data-[restaurant-status=true]:text-green-700"
        >
          {isOpen ? 'Open Now' : 'Closed'}
        </div>
      </div>
    </div>
  );
};

export default observer(MealCard);
