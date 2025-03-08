export const LoadingHomeSkeleton = () => {
  return (
    <section className="flex flex-col space-y-4">
      <div className="h-12 w-full animate-pulse rounded-md bg-gray-200" />
      <div className="flex space-x-4">
        <div className="h-6 w-20 animate-pulse rounded-md bg-gray-200" />
        <div className="h-6 w-20 animate-pulse rounded-md bg-gray-200" />
        <div className="h-6 w-20 animate-pulse rounded-md bg-gray-200" />
        <div className="h-6 w-20 animate-pulse rounded-md bg-gray-200" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-square w-full animate-pulse rounded-md bg-gray-200" />
        <div className="aspect-square w-full animate-pulse rounded-md bg-gray-200" />
        <div className="aspect-square w-full animate-pulse rounded-md bg-gray-200" />
        <div className="aspect-square w-full animate-pulse rounded-md bg-gray-200" />
        <div className="aspect-square w-full animate-pulse rounded-md bg-gray-200" />
        <div className="aspect-square w-full animate-pulse rounded-md bg-gray-200" />
        <div className="aspect-square w-full animate-pulse rounded-md bg-gray-200" />
        <div className="aspect-square w-full animate-pulse rounded-md bg-gray-200" />
      </div>
    </section>
  );
};
