const MealCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse overflow-hidden rounded-lg bg-white">
      <div className="relative">
        <div className="h-64 w-full bg-gray-300"></div>
        <div className="absolute top-4 left-4 h-10 w-24 rounded-lg bg-gray-400"></div>
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-300"></div>
            <div className="flex-1">
              <div className="mb-2 h-5 w-32 rounded bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <div className="h-5 w-5 rounded bg-gray-300"></div>
                <div className="h-4 w-10 rounded bg-gray-300"></div>
              </div>
            </div>
          </div>

          <div className="h-6 w-6 rounded bg-gray-300"></div>
        </div>

        <div className="h-9 w-24 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default MealCardSkeleton;
