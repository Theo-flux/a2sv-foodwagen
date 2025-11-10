'use client';
import { useStore } from '@/store';
import { Button } from '../ui/button';
import { Logo } from './Logo';
import { observer } from 'mobx-react-lite';
import { AppModals } from '@/store/AppConfig/appModalTypes';

const Header = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <header className="fixed top-0 z-40 w-full bg-white shadow">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 xl:px-0">
        <Logo />
        <Button
          className="rounded-xl"
          onClick={() => toggleModals({ open: true, name: AppModals.ADD_FOOD_MODAL, id: '' })}
        >
          Add Meal
        </Button>
      </nav>
    </header>
  );
};

export default observer(Header);
