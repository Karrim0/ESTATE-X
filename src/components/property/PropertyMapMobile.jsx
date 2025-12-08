import { useState, useEffect } from "react";
import { Map, X, ExternalLink, MapPin, Navigation, Maximize2 } from "lucide-react";

/**
 * Enhanced PropertyMapMobile Component
 * Features:
 * - Static preview with loading state
 * - Full-screen modal with smooth animations
 * - Google Maps integration
 * - Street View option
 * - Directions link
 * - Error handling
 * - Accessibility improvements
 */

const PropertyMapMobile = ({ lat, lng, address, propertyTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'street'

  // Generate static map preview (faster loading)
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=600x400&markers=color:red%7C${lat},${lng}&key=YOUR_API_KEY&style=feature:poi|visibility:off`;
  
  // Alternative: Use a placeholder from Unsplash
  const placeholderMapUrl = `https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800`;

  // Embed map URL (for modal)
  const embedMapUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;
  
  // Street View URL
  const streetViewUrl = `https://www.google.com/maps/embed/v1/streetview?key=YOUR_API_KEY&location=${lat},${lng}&heading=210&pitch=10&fov=35`;
  
  // External links
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  // Preload map when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setMapLoaded(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* === 1. Preview Section === */}
      <div className="mt-8 mb-10 w-full">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-2xl font-bold text-gray-900">📍 Location</h2>
          <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg max-w-[60%]">
            <MapPin size={16} className="mr-1.5 shrink-0 text-blue-600" />
            <span className="truncate font-medium">{address}</span>
          </div>
        </div>

        {/* Map Preview Card */}
        <div
          onClick={() => setIsOpen(true)}
          className="group relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-lg border-2 border-gray-200 hover:border-blue-500 transition-all hover:shadow-2xl"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
          aria-label="Open full map view"
        >
          {/* Loading Skeleton */}
          {!previewLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Preview Image */}
          <img
            src={placeholderMapUrl}
            alt="Map preview"
            loading="lazy"
            onLoad={() => setPreviewLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              previewLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
            }`}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/40 transition-colors" />

          {/* Floating Action Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-lg transform transition-all group-hover:scale-110 active:scale-95 group-hover:bg-blue-600 group-hover:text-white">
              <Map className="w-6 h-6" />
              <span>View Full Map</span>
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white text-sm font-medium truncate">
              {propertyTitle || 'Property Location'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors border-2 border-blue-200"
          >
            <Navigation size={18} />
            <span>Get Directions</span>
          </a>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors border-2 border-gray-200"
          >
            <Maximize2 size={18} />
            <span>Full Screen</span>
          </button>
        </div>
      </div>

      {/* === 2. Full Screen Modal === */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="map-modal-title"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 bg-white shadow-md z-10 shrink-0">
            <div className="flex-1">
              <h3 id="map-modal-title" className="font-bold text-lg text-gray-800 truncate">
                {propertyTitle || 'Property Location'}
              </h3>
              <p className="text-sm text-gray-600 truncate">{address}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors ml-3 shrink-0"
              aria-label="Close map"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2 p-3 bg-gray-50 border-b shrink-0">
            <button
              onClick={() => setViewMode('map')}
              className={`flex-1 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200'
              }`}
            >
              🗺️ Map View
            </button>
            <button
              onClick={() => setViewMode('street')}
              className={`flex-1 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                viewMode === 'street'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200'
              }`}
            >
              📸 Street View
            </button>
          </div>

          {/* Map Container */}
          <div className="flex-1 relative bg-gray-100">
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading map...</p>
                </div>
              </div>
            )}
            
            <iframe
              title="Property Location Map"
              src={viewMode === 'map' ? embedMapUrl : streetViewUrl}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              onLoad={() => setMapLoaded(true)}
            ></iframe>
          </div>

          {/* Bottom Action Bar */}
          <div className="p-4 bg-white border-t-2 shadow-lg shrink-0">
            <div className="flex gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-blue-600 text-white px-4 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                <Navigation size={20} />
                Get Directions
              </a>
              <a
                href={externalMapUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyMapMobile;