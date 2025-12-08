import { memo, useState } from "react";
import {
  Bed,
  Bath,
  Maximize,
  Heart,
  MapPin,
  TrendingUp,
  Eye,
  Clock,
  Zap,
} from "lucide-react";

/**
 * Professional PropertyCard for B2B Platform
 * Optimized with React.memo and lazy loading
 */

const PropertyCard = memo(
  ({
    property,
    onCardClick,
    formatPrice,
    viewMode = "grid",
    isLoading = false,
  }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleFavoriteClick = (e) => {
      e.stopPropagation();
      setIsFavorite(!isFavorite);
    };

    if (isLoading) {
      return (
        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden animate-pulse">
          <div className="aspect-[16/10] bg-gray-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      );
    }

    // Grid View
    if (viewMode === "grid") {
      return (
        <article
          onClick={() => onCardClick(property.id, property.coordinates)}
          className="group cursor-pointer bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}

            <img
              src={property.image}
              alt={property.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? "opacity-100 group-hover:scale-110" : "opacity-0"
              }`}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                  property.type === "Auction"
                    ? "bg-red-500 text-white animate-pulse"
                    : property.type === "Sale"
                    ? "bg-blue-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {property.type}
              </span>
              {property.featured && (
                <span className="px-3 py-1.5 bg-yellow-400 text-gray-900 rounded-full text-xs font-bold uppercase shadow-lg">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 h-10 w-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg z-10 border border-gray-200"
            >
              <Heart
                size={20}
                className={`transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>

            {/* Stats Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex items-center justify-between text-white text-xs font-semibold">
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{property.views?.toLocaleString() || 0}</span>
              </div>
              {property.type === "Auction" && (
                <div className="flex items-center gap-1 bg-red-500 px-2 py-1 rounded-full animate-pulse">
                  <Clock size={14} />
                  <span>3d 12h</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title & Rating */}
            <div className="flex justify-between items-start gap-2 mb-3">
              <h3 className="font-bold text-lg text-gray-900 line-clamp-1 flex-1">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-lg shrink-0 border border-yellow-200">
                ⭐ {property.rating || "4.8"}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <MapPin size={16} className="shrink-0 text-blue-600" />
              <span className="text-sm truncate font-medium">
                {property.location}
              </span>
            </div>

            {/* Specs */}
            <div className="flex items-center gap-4 text-gray-600 border-t border-gray-200 pt-3 mb-3">
              <div className="flex items-center gap-1.5" title="Bedrooms">
                <Bed size={18} className="text-blue-600" />
                <span className="text-sm font-semibold">{property.beds}</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-1.5" title="Bathrooms">
                <Bath size={18} className="text-blue-600" />
                <span className="text-sm font-semibold">{property.baths}</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-1.5" title="Square Feet">
                <Maximize size={18} className="text-blue-600" />
                <span className="text-sm font-semibold">
                  {property.sqft.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
              <div>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(property.price)}
                </span>
                {property.type === "Rent" && (
                  <span className="text-sm text-gray-500 ml-1">/mo</span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCardClick(property.id);
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
              >
                View Details
              </button>
            </div>
          </div>
        </article>
      );
    }

    // List View
    return (
      <article
        onClick={() => onCardClick(property.id, property.coordinates)}
        className="group cursor-pointer bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex"
      >
        {/* Image (smaller in list view) */}
        <div className="relative w-64 flex-shrink-0 overflow-hidden bg-gray-100">
          <img
            src={property.image}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Type Badge */}
          <span
            className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold uppercase shadow-lg ${
              property.type === "Auction"
                ? "bg-red-500 text-white"
                : property.type === "Sale"
                ? "bg-blue-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {property.type}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-xl text-gray-900 line-clamp-1">
                {property.title}
              </h3>
              <button onClick={handleFavoriteClick} className="ml-2">
                <Heart
                  size={22}
                  className={
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                  }
                />
              </button>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <MapPin size={16} className="text-blue-600" />
              <span className="text-sm font-medium">{property.location}</span>
            </div>

            <div className="flex items-center gap-6 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Bed size={18} className="text-blue-600" />
                <span className="text-sm font-semibold">
                  {property.beds} Beds
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={18} className="text-blue-600" />
                <span className="text-sm font-semibold">
                  {property.baths} Baths
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize size={18} className="text-blue-600" />
                <span className="text-sm font-semibold">
                  {property.sqft.toLocaleString()} sqft
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-600">
              {formatPrice(property.price)}
            </span>
            <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">
              View Details
            </button>
          </div>
        </div>
      </article>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.property.id === nextProps.property.id &&
      prevProps.viewMode === nextProps.viewMode &&
      prevProps.isLoading === nextProps.isLoading
    );
  }
);

PropertyCard.displayName = "PropertyCard";

export default PropertyCard;
