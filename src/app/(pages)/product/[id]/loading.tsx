import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Skeleton className="w-full h-[400px] rounded-lg mb-4" />

          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-md" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />

          <Skeleton className="h-4 w-32" />

          <Skeleton className="h-8 w-40" />

          <Skeleton className="h-6 w-24 rounded-full" />

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-28 rounded-md" />
            <Skeleton className="h-4 w-32" />
          </div>

          <Skeleton className="h-10 w-full rounded-md" />

          <div className="flex gap-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>

          {/* wishlist */}
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
