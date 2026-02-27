export default function ShopGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="shop-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-media">
            <div className="h-full w-full skeleton-shimmer" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-1/3 skeleton-shimmer" />
            <div className="h-4 w-4/5 skeleton-shimmer" />
            <div className="h-3 w-1/2 skeleton-shimmer" />
          </div>

          <div className="mt-4 pt-3 border-t border-secondary/30 flex items-center justify-between">
            <div className="h-4 w-1/4 skeleton-shimmer" />
            <div className="h-6 w-20 rounded-full skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
