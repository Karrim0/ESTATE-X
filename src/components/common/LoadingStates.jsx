// Property Card Skeleton
export const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden animate-pulse">
    <div className="aspect-[16/10] bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="flex gap-4 pt-2">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="border-t pt-3">
        <div className="h-7 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  </div>
);

// Property Details Skeleton
export const PropertyDetailsSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="space-y-3">
      <div className="h-10 bg-gray-200 rounded w-3/4"></div>
      <div className="h-5 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div className="h-[500px] bg-gray-200 rounded-2xl"></div>
    <div className="grid grid-cols-3 gap-4">
      {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>)}
    </div>
  </div>
);

// List Skeleton
export const PropertyListSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <PropertyCardSkeleton key={i} />
    ))}
  </div>
);

// Map Skeleton
export const MapSkeleton = () => (
  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-500 font-medium">Loading map...</p>
    </div>
  </div>
);

// Spinner Component
export const Spinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  const colorClasses = {
    blue: 'border-blue-200 border-t-blue-600',
    red: 'border-red-200 border-t-red-600',
    green: 'border-green-200 border-t-green-600',
    gray: 'border-gray-200 border-t-gray-600'
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}></div>
  );
};

// Full Page Loader
export const FullPageLoader = ({ message = "Loading..." }) => (
  <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center">
      <Spinner size="xl" />
      <p className="mt-4 text-gray-600 font-medium text-lg">{message}</p>
    </div>
  </div>
);

// Button Loader
export const ButtonLoader = () => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    <span>Loading...</span>
  </div>
);

// Empty State
export const EmptyState = ({ 
  icon = "🏚️", 
  title = "No results found", 
  description = "Try adjusting your filters",
  actionLabel = "Clear Filters",
  onAction 
}) => (
  <div className="text-center py-20">
    <div className="text-7xl mb-6">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">{description}</p>
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

// Skeleton Text
export const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-3 animate-pulse">
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i} 
        className="h-4 bg-gray-200 rounded"
        style={{ width: i === lines - 1 ? '75%' : '100%' }}
      ></div>
    ))}
  </div>
);

export default {
  PropertyCardSkeleton,
  PropertyDetailsSkeleton,
  PropertyListSkeleton,
  MapSkeleton,
  Spinner,
  FullPageLoader,
  ButtonLoader,
  EmptyState,
  SkeletonText
};