import { makeObservable, observable, action, flow } from 'mobx';
import { RootStore } from '@/store';
import initializer from '@/utils/initializer';
import { AppModals, TAppModalsAction } from './appModalTypes';
import { delFood, postAddFood, putUpdateFood } from '@/requests/meals';
import { toast } from '@/constants/toast';
import { TAddFoodSchema } from '@/components/modals/AddFoodModal';

const INIT_IS_OPEN = initializer(AppModals, false);

const INIT_IS_LOADING = {
  isDeletingFood: false,
  isAddingFood: false
};

class AppConfigStore {
  rootStore: RootStore;
  nuonce = 0;
  isOpen = { ...INIT_IS_OPEN };
  isLoading = { ...INIT_IS_LOADING };
  errors = initializer(this.isLoading, '');
  dataModal = {
    id: ''
  };

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      nuonce: observable,
      isOpen: observable,
      isLoading: observable,
      errors: observable,
      dataModal: observable,

      toggleModals: action.bound,
      addFood: flow.bound,
      updateFood: flow.bound,
      deleteFood: flow.bound
    });
    this.rootStore = rootStore;
  }

  setModalOpenState(name: AppModals, open?: boolean) {
    this.isOpen[name] = typeof open === 'undefined' ? !this.isOpen[name] : open;
  }

  toggleModals(modal: TAppModalsAction = {}) {
    switch (modal.name) {
      case '':
        break;
      case AppModals.ADD_FOOD_MODAL:
        if (modal.open) {
          this.dataModal = {
            id: modal.id
          };
        }
        break;
      case AppModals.DELETE_FOOD_MODAL:
        if (modal.open) {
          this.dataModal = {
            id: modal.id
          };
        }
        break;
      default:
        this.isOpen = { ...INIT_IS_OPEN };
        break;
    }
    if (modal.name && AppModals[modal.name] !== undefined) {
      this.setModalOpenState(modal.name, modal.open);
    }

    this.nuonce = new Date().getTime();
  }

  *addFood(payload: TAddFoodSchema, cb?: () => void) {
    this.isLoading.isAddingFood = true;
    this.errors.isAddingFood = '';
    try {
      yield postAddFood(payload);
      toast.success('Food added successfully!');
      cb?.();
    } catch (error) {
      toast.error('unable to add food.');
    } finally {
      this.isLoading.isAddingFood = false;
      this.errors.isAddingFood = '';
    }
  }

  *updateFood(id: string, payload: Partial<TAddFoodSchema>, cb?: () => void) {
    this.isLoading.isAddingFood = true;
    this.errors.isAddingFood = '';
    try {
      yield putUpdateFood({ id, payload });
      toast.success('Food updated successfully!');
      cb?.();
    } catch (error) {
      toast.error('unable to update food.');
    } finally {
      this.isLoading.isAddingFood = false;
      this.errors.isAddingFood = '';
    }
  }

  *deleteFood(id: string, cb?: () => void) {
    this.isLoading.isDeletingFood = true;
    this.errors.isDeletingFood = '';
    try {
      yield delFood(id);
      toast.success('Food deleted successfully!');
      cb?.();
    } catch (error) {
      toast.error('unable to delete food.');
    } finally {
      this.isLoading.isDeletingFood = false;
      this.errors.isDeletingFood = '';
    }
  }
}

export default AppConfigStore;
