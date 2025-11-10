import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

const MealNotFound = () => {
  const params = useSearchParams();
  const router = useRouter();
  const name = params.get('name') as string;

  const handleClear = () => {
    const query = new URLSearchParams(params.toString());
    query.delete('name');
    router.push(query.toString() ? `?${query.toString()}` : '?');
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="relative mb-6">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-20 w-20 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <span className="text-2xl">🔍</span>
        </div>
      </div>

      <h3 className="mb-2 text-2xl font-bold text-gray-900">No Meals Found</h3>

      {name && (
        <p className="mb-4 max-w-md text-center text-gray-600">
          We couldn&apos;t find any meals matching{' '}
          <span className="font-semibold text-gray-900">&quot;{name}&quot;</span>
        </p>
      )}

      <p className="mb-6 max-w-md text-center text-gray-500">
        Try adjusting your search or browse our available restaurants to find something delicious!
      </p>

      <div className="flex gap-3">
        <Button className="px-6 py-2.5" size="lg" onClick={handleClear}>
          Browse All Meals
        </Button>
        <Button className="px-6 py-2.5" size="lg" variant="outline" onClick={handleClear}>
          Clear Search
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="mb-3 text-sm text-gray-500">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Pizza', 'Burger', 'Pasta', 'Sushi', 'Salad'].map((item) => (
            <button
              key={item}
              className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200"
              onClick={() => {
                const query = new URLSearchParams();
                query.set('name', item);
                router.push(`?${query.toString()}`);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealNotFound;
