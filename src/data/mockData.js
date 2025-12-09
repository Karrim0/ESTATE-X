// src/data/mockData.js - UPDATED WITH 100+ PROPERTIES

import { LOCATIONS, AMENITIES, PROPERTY_TYPES, PROPERTY_STATUS } from './constants';

// Helper to generate random coordinates near a city
const generateCoordinates = (baseLat, baseLng, radius = 0.5) => {
  const lat = baseLat + (Math.random() - 0.5) * radius;
  const lng = baseLng + (Math.random() - 0.5) * radius;
  return [lat, lng];
};

// Helper to generate random amenities
const generateAmenities = (count = 6) => {
  const shuffled = [...AMENITIES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Base property templates
const propertyTemplates = [
  { title: 'Luxury Villa', beds: 5, baths: 4, sqftBase: 4500 },
  { title: 'Modern Apartment', beds: 2, baths: 2, sqftBase: 1200 },
  { title: 'Beachfront Bungalow', beds: 3, baths: 3, sqftBase: 2100 },
  { title: 'Downtown Penthouse', beds: 4, baths: 3, sqftBase: 3200 },
  { title: 'Cozy Studio', beds: 1, baths: 1, sqftBase: 650 },
  { title: 'Family Mansion', beds: 6, baths: 5, sqftBase: 6000 },
  { title: 'Sea View Chalet', beds: 2, baths: 2, sqftBase: 1100 },
  { title: 'Mountain Cabin', beds: 4, baths: 3, sqftBase: 2800 },
  { title: 'Townhouse', beds: 3, baths: 2, sqftBase: 1800 },
  { title: 'Loft', beds: 2, baths: 2, sqftBase: 1500 }
];

const adjectives = ['Stunning', 'Elegant', 'Spacious', 'Modern', 'Charming', 'Beautiful', 'Luxurious', 'Contemporary', 'Classic', 'Pristine'];
const features = ['Ocean View', 'Garden', 'Pool', 'Terrace', 'Rooftop', 'Balcony', 'Courtyard', 'Private Beach'];

// City coordinates
const cityCoords = {
  'New York': [40.7128, -74.0060],
  'Los Angeles': [34.0522, -118.2437],
  'Miami': [25.7617, -80.1918],
  'Chicago': [41.8781, -87.6298],
  'Cairo': [30.0444, 31.2357],
  'New Cairo': [30.0444, 31.4357],
  'Alexandria': [31.2001, 29.9187],
  'Dubai': [25.2048, 55.2708],
  'Abu Dhabi': [24.4539, 54.3773],
  'Riyadh': [24.7136, 46.6753],
  'Jeddah': [21.5433, 39.1728],
  'London': [51.5074, -0.1278],
  'Paris': [48.8566, 2.3522],
  'Berlin': [52.5200, 13.4050],
  'Rome': [41.9028, 12.4964],
  'Madrid': [40.4168, -3.7038],
  'Istanbul': [41.0082, 28.9784],
  'Barcelona': [41.3851, 2.1734],
  'Milan': [45.4642, 9.1900],
  'Munich': [48.1351, 11.5820]
};

// Image URLs (using Unsplash)
const propertyImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
  'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
  'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
  'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800'
];

// Generate properties
export const properties = [];

let propertyId = 1;

// Generate properties for each country
Object.entries(LOCATIONS).forEach(([country, cities]) => {
  cities.forEach(city => {
    // Generate 5-10 properties per city
    const cityPropertyCount = Math.floor(Math.random() * 6) + 5;
    
    for (let i = 0; i < cityPropertyCount; i++) {
      const template = propertyTemplates[Math.floor(Math.random() * propertyTemplates.length)];
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const feature = features[Math.floor(Math.random() * features.length)];
      
      const type = Object.values(PROPERTY_TYPES)[Math.floor(Math.random() * 3)];
      const isFeatured = Math.random() > 0.85;
      const coords = cityCoords[city] || [0, 0];
      
      // Price based on type
      let basePrice;
      if (type === 'Rent') {
        basePrice = Math.floor(Math.random() * 8000) + 1000;
      } else {
        basePrice = Math.floor(Math.random() * 5000000) + 200000;
      }
      
      // Adjust price based on location
      const locationMultiplier = {
        'New York': 1.8,
        'Los Angeles': 1.6,
        'London': 1.7,
        'Dubai': 1.5,
        'Paris': 1.6,
        'Cairo': 0.4,
        'Miami': 1.4
      };
      
      const multiplier = locationMultiplier[city] || 1.0;
      const price = Math.floor(basePrice * multiplier);
      
      properties.push({
        id: propertyId++,
        title: `${adjective} ${template.title} with ${feature}`,
        location: `${city}, ${country}`,
        country,
        city,
        price,
        beds: template.beds + Math.floor(Math.random() * 2),
        baths: template.baths + Math.floor(Math.random() * 2),
        sqft: template.sqftBase + Math.floor(Math.random() * 1000),
        type,
        status: PROPERTY_STATUS.AVAILABLE,
        featured: isFeatured,
        rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
        views: Math.floor(Math.random() * 5000) + 100,
        listedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        image: propertyImages[Math.floor(Math.random() * propertyImages.length)],
        coordinates: generateCoordinates(coords[0], coords[1]),
        seller: {
          id: `seller_${Math.floor(Math.random() * 10) + 1}`,
          name: `${['Elite', 'Premium', 'Luxury', 'Grand', 'Royal'][Math.floor(Math.random() * 5)]} ${['Estates', 'Properties', 'Realty', 'Holdings', 'Homes'][Math.floor(Math.random() * 5)]}`,
          verified: Math.random() > 0.3,
          rating: parseFloat((Math.random() * 1 + 4).toFixed(1))
        },
        amenities: generateAmenities(Math.floor(Math.random() * 5) + 4)
      });
    }
  });
});

// Add some premium/featured properties at the top
const premiumProperties = [
  {
    id: propertyId++,
    title: 'Iconic Penthouse with Burj Khalifa View',
    location: 'Downtown Dubai, UAE',
    country: 'UAE',
    city: 'Dubai',
    price: 12500000,
    beds: 5,
    baths: 6,
    sqft: 8500,
    type: 'Sale',
    status: 'available',
    featured: true,
    rating: 5.0,
    views: 8920,
    listedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800',
    coordinates: [25.1972, 55.2744],
    seller: {
      id: 'seller_premium_1',
      name: 'Emaar Properties',
      verified: true,
      rating: 4.9
    },
    amenities: ['Private Pool', 'Burj Khalifa View', 'Concierge 24/7', 'Smart Home', 'Private Elevator', 'Gym', 'Spa', 'Cinema Room']
  },
  {
    id: propertyId++,
    title: 'Waterfront Mega Mansion - Beverly Hills',
    location: 'Beverly Hills, CA',
    country: 'USA',
    city: 'Los Angeles',
    price: 28500000,
    beds: 8,
    baths: 10,
    sqft: 15000,
    type: 'Auction',
    status: 'available',
    featured: true,
    rating: 4.9,
    views: 12340,
    listedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    coordinates: [34.0736, -118.4004],
    seller: {
      id: 'seller_premium_2',
      name: 'Luxury Estates Inc.',
      verified: true,
      rating: 4.8
    },
    amenities: ['Ocean View', 'Private Beach', 'Tennis Court', 'Wine Cellar', 'Home Theater', 'Guest House', 'Infinity Pool', 'Helipad']
  },
  {
    id: propertyId++,
    title: 'Historical Palace - Central Paris',
    location: 'Paris, France',
    country: 'France',
    city: 'Paris',
    price: 35000000,
    beds: 12,
    baths: 8,
    sqft: 18000,
    type: 'Sale',
    status: 'available',
    featured: true,
    rating: 5.0,
    views: 15670,
    listedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    coordinates: [48.8606, 2.3376],
    seller: {
      id: 'seller_premium_3',
      name: 'Paris Luxury Living',
      verified: true,
      rating: 4.9
    },
    amenities: ['Eiffel Tower View', 'Historic Architecture', 'Private Garden', 'Library', 'Ballroom', 'Staff Quarters', 'Underground Parking']
  }
];

properties.unshift(...premiumProperties);

// ==================== HELPER FUNCTIONS ====================

export const getPropertyById = (id) => {
  return properties.find(p => p.id === Number(id));
};

export const getPropertiesByType = (type) => {
  return properties.filter(p => p.type === type);
};

export const getPropertiesByCountry = (country) => {
  return properties.filter(p => p.country === country);
};

export const getPropertiesByCity = (city) => {
  return properties.filter(p => p.city === city);
};

export const getFeaturedProperties = () => {
  return properties.filter(p => p.featured);
};

export const getRecentProperties = (limit = 10) => {
  return [...properties]
    .sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt))
    .slice(0, limit);
};

export const getPopularProperties = (limit = 10) => {
  return [...properties]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
};

export const searchProperties = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return properties.filter(p =>
    p.title.toLowerCase().includes(lowercaseQuery) ||
    p.location.toLowerCase().includes(lowercaseQuery) ||
    p.country.toLowerCase().includes(lowercaseQuery) ||
    p.city.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterProperties = (filters) => {
  let filtered = [...properties];
  
  if (filters.country) {
    filtered = filtered.filter(p => p.country === filters.country);
  }
  
  if (filters.city) {
    filtered = filtered.filter(p => p.city === filters.city);
  }
  
  if (filters.type) {
    filtered = filtered.filter(p => p.type === filters.type);
  }
  
  if (filters.minPrice) {
    filtered = filtered.filter(p => p.price >= filters.minPrice);
  }
  
  if (filters.maxPrice) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }
  
  if (filters.beds) {
    filtered = filtered.filter(p => p.beds >= filters.beds);
  }
  
  if (filters.baths) {
    filtered = filtered.filter(p => p.baths >= filters.baths);
  }
  
  if (filters.minSqft) {
    filtered = filtered.filter(p => p.sqft >= filters.minSqft);
  }
  
  if (filters.maxSqft) {
    filtered = filtered.filter(p => p.sqft <= filters.maxSqft);
  }
  
  if (filters.amenities && filters.amenities.length > 0) {
    filtered = filtered.filter(p =>
      filters.amenities.every(amenity => p.amenities?.includes(amenity))
    );
  }
  
  return filtered;
};

export const getPriceRange = () => {
  const prices = properties.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    avg: prices.reduce((a, b) => a + b, 0) / prices.length
  };
};

export const getPropertyStats = () => {
  return {
    total: properties.length,
    forSale: properties.filter(p => p.type === 'Sale').length,
    forRent: properties.filter(p => p.type === 'Rent').length,
    auctions: properties.filter(p => p.type === 'Auction').length,
    featured: properties.filter(p => p.featured).length,
    countries: [...new Set(properties.map(p => p.country))].length,
    cities: [...new Set(properties.map(p => p.city))].length,
    priceRange: getPriceRange()
  };
};

// Export locations
export { LOCATIONS };

export default properties;