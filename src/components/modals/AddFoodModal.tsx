'use client';
import { useStore } from '@/store';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import { DialogModal } from './index';
import { DialogTitle, DialogHeader, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useEffectEvent, useMemo, useState } from 'react';
import { useFetchFoodByID } from '@/hooks/useFetchFoodByID';
import { useQueryClient } from '@tanstack/react-query';
import { FOOD } from '@/constants/api';
import { toast } from '@/constants/toast';
import { Form, FormField } from '../ui/form';
import InputField from '../fields/InputField';
import InputNumberField from '../fields/InputNumber';
import InputSelect from '../fields/InputSelect';
import { restaurantStatusOptions } from '@/constants';

export const AddFoodSchema = z
  .object({
    name: z.string({ error: 'Food name is required.' }).trim(),
    food_image: z.url({ error: 'Please enter a valid URL' }).trim(),
    food_rating: z.string({ error: 'Food rating is required' }).trim(),
    Price: z.string({ error: 'Food price is required' }),
    logo: z.url({ error: 'Please enter a valid URL' }).trim(),
    restaurant_name: z.string({ error: 'Restaurant name is required' }).trim(),
    open: z.string({ error: 'Restaurant status is required' }).trim()
  })
  .superRefine((data, ctx) => {
    const { food_rating } = data;
    const parsedFoodRating = Number(food_rating);

    if (parsedFoodRating > 5) {
      ctx.addIssue({
        code: 'custom',
        path: ['food_rating'],
        message: 'Food rating should be between 0 and 5.'
      });
    }
  });

export type TAddFoodSchema = z.infer<typeof AddFoodSchema>;

const AddFoodModal = () => {
  const [foodData, setFoodData] = useState<Partial<TAddFoodSchema>>({});
  const {
    AppConfigStore: { toggleModals, isLoading, isOpen, addFood, updateFood, dataModal }
  } = useStore();
  const isEditMode = !!dataModal.id;
  const queryClient = useQueryClient();

  const { data, isLoading: isFoodLoading } = useFetchFoodByID(dataModal.id);

  const defaultValues = useMemo(() => {
    if (!isEditMode || !data) return {};
    const food_image = data.food_image || data.image || data.avatar || '';
    const name = data.food_name || data.name;
    const food_rating = data.food_rating?.toString() || data.rating;
    const logo = data.restaurant_image || data.logo;
    const restaurant_name = data.restaurant_name || data.name;
    const Price = data.Price;
    const open = data.open ? 'Open' : 'Closed';

    return {
      name,
      food_image,
      food_rating,
      logo,
      Price,
      restaurant_name,
      open
    };
  }, [data, isEditMode]);

  const form = useForm<TAddFoodSchema>({
    defaultValues,
    resolver: zodResolver(AddFoodSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const foodWatch = useWatch({ control: form.control });
  const hasChanged = _.isEqual(foodData, foodWatch);

  const getChangedFields = (original: Partial<TAddFoodSchema>, current: TAddFoodSchema) => {
    return _.pickBy(current, (value, key) => {
      return !_.isEqual(original[key as keyof typeof original], value);
    });
  };

  const onSubmit = (formData: TAddFoodSchema) => {
    if (isEditMode) {
      const changedValue = getChangedFields(foodData, formData);
      if (Object.keys(changedValue).length > 0) {
        updateFood(dataModal.id, changedValue, () => {
          toggleModals({});
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === FOOD.GET_ALL
          });
        });
      } else {
        toast.success('Nothing to update.');
      }
      return;
    } else {
      const cb = () => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === FOOD.GET_ALL
        });
        return toggleModals({});
      };
      addFood(formData, cb);
    }
  };

  const onClose = () => {
    form.reset();
    toggleModals({});
  };

  const handleUpdate = useEffectEvent(() => {
    form.reset(defaultValues);
    setFoodData(defaultValues);
  });

  useEffect(() => {
    if (isEditMode && data) {
      handleUpdate();
    }
  }, [isEditMode, data, form.reset]);

  return (
    <DialogModal closeModal={onClose} isOpen={isOpen.ADD_FOOD_MODAL}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="h-svh w-full md:h-auto"
      >
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit' : 'Add a'} Meal</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="food-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative flex h-[90svh] w-full flex-col justify-between space-y-6 md:h-auto"
          >
            <fieldset
              disabled={isLoading.isAddingFood || isFoodLoading}
              className="mb-5 flex w-full flex-col space-y-3"
            >
              <FormField
                name="name"
                render={({ field }) => (
                  <InputField required label="Food name" placeholder="" {...field} />
                )}
              />

              <FormField
                name="food_image"
                render={({ field }) => (
                  <InputField required label="Food image (link)" placeholder="" {...field} />
                )}
              />

              <FormField
                name="food_rating"
                render={({ field: { onChange, ...rest } }) => (
                  <InputNumberField
                    required
                    label="Food rating"
                    thousandSeparator=","
                    decimalSeparator="."
                    decimalScale={1}
                    min={0}
                    max={5}
                    placeholder=""
                    allowNegative={false}
                    allowLeadingZeros={false}
                    valueIsNumericString={true}
                    onValueChange={(values) => {
                      onChange(values.value);
                    }}
                    {...rest}
                  />
                )}
              />

              <FormField
                name="Price"
                render={({ field: { onChange, ...rest } }) => (
                  <InputNumberField
                    required
                    label="Food price"
                    thousandSeparator=","
                    decimalSeparator="."
                    prefix="$"
                    decimalScale={2}
                    placeholder=""
                    allowNegative={false}
                    allowLeadingZeros={false}
                    valueIsNumericString={true}
                    onValueChange={(values) => {
                      onChange(values.value);
                    }}
                    {...rest}
                  />
                )}
              />

              <FormField
                name="restaurant_name"
                render={({ field }) => (
                  <InputField required label="Restaurant name" placeholder="" {...field} />
                )}
              />

              <FormField
                name="logo"
                render={({ field }) => (
                  <InputField required label="Restaurant logo (link)" placeholder="" {...field} />
                )}
              />

              <FormField
                name="open"
                render={({ field }) => (
                  <InputSelect
                    required
                    {...field}
                    items={restaurantStatusOptions}
                    label="Restaurant status (open/close)"
                    placeholder=""
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </fieldset>
          </form>
        </Form>

        <DialogFooter className="absolute bottom-0 left-0 w-full px-4 md:static md:bottom-auto md:left-auto md:p-0">
          <div className="flex w-full flex-col items-center justify-between gap-4 py-3 md:flex-row md:p-0">
            {isEditMode ? (
              <Button
                size="lg"
                disabled={hasChanged || isLoading.isAddingFood}
                isLoading={isLoading.isAddingFood}
                type="submit"
                form="food-form"
                className="w-full md:w-[48%]"
              >
                {isLoading.isAddingFood ? 'Updating food' : 'Save'}
              </Button>
            ) : (
              <Button
                size="lg"
                disabled={isLoading.isAddingFood}
                isLoading={isLoading.isAddingFood}
                type="submit"
                form="food-form"
                className="w-full md:w-[48%]"
              >
                {isLoading.isAddingFood ? 'Adding food' : 'Add'}
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              disabled={isLoading.isAddingFood}
              type="button"
              form="isAddingFood"
              className="w-full md:w-[48%]"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </DialogModal>
  );
};

export default observer(AddFoodModal);
