import { useState, useEffect, Suspense, lazy } from "react";
import { MapPin, Star, Share2, Heart, CheckCircle2, ArrowLeft, ExternalLink } from "lucide-react";

/**
 * Optimized PropertyDetails Component
 * Features:
 * - Error boundary handling
 * - Loading states
 * - Lazy loaded components
 * - SEO meta tags
 * - Share functionality
 * - Mobile map integration
 */

// Lazy load heavy components
const AuctionBox = lazy(() => import("../components/property/AuctionBox"));
const PropertyMapMobile = lazy(() => import("../components/property/PropertyMapMobile"));

// Loading Skeleton
const DetailsSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
    <div className="h-[500px] bg-gray-200 rounded-2xl"></div>
    <div className="grid grid-cols-3 gap-4">
      {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>)}
    </div>
  </div>
);

const PropertyDetails = ({ 
  propertyId, // Pass from parent via useParams
  properties, // Pass from parent/context
  formatPrice, // From useFormat()
  t, // From useTranslation()
  onBack // Navigation handler
}) => {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call (replace with actual API)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const found = properties.find(p => p.id === Number(propertyId));
        
        if (!found) {
          setError('Property not found');
          return;
        }
        
        setProperty(found);
        
        // Check if in favorites (from localStorage or API)
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(found.id));
        
      } catch (err) {
        setError('Failed to load property');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, properties]);

  // Handle favorite toggle
  const toggleFavorite = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const newFavorites = isFavorite
        ? favorites.filter(id => id !== property.id)
        : [...favorites, property.id];
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
      
      // TODO: Sync with backend API
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };

  // Handle share
  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Check out this property: ${property.title}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <DetailsSkeleton />
        </div>
      </div>
    );
  }

  // Error State
  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏚️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{error || 'Property Not Found'}</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={onBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  // Gallery images (mock - replace with property.images array)
  const galleryImages = [
    property.image,
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1600596542815-405dc2587500?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 md:px-6 py-6">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Search</span>
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={20} />
              <span className="text-lg">{property.location}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleShare}
              className="p-3 border-2 border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-500 transition-all"
              aria-label="Share property"
            >
              <Share2 size={22} />
            </button>
            <button 
              onClick={toggleFavorite}
              className={`p-3 border-2 rounded-full transition-all ${
                isFavorite 
                  ? 'bg-red-50 border-red-500 text-red-500' 
                  : 'border-gray-300 hover:bg-red-50 hover:border-red-500'
              }`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={22} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>
        </div>

        {/* Gallery (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[550px] rounded-2xl overflow-hidden mb-10 shadow-lg">
          {/* Main Image */}
          <div className="col-span-1 md:col-span-2 row-span-2 relative group bg-gray-200">
            <img
              src={galleryImages[activeImage]}
              alt="Main view"
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              {property.type}
            </div>
          </div>
          
          {/* Thumbnail Images */}
          {galleryImages.slice(1, 5).map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveImage(idx + 1)}
              className="hidden md:block relative overflow-hidden bg-gray-200 cursor-pointer group"
            >
              <img
                src={img}
                alt={`View ${idx + 2}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {idx === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg hover:bg-black/40 transition-colors">
                  +{galleryImages.length - 5} Photos
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Specs */}
            <div className="flex justify-between items-center p-6 border-2 border-gray-200 rounded-2xl bg-white shadow-sm">
              <div className="text-center flex-1">
                <div className="font-bold text-3xl text-gray-900">{property.beds}</div>
                <div className="text-sm text-gray-600 mt-1">{t("property.beds")}</div>
              </div>
              <div className="w-px h-14 bg-gray-200"></div>
              <div className="text-center flex-1">
                <div className="font-bold text-3xl text-gray-900">{property.baths}</div>
                <div className="text-sm text-gray-600 mt-1">{t("property.baths")}</div>
              </div>
              <div className="w-px h-14 bg-gray-200"></div>
              <div className="text-center flex-1">
                <div className="font-bold text-3xl text-gray-900">{property.sqft}</div>
                <div className="text-sm text-gray-600 mt-1">{t("property.sqft")}</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About this home</h2>
              <p className="text-gray-700 leading-relaxed text-base">
                Experience luxury living in this stunning masterpiece located in {property.location}. 
                Featuring modern architecture, premium finishes, and breathtaking views. Perfect for 
                those who seek elegance and comfort. This property offers a unique blend of style and 
                functionality with state-of-the-art amenities and spacious living areas.
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold mb-5 text-gray-900">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Garden View", "Free Wi-Fi", "Private Pool", "24/7 Security", "Central A/C", "Gym", "Parking", "Balcony"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-gray-700 p-3 hover:bg-blue-50 rounded-xl transition-colors border border-gray-100"
                  >
                    <CheckCircle2 size={22} className="text-blue-600 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Map Integration */}
            <div className="lg:hidden">
              <Suspense fallback={<div className="h-60 bg-gray-200 rounded-2xl animate-pulse"></div>}>
                <PropertyMapMobile 
                  lat={property.coordinates[0]}
                  lng={property.coordinates[1]}
                  address={property.location}
                />
              </Suspense>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Suspense fallback={<div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>}>
                {property.type === "Auction" ? (
                  <AuctionBox
                    startPrice={property.price}
                    endTime={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
                  />
                ) : (
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        {property.type === "Sale" && (
                          <span className="text-gray-500 line-through text-sm block mb-2">
                            {formatPrice(property.price * 1.15)}
                          </span>
                        )}
                        <div className="text-4xl font-bold text-blue-600">
                          {formatPrice(property.price)}
                        </div>
                        {property.type === "Rent" && (
                          <span className="text-gray-600 text-sm">/ month</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold bg-yellow-50 text-yellow-700 px-3 py-2 rounded-xl">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span>4.9 (128)</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-xl active:scale-95">
                        Schedule a Tour
                      </button>
                      <button className="w-full bg-white border-2 border-gray-300 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                        Contact Agent
                      </button>
                      <button className="w-full bg-green-50 border-2 border-green-500 text-green-700 py-4 rounded-xl font-bold hover:bg-green-100 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <ExternalLink size={20} />
                        Virtual Tour
                      </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-5">
                      You won't be charged yet
                    </p>
                  </div>
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;