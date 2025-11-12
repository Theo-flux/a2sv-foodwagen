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
import { toast } from '@/constants/toast';
import { Button } from '@/components/ui/button';
import { FOOD } from '@/constants/api';

const DeleteFoodModal = () => {
  const {
    AppConfigStore: { toggleModals, isOpen, isLoading, deleteFood, dataModal }
  } = useStore();

  const queryClient = useQueryClient();

  return (
    <DialogModal
      closeModal={() => toggleModals({ name: AppModals.DELETE_FOOD_MODAL, open: false })}
      isOpen={isOpen.DELETE_FOOD_MODAL}
    >
      <DialogContent className="py-8">
        <DialogHeader>
          <DialogTitle>Delete Meal</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this meal? Actions cannot be reversed.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex items-center justify-between space-x-3">
          <Button
            type="button"
            size="lg"
            className="w-full md:w-[50%]"
            onClick={() =>
              deleteFood(dataModal.id, () => {
                queryClient.invalidateQueries({
                  predicate: (query) => query.queryKey[0] === FOOD.GET_ALL
                });
                toggleModals({});
              })
            }
            disabled={isLoading.isDeletingFood}
            isLoading={isLoading.isDeletingFood}
          >
            {isLoading.isDeletingFood ? 'Deleting food' : 'Yes'}
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

export default observer(DeleteFoodModal);
