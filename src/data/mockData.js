// ============================================
// data/mockData.js - Enhanced Version
// ============================================

export const properties = [
  // --- 1. AUCTION: USA ---
  {
    id: 1,
    title: "Modern Luxury Villa (Foreclosure)",
    location: "Beverly Hills, CA",
    country: "USA",
    city: "Los Angeles",
    price: 1500000, 
    beds: 5,
    baths: 4,
    sqft: 4500,
    type: "Auction",
    status: "available",
    featured: true,
    rating: 4.9,
    views: 2340,
    listedAt: "2024-01-15T10:00:00Z",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
    coordinates: [34.0736, -118.4004],
    seller: {
      id: "seller_1",
      name: "Luxury Estates Inc.",
      verified: true,
      rating: 4.8
    },
    amenities: [
      "Garden View",
      "Free Wi-Fi",
      "Private Pool",
      "24/7 Security",
      "Central A/C",
      "Gym"
    ],
    description: "Experience ultimate luxury in this stunning modern villa featuring state-of-the-art amenities and breathtaking city views."
  },

  // --- 2. RENT: NY ---
  {
    id: 2,
    title: "Downtown Loft Apartment",
    location: "New York, NY",
    country: "USA",
    city: "New York",
    price: 8500,
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "Rent",
    status: "available",
    featured: false,
    rating: 4.7,
    views: 1890,
    listedAt: "2024-02-01T14:30:00Z",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop",
    coordinates: [40.7128, -74.0060],
    seller: {
      id: "seller_2",
      name: "Metro Living Realty",
      verified: true,
      rating: 4.6
    },
    amenities: [
      "Gym",
      "Rooftop Access",
      "Concierge",
      "Pet Friendly"
    ]
  },

  // --- 3. SALE: Miami ---
  {
    id: 3,
    title: "Cozy Beachfront Bungalow",
    location: "Miami, FL",
    country: "USA",
    city: "Miami",
    price: 1200000,
    beds: 3,
    baths: 3,
    sqft: 2100,
    type: "Sale",
    status: "available",
    featured: true,
    rating: 4.8,
    views: 3120,
    listedAt: "2024-01-20T09:00:00Z",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1600&auto=format&fit=crop",
    coordinates: [25.7617, -80.1918],
    seller: {
      id: "seller_3",
      name: "Coastal Properties Group",
      verified: true,
      rating: 4.9
    },
    amenities: [
      "Beach Access",
      "Ocean View",
      "Private Dock",
      "Hurricane Proof"
    ]
  },

  // --- 4. RENT: Berlin ---
  {
    id: 4,
    title: "Minimalist Studio Apartment",
    location: "Berlin, Germany",
    country: "Germany",
    city: "Berlin",
    price: 1500, 
    beds: 1,
    baths: 1,
    sqft: 650,
    type: "Rent",
    status: "available",
    featured: false,
    rating: 4.5,
    views: 980,
    listedAt: "2024-02-10T11:15:00Z",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop",
    coordinates: [52.5200, 13.4050],
    seller: {
      id: "seller_4",
      name: "Berlin Urban Living",
      verified: false,
      rating: 4.3
    },
    amenities: [
      "Central Location",
      "Modern Kitchen",
      "Bike Storage"
    ]
  },

  // --- 5. SALE: Egypt (New Cairo) ---
  {
    id: 5,
    title: "Grand Family Mansion",
    location: "New Cairo, Egypt",
    country: "Egypt",
    city: "Cairo",
    price: 4500000,
    beds: 6,
    baths: 5,
    sqft: 6000,
    type: "Sale",
    status: "available",
    featured: true,
    rating: 4.9,
    views: 1560,
    listedAt: "2024-01-25T08:00:00Z",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    coordinates: [30.0444, 31.4357],
    seller: {
      id: "seller_5",
      name: "Egyptian Luxury Homes",
      verified: true,
      rating: 4.7
    },
    amenities: [
      "Private Garden",
      "Gated Community",
      "Smart Home",
      "Maid's Room"
    ]
  },

  // --- 6. SALE: Egypt (El Gouna) ---
  {
    id: 6,
    title: "Sea View Chalet",
    location: "El Gouna, Red Sea",
    country: "Egypt",
    city: "El Gouna",
    price: 320000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "Sale",
    status: "available",
    featured: false,
    rating: 4.6,
    views: 890,
    listedAt: "2024-02-05T13:30:00Z",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    coordinates: [27.3949, 33.6782],
    seller: {
      id: "seller_6",
      name: "Red Sea Realty",
      verified: true,
      rating: 4.5
    },
    amenities: [
      "Sea View",
      "Private Beach",
      "Marina Access",
      "Resort Amenities"
    ]
  },

  // --- 7. SALE: Dubai ---
  {
    id: 7,
    title: "Skyline Penthouse",
    location: "Dubai, UAE",
    country: "UAE",
    city: "Dubai",
    price: 3500000,
    beds: 4,
    baths: 4,
    sqft: 3500,
    type: "Sale",
    status: "available",
    featured: true,
    rating: 5.0,
    views: 4200,
    listedAt: "2024-01-10T07:00:00Z",
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=1600&auto=format&fit=crop",
    coordinates: [25.2048, 55.2708],
    seller: {
      id: "seller_7",
      name: "Emirates Premium Properties",
      verified: true,
      rating: 4.9
    },
    amenities: [
      "Burj Khalifa View",
      "Private Pool",
      "Valet Parking",
      "Concierge 24/7"
    ]
  },

  // --- 8. RENT: Aspen ---
  {
    id: 8,
    title: "Rustic Mountain Cabin",
    location: "Aspen, CO",
    country: "USA",
    city: "Aspen",
    price: 5000, 
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "Rent",
    status: "available",
    featured: false,
    rating: 4.8,
    views: 1240,
    listedAt: "2024-02-08T16:00:00Z",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1600&auto=format&fit=crop",
    coordinates: [39.1911, -106.8175],
    seller: {
      id: "seller_8",
      name: "Mountain Retreats LLC",
      verified: true,
      rating: 4.7
    },
    amenities: [
      "Ski-in/Ski-out",
      "Fireplace",
      "Hot Tub",
      "Mountain View"
    ]
  },

  // --- 9. AUCTION: London ---
  {
    id: 9,
    title: "Historic Victorian Townhouse",
    location: "London, UK",
    country: "UK",
    city: "London",
    price: 1800000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    type: "Auction",
    status: "available",
    featured: true,
    rating: 4.7,
    views: 1680,
    listedAt: "2024-01-28T10:30:00Z",
    image: "https://images.unsplash.com/photo-1513584685908-2274653fa36f?q=80&w=1600&auto=format&fit=crop",
    coordinates: [51.5074, -0.1278],
    seller: {
      id: "seller_9",
      name: "London Heritage Estates",
      verified: true,
      rating: 4.8
    },
    amenities: [
      "Historic Architecture",
      "Garden",
      "Period Features",
      "Central London"
    ]
  },

  // --- 10. SALE: Paris ---
  {
    id: 10,
    title: "Apartment with Eiffel View",
    location: "Paris, France",
    country: "France",
    city: "Paris",
    price: 950000,
    beds: 2,
    baths: 1,
    sqft: 850,
    type: "Sale",
    status: "available",
    featured: false,
    rating: 4.9,
    views: 2100,
    listedAt: "2024-02-03T12:00:00Z",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
    coordinates: [48.8566, 2.3522],
    seller: {
      id: "seller_10",
      name: "Paris Luxury Living",
      verified: true,
      rating: 4.9
    },
    amenities: [
      "Eiffel Tower View",
      "Balcony",
      "Parisian Architecture",
      "Metro Access"
    ]
  },

  // --- 11. AUCTION: Santorini ---
  {
    id: 11,
    title: "Cliffside White Villa",
    location: "Santorini, Greece",
    country: "Greece",
    city: "Santorini",
    price: 2100000,
    beds: 3,
    baths: 3,
    sqft: 1800,
    type: "Auction",
    status: "available",
    featured: true,
    rating: 5.0,
    views: 3400,
    listedAt: "2024-01-18T09:30:00Z",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop",
    coordinates: [36.3932, 25.4615],
    seller: {
      id: "seller_11",
      name: "Aegean Properties",
      verified: true,
      rating: 5.0
    },
    amenities: [
      "Caldera View",
      "Infinity Pool",
      "Cave Architecture",
      "Sunset Terrace"
    ]
  },

  // --- 12. RENT: Tokyo ---
  {
    id: 12,
    title: "Modern Shibuya Condo",
    location: "Tokyo, Japan",
    country: "Japan",
    city: "Tokyo",
    price: 3000,
    beds: 1,
    baths: 1,
    sqft: 500,
    type: "Rent",
    status: "available",
    featured: false,
    rating: 4.6,
    views: 1120,
    listedAt: "2024-02-07T15:45:00Z",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
    coordinates: [35.6762, 139.6503],
    seller: {
      id: "seller_12",
      name: "Tokyo Urban Spaces",
      verified: false,
      rating: 4.4
    },
    amenities: [
      "City Center",
      "Public Transport",
      "Modern Design",
      "Rooftop"
    ]
  },

  // --- 13. AUCTION: Riyadh ---
  {
    id: 13,
    title: "Luxury Arabian Palace",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    city: "Riyadh",
    price: 3800000,
    beds: 8,
    baths: 7,
    sqft: 8500,
    type: "Auction",
    status: "available",
    featured: true,
    rating: 4.8,
    views: 980,
    listedAt: "2024-01-22T11:00:00Z",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    coordinates: [24.7136, 46.6753],
    seller: {
      id: "seller_13",
      name: "Royal Estates KSA",
      verified: true,
      rating: 4.9
    },
    amenities: [
      "Palace Architecture",
      "Multiple Courtyards",
      "Guest Wings",
      "Grand Majlis"
    ]
  }
];

// ============================================
// LOCATIONS DATA
// ============================================

export const LOCATIONS = {
  USA: ["New York", "Los Angeles", "Miami", "Chicago", "Aspen"],
  Egypt: ["Cairo", "Alexandria", "Giza", "Sharm El Sheikh", "El Gouna"],
  UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Dammam", "Khobar"],
  UK: ["London", "Manchester", "Edinburgh", "Birmingham"],
  France: ["Paris", "Lyon", "Marseille", "Nice"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
  Greece: ["Athens", "Santorini", "Mykonos", "Crete"],
  Japan: ["Tokyo", "Osaka", "Kyoto", "Yokohama"]
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get properties by type
export const getPropertiesByType = (type) => {
  return properties.filter(p => p.type === type);
};

// Get properties by country
export const getPropertiesByCountry = (country) => {
  return properties.filter(p => p.country === country);
};

// Get featured properties
export const getFeaturedProperties = () => {
  return properties.filter(p => p.featured);
};

// Get property by ID
export const getPropertyById = (id) => {
  return properties.find(p => p.id === Number(id));
};

// Sort properties
export const sortProperties = (props, sortBy) => {
  const sorted = [...props];
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt));
    case 'popular':
      return sorted.sort((a, b) => b.views - a.views);
    default:
      return sorted;
  }
};

// Search properties
export const searchProperties = (query) => {
  const lowerQuery = query.toLowerCase();
  return properties.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.location.toLowerCase().includes(lowerQuery) ||
    p.country.toLowerCase().includes(lowerQuery) ||
    p.city.toLowerCase().includes(lowerQuery)
  );
};