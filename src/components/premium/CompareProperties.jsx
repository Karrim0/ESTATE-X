import { useState } from 'react';
import { X, Check, Minus, ArrowLeftRight } from 'lucide-react';

/**
 * CompareProperties Component - Premium Feature
 * Side-by-side comparison of up to 3 properties
 */

const CompareProperties = ({ properties, onClose, formatPrice }) => {
  const [compareList, setCompareList] = useState(properties.slice(0, 3));

  // Remove property from comparison
  const removeProperty = (id) => {
    setCompareList(prev => prev.filter(p => p.id !== id));
  };

  // Comparison features
  const features = [
    { key: 'price', label: 'Price', format: (val) => formatPrice(val) },
    { key: 'type', label: 'Type', format: (val) => val },
    { key: 'beds', label: 'Bedrooms', format: (val) => val },
    { key: 'baths', label: 'Bathrooms', format: (val) => val },
    { key: 'sqft', label: 'Square Feet', format: (val) => val.toLocaleString() },
    { key: 'rating', label: 'Rating', format: (val) => `⭐ ${val}/5` },
    { key: 'views', label: 'Views', format: (val) => val.toLocaleString() },
  ];

  // Amenities comparison
  const allAmenities = [...new Set(compareList.flatMap(p => p.amenities || []))];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <ArrowLeftRight size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Compare Properties</h2>
              <p className="text-sm text-blue-100">Side-by-side comparison of {compareList.length} properties</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          
          {/* No properties selected */}
          {compareList.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No properties to compare</h3>
              <p className="text-gray-600 mb-6">Add properties to your comparison list to get started</p>
              <button 
                onClick={onClose}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
              >
                Back to Properties
              </button>
            </div>
          )}

          {/* Comparison Grid */}
          {compareList.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Property Images & Titles */}
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-white z-10 p-4 text-left w-48">
                      <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Property</div>
                    </th>
                    {compareList.map((property) => (
                      <th key={property.id} className="p-4 min-w-[280px]">
                        <div className="relative">
                          <button
                            onClick={() => removeProperty(property.id)}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 z-10 shadow-lg"
                          >
                            <X size={16} />
                          </button>
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
                          />
                          <div className="text-left">
                            <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                              {property.title}
                            </h3>
                            <p className="text-sm text-gray-600">{property.location}</p>
                            <div className="mt-3">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                property.type === 'Auction' 
                                  ? 'bg-red-100 text-red-700' 
                                  : property.type === 'Sale'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {property.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Basic Features */}
                <tbody>
                  <tr className="border-t-4 border-gray-200">
                    <td colSpan={compareList.length + 1} className="bg-gray-50 p-3 sticky left-0 z-10">
                      <div className="font-bold text-gray-900 uppercase text-sm tracking-wide">Basic Information</div>
                    </td>
                  </tr>
                  {features.map((feature, idx) => (
                    <tr key={feature.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="sticky left-0 z-10 p-4 font-semibold text-gray-700 bg-inherit">
                        {feature.label}
                      </td>
                      {compareList.map((property) => (
                        <td key={property.id} className="p-4 text-center">
                          <span className="font-medium text-gray-900">
                            {feature.format(property[feature.key])}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Amenities */}
                  <tr className="border-t-4 border-gray-200">
                    <td colSpan={compareList.length + 1} className="bg-gray-50 p-3 sticky left-0 z-10">
                      <div className="font-bold text-gray-900 uppercase text-sm tracking-wide">Amenities</div>
                    </td>
                  </tr>
                  {allAmenities.map((amenity, idx) => (
                    <tr key={amenity} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="sticky left-0 z-10 p-4 font-medium text-gray-700 bg-inherit">
                        {amenity}
                      </td>
                      {compareList.map((property) => (
                        <td key={property.id} className="p-4 text-center">
                          {property.amenities?.includes(amenity) ? (
                            <Check size={24} className="text-green-600 mx-auto" />
                          ) : (
                            <Minus size={24} className="text-gray-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Seller Info */}
                  <tr className="border-t-4 border-gray-200">
                    <td colSpan={compareList.length + 1} className="bg-gray-50 p-3 sticky left-0 z-10">
                      <div className="font-bold text-gray-900 uppercase text-sm tracking-wide">Seller Information</div>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="sticky left-0 z-10 p-4 font-semibold text-gray-700 bg-white">
                      Seller Name
                    </td>
                    {compareList.map((property) => (
                      <td key={property.id} className="p-4 text-center">
                        <div className="font-medium text-gray-900">{property.seller?.name || 'N/A'}</div>
                        {property.seller?.verified && (
                          <span className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                            <Check size={14} /> Verified
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="sticky left-0 z-10 p-4 font-semibold text-gray-700 bg-gray-50">
                      Seller Rating
                    </td>
                    {compareList.map((property) => (
                      <td key={property.id} className="p-4 text-center">
                        <span className="font-medium text-gray-900">
                          ⭐ {property.seller?.rating || 'N/A'}/5
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        {compareList.length > 0 && (
          <div className="border-t-2 border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                💡 Tip: Click the X on any property to remove it from comparison
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Done Comparing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareProperties;