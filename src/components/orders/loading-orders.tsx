export const LoadingOrdersSkeleton = () => {
  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      <div className="h-40 w-full animate-pulse rounded-md bg-gray-200" />
      <div className="h-52 w-full animate-pulse rounded-md bg-gray-200" />
      <div className="h-32 w-full animate-pulse rounded-md bg-gray-200" />
      <div className="h-40 w-full animate-pulse rounded-md bg-gray-200" />
    </div>
  );
};
