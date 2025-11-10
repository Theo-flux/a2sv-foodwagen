export enum AppModals {
  DONE = 'DONE',
  DELETE_FOOD_MODAL = 'DELETE_FOOD_MODAL',
  ADD_FOOD_MODAL = 'ADD_FOOD_MODAL'
}

export type TAppModalsAction =
  | { name?: undefined }
  | { name: ''; open?: boolean }
  | ({ name: AppModals.DELETE_FOOD_MODAL | AppModals.ADD_FOOD_MODAL } & (
      | { open: true; id: string }
      | { open?: false }
    ));
