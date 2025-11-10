'use client';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useQueryClient } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { DialogModal } from './index';
import {
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FOOD } from '@/constants/api';

const AddFoodModal = () => {
  const {
    AppConfigStore: { toggleModals, isOpen, isLoading, deleteFood, dataModal }
  } = useStore();

  const queryClient = useQueryClient();

  const handle = () =>
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === FOOD.GET_ALL
    });
  toggleModals({});

  return (
    <DialogModal
      closeModal={() => toggleModals({ name: AppModals.ADD_FOOD_MODAL, open: false })}
      isOpen={isOpen.ADD_FOOD_MODAL}
    >
      <DialogContent className="py-8">
        <DialogHeader>
          <DialogTitle>Add Meal</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this meal? Actions cannot be reversed.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex items-center justify-between space-x-3">
          <Button
            type="button"
            size="lg"
            className="w-full md:w-[50%]"
            onClick={() => deleteFood(dataModal.id, () => {})}
            disabled={isLoading.isDeletingFood}
            isLoading={isLoading.isDeletingFood}
          >
            Add
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full md:w-[50%]"
            onClick={() => toggleModals({})}
            disabled={isLoading.isDeletingFood}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </DialogModal>
  );
};

export default observer(AddFoodModal);
