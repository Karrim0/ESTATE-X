import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { properties, LOCATIONS } from "../data/mockData";
import PropertyCard from "../components/property/PropertyCard";
import PropertyMap from "../components/property/PropertyMap";
import {
  PropertyListSkeleton,
  EmptyState,
} from "../components/common/LoadingStates";
import { useFormat } from "../context/AppContext";
import { useDebounce } from "../hooks/useDebounce";
import {
  SlidersHorizontal,
  X,
  Search,
  MapIcon,
  LayoutGrid,
  LayoutList,
  TrendingUp,
  Filter,
  Download,
  Share2,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { formatPrice } = useFormat();

  // States
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    type: "",
    beds: "",
    baths: "",
    priceMin: "",
    priceMax: "",
  });
  const [showFilters, setShowFilters] = useState(true); // Default open for B2B
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("newest");

  // Debounce search
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    let results = properties.filter((property) => {
      if (filters.country && property.country !== filters.country) return false;
      if (filters.city && property.city !== filters.city) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (filters.beds && property.beds < parseInt(filters.beds)) return false;
      if (filters.baths && property.baths < parseInt(filters.baths))
        return false;
      if (filters.priceMin && property.price < parseInt(filters.priceMin))
        return false;
      if (filters.priceMax && property.price > parseInt(filters.priceMax))
        return false;

      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          property.title.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower) ||
          property.country.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });

    // Sort results
    switch (sortBy) {
      case "price-low":
        return results.sort((a, b) => a.price - b.price);
      case "price-high":
        return results.sort((a, b) => b.price - a.price);
      case "popular":
        return results.sort((a, b) => (b.views || 0) - (a.views || 0));
      case "newest":
      default:
        return results.sort(
          (a, b) => new Date(b.listedAt) - new Date(a.listedAt)
        );
    }
  }, [filters, debouncedSearch, sortBy]);

  const citiesList = useMemo(() => {
    return filters.country ? LOCATIONS[filters.country] : [];
  }, [filters.country]);

  const handleCountryChange = (country) => {
    setFilters((prev) => ({ ...prev, country, city: "" }));
  };

  const clearFilters = () => {
    setFilters({
      country: "",
      city: "",
      type: "",
      beds: "",
      baths: "",
      priceMin: "",
      priceMax: "",
    });
    setSearchQuery("");
  };

  const handleCardClick = (id, coordinates) => {
    setSelectedLocation(coordinates);
    navigate(`/property/${id}`);
  };

  const activeFiltersCount =
    Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);

  // Export results (mock)
  const handleExport = () => {
    alert(`Exporting ${filteredProperties.length} properties to CSV...`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* === PROFESSIONAL SEARCH & FILTERS BAR === */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          {/* Main Search Row */}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, property name, or features..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`relative px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  showFilters
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300"
                }`}
              >
                <Filter size={20} />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span
                    className={`${
                      showFilters
                        ? "bg-white text-blue-600"
                        : "bg-blue-600 text-white"
                    } px-2 py-0.5 rounded-full text-xs font-bold`}
                  >
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleExport}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold transition-all flex items-center gap-2 border-2 border-gray-300"
              >
                <Download size={20} />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                onClick={() => setShowMap(!showMap)}
                className="lg:hidden px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors border-2 border-gray-300"
              >
                <MapIcon size={20} />
              </button>
            </div>
          </div>

          {/* Advanced Filters (Collapsible) */}
          {showFilters && (
            <div className="animate-in slide-in-from-top duration-200">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {/* Country */}
                <select
                  value={filters.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-sm"
                >
                  <option value="">All Countries</option>
                  {Object.keys(LOCATIONS).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                {/* City */}
                <select
                  value={filters.city}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, city: e.target.value }))
                  }
                  disabled={!filters.country}
                  className={`px-3 py-2 border-2 rounded-lg outline-none font-medium text-sm ${
                    !filters.country
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                      : "bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                >
                  <option value="">
                    {filters.country ? "All Cities" : "Select Country"}
                  </option>
                  {citiesList.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                {/* Type */}
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-sm"
                >
                  <option value="">All Types</option>
                  <option value="Sale">For Sale</option>
                  <option value="Rent">For Rent</option>
                  <option value="Auction">Auction</option>
                </select>

                {/* Bedrooms */}
                <select
                  value={filters.beds}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, beds: e.target.value }))
                  }
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-sm"
                >
                  <option value="">Beds</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>

                {/* Price Min */}
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceMin: e.target.value,
                    }))
                  }
                  placeholder="Min Price"
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm"
                />

                {/* Price Max */}
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceMax: e.target.value,
                    }))
                  }
                  placeholder="Max Price"
                  className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm"
                />

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-colors border-2 border-red-200 text-sm flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    Clear ({activeFiltersCount})
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="flex flex-1 overflow-hidden">
        {/* Property List */}
        <div
          className={`w-full ${
            showMap ? "hidden lg:block" : ""
          } lg:w-1/2 h-full overflow-y-auto custom-scrollbar`}
        >
          <div className="container mx-auto px-4 py-6">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {filteredProperties.length} Properties
                  {activeFiltersCount > 0 && (
                    <span className="text-blue-600">•</span>
                  )}
                </h1>
                {activeFiltersCount > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {activeFiltersCount} active filter
                    {activeFiltersCount > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border-2 border-gray-200">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid" ? "bg-white shadow" : ""
                    }`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list" ? "bg-white shadow" : ""
                    }`}
                  >
                    <LayoutList size={18} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Properties Grid/List */}
            {isLoading ? (
              <PropertyListSkeleton count={6} />
            ) : filteredProperties.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="No properties found"
                description="Try adjusting your search criteria or filters to find more results."
                actionLabel="Clear All Filters"
                onAction={clearFilters}
              />
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 xl:grid-cols-2 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onCardClick={handleCardClick}
                    formatPrice={formatPrice}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map View */}
        <div
          className={`${
            showMap ? "block" : "hidden"
          } lg:block w-full lg:w-1/2 h-full bg-gray-100 relative border-l-2 border-gray-200`}
        >
          <PropertyMap
            properties={filteredProperties}
            selectedLocation={selectedLocation}
          />

          {/* Close Map Button (Mobile) */}
          <button
            onClick={() => setShowMap(false)}
            className="lg:hidden absolute top-4 right-4 p-3 bg-white rounded-full shadow-2xl hover:bg-gray-100 z-10 border-2 border-gray-300"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
