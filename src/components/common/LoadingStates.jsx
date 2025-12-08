/**
 * Loading States & Skeleton Components
 * Reusable loading skeletons for better UX
 */

// === 1. Property Card Skeleton ===
export const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
    {/* Image skeleton */}
    <div className="aspect-[16/10] bg-gray-200"></div>

    {/* Content skeleton */}
    <div className="p-4 space-y-3">
      {/* Title */}
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>

      {/* Location */}
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>

      {/* Specs */}
      <div className="flex gap-4 pt-2">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>

      {/* Price */}
      <div className="border-t pt-3">
        <div className="h-7 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  </div>
);

// === 2. Property Details Skeleton ===
export const PropertyDetailsSkeleton = () => (
  <div className="animate-pulse space-y-8">
    {/* Header */}
    <div className="space-y-3">
      <div className="h-10 bg-gray-200 rounded w-3/4"></div>
      <div className="h-5 bg-gray-200 rounded w-1/2"></div>
    </div>

    {/* Gallery */}
    <div className="h-[500px] bg-gray-200 rounded-2xl"></div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-8">
        {/* Specs */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-1">
        <div className="h-96 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  </div>
);

// === 3. List Skeleton (for multiple cards) ===
export const PropertyListSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <PropertyCardSkeleton key={i} />
    ))}
  </div>
);

// === 4. Map Skeleton ===
export const MapSkeleton = () => (
  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-500 font-medium">Loading map...</p>
    </div>
  </div>
);

// === 5. Spinner Component (Generic) ===
export const Spinner = ({ size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  const colorClasses = {
    blue: "border-blue-200 border-t-blue-600",
    red: "border-red-200 border-t-red-600",
    green: "border-green-200 border-t-green-600",
    gray: "border-gray-200 border-t-gray-600",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
    ></div>
  );
};

// === 6. Full Page Loader ===
export const FullPageLoader = ({ message = "Loading..." }) => (
  <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center">
      <Spinner size="xl" />
      <p className="mt-4 text-gray-600 font-medium text-lg">{message}</p>
    </div>
  </div>
);

// === 7. Inline Loader (for buttons) ===
export const ButtonLoader = () => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    <span>Loading...</span>
  </div>
);

// === 8. Shimmer Effect (Alternative Animation) ===
export const ShimmerCard = () => (
  <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div className="aspect-[16/10] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-3/4"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-1/2"></div>
    </div>

    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite linear;
      }
    `}</style>
  </div>
);

// === 9. Empty State Component ===
export const EmptyState = ({
  icon = "🏚️",
  title = "No results found",
  description = "Try adjusting your filters",
  actionLabel = "Clear Filters",
  onAction,
}) => (
  <div className="text-center py-20">
    <div className="text-7xl mb-6">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
    {onAction && (
      <button
        onClick={onAction}
        className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

// === 10. Skeleton Text (for paragraphs) ===
export const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-3 animate-pulse">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-200 rounded"
        style={{ width: i === lines - 1 ? "75%" : "100%" }}
      ></div>
    ))}
  </div>
);

// === Usage Examples ===

// 1. In Home.jsx:
// {isLoading ? <PropertyListSkeleton count={8} /> : <PropertyGrid />}

// 2. In PropertyDetails.jsx:
// {isLoading ? <PropertyDetailsSkeleton /> : <PropertyContent />}

// 3. Button with loading:
// <button disabled={isLoading}>
//   {isLoading ? <ButtonLoader /> : "Submit"}
// </button>

// 4. Empty state:
// {properties.length === 0 && (
//   <EmptyState
//     icon="🔍"
//     title="No properties found"
//     description="Try different search criteria"
//     actionLabel="Reset Filters"
//     onAction={handleReset}
//   />
// )}

export default {
  PropertyCardSkeleton,
  PropertyDetailsSkeleton,
  PropertyListSkeleton,
  MapSkeleton,
  Spinner,
  FullPageLoader,
  ButtonLoader,
  ShimmerCard,
  EmptyState,
  SkeletonText,
};
