'use client';
import { useEffect, useState } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && data) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isLoading, data]);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col space-y-8 px-4 py-20 xl:px-0">
      <h2
        data-loaded={isLoaded}
        className="translate-y-6 text-center text-3xl font-black opacity-0 transition-all delay-100 duration-600 ease-out data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100"
      >
        Featured Meals
      </h2>

      <div className="grid w-full snap-y grid-flow-row grid-cols-1 gap-4 overflow-auto md:grid-cols-[repeat(auto-fit,minmax(300px,0.3fr))]">
        {isLoading && isFetching && (
          <>
            <MealCardSkeleton />
            <MealCardSkeleton />
            <MealCardSkeleton />
            <MealCardSkeleton />
          </>
        )}

        {data &&
          data.length > 0 &&
          data.map((datum, index) => (
            <div
              key={datum.id}
              data-loaded={isLoaded}
              className="translate-y-8 opacity-0 transition-all duration-700 ease-out data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100"
              style={{
                transitionDelay: isLoaded ? `${100 + index * 100}ms` : '0ms'
              }}
            >
              <MealCard meal={datum} />
            </div>
          ))}
      </div>

      {status === 'error' && (
        <div
          data-loaded={isLoaded}
          className="translate-y-6 opacity-0 transition-all delay-300 duration-700 ease-out data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100"
        >
          <MealNotFound />
        </div>
      )}
    </section>
  );
};

export default observer(Meals);
