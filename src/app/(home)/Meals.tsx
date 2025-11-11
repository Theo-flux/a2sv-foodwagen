'use client';
import MealCard from '@/components/MealCard';
import { useFetchFoods } from '@/hooks/useFetchFoods';
import MealCardSkeleton from './MealCardSkeleton';
import MealNotFound from './MealNotFound';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'next/navigation';

const Meals = () => {
  const params = useSearchParams();
  const name = params.get('name') as string;
  const { data, isLoading, isFetching, status } = useFetchFoods(name);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col space-y-8 px-4 py-20 xl:px-0">
      <h2 className="text-center text-3xl font-black">Featured Meals</h2>

      <div className="grid w-full snap-y grid-flow-row grid-cols-1 gap-4 overflow-auto md:grid-cols-[repeat(auto-fit,minmax(300px,0.3fr))]">
        {isLoading && isFetching && (
          <>
            <MealCardSkeleton />
            <MealCardSkeleton />
            <MealCardSkeleton />
            <MealCardSkeleton />
          </>
        )}
        {data && data.length > 0 && data.map((datum) => <MealCard key={datum.id} meal={datum} />)}
      </div>

      {status === 'error' && <MealNotFound />}
    </section>
  );
};

export default observer(Meals);
