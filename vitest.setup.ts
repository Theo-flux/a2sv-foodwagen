import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('@/requests', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}));

vi.mock('@/constants/api', () => ({
  FOOD: {
    GET_ALL: '/Food',
    BY_ID: '/Food/:id'
  }
}));

vi.mock('@/store', () => ({
  useStore: () => ({
    AppConfigStore: {
      toggleModals: vi.fn()
    }
  })
}));

vi.mock('@/constants', () => ({
  foodwagenIcon: '/foodwagen-icon.png',
  foodwagenLogo: '/foodwagen-logo.png'
}));

vi.mock('@/store/AppConfig/appModalTypes', () => ({
  AppModals: {
    ADD_FOOD_MODAL: 'ADD_FOOD_MODAL',
    DELETE_FOOD_MODAL: 'DELETE_FOOD_MODAL',
    DONE: 'DONE'
  }
}));
