// Remove the React hooks import since it's not needed in this file
// import { useEffect, useState } from 'react';

// Interface for the property type data
interface PropertyType {
  id: number;
  icon: string;
  type: string;
  number: number;
  class: string; // Added class property
}

// Function to fetch and transform property types
// First, let's define interfaces for the API responses

// For property types API
interface BoardClass {
  propertyTypes: PropertyTypeObject[];
}

interface PropertyTypeObject {
  [typeName: string]: {
    activeCount: number;
    [key: string]: unknown;
  };
}

interface Board {
  classes: {
    [className: string]: BoardClass;
  };
}

interface PropertyTypesResponse {
  boards: Board[];
}

// For listings API
interface ListingAddress {
  area?: string;
  city?: string;
  country?: string;
  district?: string;
  majorIntersection?: string;
  neighborhood?: string;
  streetDirection?: string;
  streetName?: string;
  streetNumber?: string;
  streetSuffix?: string;
  unitNumber?: string;
  zip?: string;
  state?: string;
  communityCode?: string;
  streetDirectionPrefix?: string;
  addressKey?: string;
}

interface ListingMap {
  latitude?: number;
  longitude?: number;
  point?: string;
}

interface ListingDetails {
  propertyType?: string;
  numBedrooms?: number;
  numBathrooms?: number;
  sqft?: number;
  lotSize?: number | string;
}

interface ListingMedia {
  photos?: {
    url: string;
    [key: string]: unknown;
  }[];
}

interface ApiListing {
  mlsNumber?: string;
  class?: string;
  type?: string;
  listPrice?: number;
  legalDescription?: string;
  publicRemarks?: string;
  address?: ListingAddress;
  map?: ListingMap;
  details?: ListingDetails;
  media?: ListingMedia;
  images?: string[];
  acres?: number | string;
  [key: string]: unknown;
}

interface ListingsResponse {
  listings: ApiListing[];
}

// Now update the fetchPropertyTypes function
export const fetchPropertyTypes = async (): Promise<PropertyType[]> => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'REPLIERS-API-KEY': 'wPBzfSTENIwtX6fXv6JZC2tR7tMUVT'
      }
    };

    const response = await fetch('https://api.repliers.io/listings/property-types', options);

    if (!response.ok) {
      console.error('API Response:', await response.text());
      throw new Error(`Failed to fetch property types: ${response.status}`);
    }

    const data = await response.json() as PropertyTypesResponse;
    
    // Transform the API data to match our existing format
    const transformedData: PropertyType[] = [];
    let id = 1;

    // Correctly parse the nested structure
    data.boards.forEach((board) => {
      Object.entries(board.classes).forEach(([className, classData]) => {
          // propertyTypes is an array of objects
        classData.propertyTypes.forEach((propertyTypeObj) => {
          // Each object in the array has property type names as keys
          Object.entries(propertyTypeObj).forEach(([typeName, typeDetails]) => {
            transformedData.push({
              id: id,
              icon: `/images/a${(id % 5) + 1}.png`, // Cycle through available icons
              type: typeName,
              number: typeDetails.activeCount,
              class: className
            });
            id++;
          });
        });
      });
    });

    return transformedData;
  } catch (error) {
    console.error('Error fetching property types:', error);
    return appartmentTypeData; // Fallback to static data if API fails
  }
};

// Update static data to include class property
  export const appartmentTypeData = [
    {
      id: 1,
      icon: "/images/a1.png",
      type: "House",
      number: 12,
      class: "residential"
    },
    {
      id: 2,
      icon: "/images/a2.png",
      type: "Appartments",
      number: 22,
      class: "residential"
    },
    {
      id: 3,
      icon: "/images/a3.png",
      type: "Office",
      number: 14,
      class: "commercial"
    },
    {
      id: 4,
      icon: "/images/a4.png",
      type: "Villa",
      number: 9,
      class: "residential"
    },
    {
      id: 5,
      icon: "/images/a5.png",
      type: "TownHouse",
      number: 12,
      class: "residential"
    },
  ];
  
  export const properties = [
    {
      id: 1,
      propertyName: "Equestrian Family Home",
      location: "New York City, CA, USA",
      bedrooms: 1,
      type: "House",
      bathrooms: 2,
      size: 1200,
      price: 45000,
      imageUrl: "/images/p1.jpg",
    },
    {
      id: 2,
      propertyName: "Modern Urban Retreat",
      location: "Brooklyn, NY, USA",
      bedrooms: 2,
      type: "Appartments",
      bathrooms: 1,
      size: 950,
      price: 50000,
      imageUrl: "/images/p2.jpg",
    },
    {
      id: 3,
      propertyName: "Cozy Countryside Cottage",
      location: "Albany, NY, USA",
      type: "House",
      bedrooms: 3,
      bathrooms: 2,
      size: 1300,
      price: 60000,
      imageUrl: "/images/p3.jpg",
    },
    {
      id: 4,
      propertyName: "Luxury Downtown Apartment",
      location: "Manhattan, NY, USA",
      type: "Appartments",
      bedrooms: 1,
      bathrooms: 1,
      size: 800,
      price: 75000,
      imageUrl: "/images/p4.jpg",
    },
    {
      id: 5,
      propertyName: "Spacious Suburban House",
      location: "Staten Island, NY, USA",
      type: "House",
      bedrooms: 4,
      bathrooms: 3,
      size: 2000,
      price: 90000,
      imageUrl: "/images/p5.jpg",
    },
    {
      id: 6,
      propertyName: "Chic Studio Loft",
      location: "Queens, NY, USA",
      type: "Office",
      bedrooms: 1,
      bathrooms: 1,
      size: 700,
      price: 48000,
      imageUrl: "/images/p6.jpg",
    },
  ];
  
  export const cities = [
    {
      id: 1,
      image: "/images/c1.jpg",
      cityName: "New York",
      numberOfProperties: 120,
    },
    {
      id: 2,
      image: "/images/c2.jpg",
      cityName: "Los Angeles",
      numberOfProperties: 85,
    },
    {
      id: 3,
      image: "/images/c3.jpg",
      cityName: "Chicago",
      numberOfProperties: 95,
    },
    {
      id: 4,
      image: "/images/c4.jpg",
      cityName: "San Francisco",
      numberOfProperties: 60,
    },
    {
      id: 5,
      image: "/images/c5.jpg",
      cityName: "Miami",
      numberOfProperties: 70,
    },
    {
      id: 6,
      image: "/images/c6.jpg",
      cityName: "Boston",
      numberOfProperties: 50,
    },
  ];
  
  export const buildings = [
    {
      id: 1,
      title: "Secure Parking",
      description: "Safe parking with 24/7 surveillance.",
      image: "/images/h1.png",
    },
    {
      id: 2,
      title: "Luxury Swimming Pool",
      description: "A pristine pool for relaxation.",
      image: "/images/h2.png",
    },
    {
      id: 3,
      title: "24/7 Private Security",
      description: "Round-the-clock private security.",
      image: "/images/h3.png",
    },
    {
      id: 4,
      title: "On-Site Medical Center",
      description: "Immediate medical care on-site.",
      image: "/images/h4.png",
    },
    {
      id: 5,
      title: "Quiet Library Area",
      description: "Peaceful space for reading and study.",
      image: "/images/h5.png",
    },
    {
      id: 6,
      title: "King-Size Comfort Beds",
      description: "Luxurious king-size beds for comfort.",
      image: "/images/h6.png",
    },
  ];
  
  export const blogs = [
    {
      id: 1,
      date: "02 Apr 2024",
      comment: "Comments (3)",
      title: "Find the Perfect Advertiser for Your Needs",
      shortDescription:
        "Find the right advertiser to effectively boost your business.",
      image: "/images/p1.jpg",
    },
    {
      id: 2,
      date: "05 Apr 2024",
      comment: "Comments (2)",
      title: "Maximize Your Business Growth with Smart Marketing",
      shortDescription:
        "Grow your business using smart, effective marketing strategies.",
      image: "/images/p2.jpg",
    },
    {
      id: 3,
      date: "10 Apr 2024",
      comment: "Comments (5)",
      title: "Tips for Choosing the Right Property to Invest In",
      shortDescription:
        "Select the best properties for secure and profitable investments.",
      image: "/images/p3.jpg",
    },
  ];
  
  export const userReviewData = [
    {
      id: 1,
      name: "John Doe",
      profession: "Real Estate Agent",
      userImage: "/images/u1.jpg",
      review:
        "A wonderful experience! The platform made it easy to find exactly what I needed.",
    },
    {
      id: 2,
      name: "Mike Smith",
      profession: "Property Investor",
      userImage: "/images/u2.jpg",
      review:
        "Great selection of properties and seamless process. Highly recommended for anyone looking to invest.",
    },
    {
      id: 3,
      name: "Alex Johnson",
      profession: "Home Buyer",
      userImage: "/images/u3.jpg",
      review:
        "The website helped me find my dream home quickly and hassle-free. Exceptional service!",
    },
    {
      id: 4,
      name: "Emily Clark",
      profession: "Interior Designer",
      userImage: "/images/u4.jpg",
      review:
        "Fantastic range of properties with clear details. The best platform for home and design inspiration!",
    },
  ];

  export const services = [
    {
      id: 1,
      name: "Buy A New Home",
      description: "Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.",
      serviceImage: "/images/home-1.png",
    },
    {
      id: 2,
      name: "Sell a home",
      description: "Sell confidently with expert guidance and effective strategies, showcasing your property's best features for a successful sale.",
      serviceImage: "/images/home-2.png",
    },
    {
      id: 3,
      name: "Rent a home",
      description: "Discover your perfect rental effortlessly. Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.",
      serviceImage: "/images/home-3.png",
    }
  ];
  
  export const agents = [
    {
      id: 1,
      name: "Chris Evans",
      role: "Administrative Staff",
      image: "/images/agent-2.jpg",
      email: "admin@gmail.com",
      phone: "(123) 456-7890",
    },
    {
      id: 2,
      name: "Julia Sky",
      role: "Administrative Staff",
      image: "/images/agent-1.jpg",
      email: "admin@gmail.com",
      phone: "(123) 456-7890",
    },
    {
      id: 1,
      name: "Robert Dave",
      role: "Administrative Staff",
      image: "/images/agent-3.jpg",
      email: "admin@gmail.com",
      phone: "(123) 456-7890",
    },
    {
      id: 1,
      name: "Britney Fox",
      role: "Administrative Staff",
      image: "/images/agent-4.jpg",
      email: "admin@gmail.com",
      phone: "(123) 456-7890",
    },
  ];

// Updated interface for property class data
interface PropertyClass {
  id: number;
  icon: string;
  type: string; // This will be the class name (Condo, Commercial, Residential)
  number: number; // Total count of properties in this class
}

// Function to fetch and transform property classes
// In the fetchPropertyClasses function, update the line with the unused variable
export const fetchPropertyClasses = async (): Promise<PropertyClass[]> => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'REPLIERS-API-KEY': 'wPBzfSTENIwtX6fXv6JZC2tR7tMUVT'
      }
    };

    const response = await fetch('https://api.repliers.io/listings/property-types', options);

    if (!response.ok) {
      console.error('API Response:', await response.text());
      throw new Error(`Failed to fetch property types: ${response.status}`);
    }

    const data = await response.json() as PropertyTypesResponse;
    
    // Rest of the function remains the same
    // Transform the API data to aggregate by class
    const classTotals: Record<string, number> = {};
    
    // Calculate total properties for each class
    // In the fetchPropertyClasses function, update the line with the unused variable
    data.boards.forEach((board) => {
      Object.entries(board.classes).forEach(([className, classData]) => {
        classTotals[className] = 0;
        
        // propertyTypes is an array of objects
        classData.propertyTypes.forEach((propertyTypeObj) => {
          // Each object in the array has property type names as keys
          Object.entries(propertyTypeObj).forEach(([, typeDetails]) => {
            classTotals[className] += typeDetails.activeCount;
          });
        });
      });
    });
    
    // Convert to our desired format
    const transformedData: PropertyClass[] = Object.entries(classTotals).map(([className, count], index) => ({
      id: index + 1,
      icon: `/images/a${(index % 5) + 1}.png`,
      type: className.charAt(0).toUpperCase() + className.slice(1) + " Properties", // Capitalize and add "Properties"
      number: count
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching property classes:', error);
    // Fallback data for the three main classes
    return [
      {
        id: 1,
        icon: "/images/a1.png",
        type: "Condo Properties",
        number: 120
      },
      {
        id: 2,
        icon: "/images/a2.png",
        type: "Commercial Properties",
        number: 85
      },
      {
        id: 3,
        icon: "/images/a3.png",
        type: "Residential Properties",
        number: 150
      }
    ];
  }
};


// Interface for property listings with improved structure
interface PropertyListing {
  id: string;
  propertyName: string;
  description: string;
  class: string;
  type: string;
  price: number;
  address: {
    area: string | null;
    city: string | null;
    country: string | null;
    district: string | null;
    majorIntersection: string | null;
    neighborhood: string | null;
    streetDirection: string | null;
    streetName: string | null;
    streetNumber: string | null;
    streetSuffix: string | null;
    unitNumber: string | null;
    zip: string | null;
    state: string | null;
    communityCode: string | null;
    streetDirectionPrefix: string | null;
    addressKey: string | null;
    location: string; // Full formatted address
  };
  map: {
    latitude: number | null;
    longitude: number | null;
    point: string | null;
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    size: number;
    landSize: number | string;
  };
  images: {
    imageUrl: string;
    allImages: string[];
  };
}

// Update the DEFAULT_PROPERTIES with the new structure
const DEFAULT_PROPERTIES: PropertyListing[] = [
  {
    id: '1',
    propertyName: 'Sample Property',
    description: 'Beautiful property in great location',
    class: 'residential',
    type: 'House',
    price: 350000,
    address: {
      area: null,
      city: null,
      country: null,
      district: null,
      majorIntersection: null,
      neighborhood: null,
      streetDirection: null,
      streetName: null,
      streetNumber: null,
      streetSuffix: null,
      unitNumber: null,
      zip: null,
      state: null,
      communityCode: null,
      streetDirectionPrefix: null,
      addressKey: null,
      location: 'Sample Location',
    },
    map: {
      latitude: null,
      longitude: null,
      point: null
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      size: 1500,
      landSize: 'Unknown landSize'
    },
    images: {
      imageUrl: '/images/p1.jpg',
      allImages: [
        '/images/p1.jpg',
        '/images/p2.jpg',
        '/images/p3.jpg',
        '/images/p4.jpg',
        '/images/p5.jpg'
      ]
    }
  }
];

// Update the fetchPropertyListings function to extract map coordinates
// Update the fetchPropertyListings function to use the new structure
// In the fetchPropertyListings function, update the image handling code
export const fetchPropertyListings = async (): Promise<PropertyListing[]> => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'REPLIERS-API-KEY': 'wPBzfSTENIwtX6fXv6JZC2tR7tMUVT'
      }
    };

    const response = await fetch('https://api.repliers.io/listings', options);

    if (!response.ok) {
      console.error('API Response:', await response.text());
      throw new Error(`Failed to fetch listings: ${response.status}`);
    }

    const data = await response.json() as ListingsResponse;
    
    // Transform the API data to match our new format
    const transformedData: PropertyListing[] = data.listings.map((listing: ApiListing, index: number) => {
      // Better handling of property class and type
      const propertyClass = listing.class || (listing.details?.propertyType?.toLowerCase().includes('commercial') ? 'commercial' : 'residential');
      const propertyType = listing.details?.propertyType || listing.type || 'Property';
      const city = listing.address?.city || 'Unknown Location';
      const propertyName = `${propertyType} in ${city}`;
      
      // Improved description handling with fallbacks
      const description = listing.legalDescription || 
                          listing.publicRemarks || 
                          `This ${propertyType.toLowerCase()} is located in ${city} and features ${listing.details?.numBedrooms || 0} bedrooms and ${listing.details?.numBathrooms || 0} bathrooms.`;
      
      // Format location with better handling of undefined values
      const locationParts = [
        listing.address?.unitNumber,
        listing.address?.streetNumber,
        listing.address?.streetName,
        listing.address?.streetSuffix,
        listing.address?.streetDirection,
        listing.address?.neighborhood,
        listing.address?.city,
        listing.address?.zip
      ].filter(Boolean);
      
      const location = locationParts.length > 0 
        ? locationParts.join(' ') 
        : 'Location not available';
      
      // Improved image handling with error checking
      let allImages: string[] = [];
      
      try {
        // Check both possible image locations in the API response
        if (listing.media?.photos && Array.isArray(listing.media.photos)) {
          allImages = listing.media.photos
            .filter((photo): photo is { url: string; [key: string]: unknown } => 
              photo !== null && typeof photo === 'object' && 'url' in photo && typeof photo.url === 'string')
            .map((photo: { url: string; [key: string]: unknown }) => {
              return photo.url.startsWith('http') 
                ? photo.url 
                : `https://api.repliers.io/${photo.url.replace(/^\/+/, '')}`;
            });
        } else if (listing.images && Array.isArray(listing.images)) {
          allImages = listing.images
            .filter((img): img is string => typeof img === 'string')
            .map((img: string) => {
              return img.startsWith('http') 
                ? img 
                : `https://api.repliers.io/${img.replace(/^\/+/, '')}`;
            });
        }
      } catch (err) {
        console.error('Error processing images for listing:', listing.mlsNumber, err);
      }
      
      // Fallback images if none found or error occurred
      if (allImages.length === 0) {
        allImages = [
          '/images/p1.jpg',
          '/images/p2.jpg',
          '/images/p3.jpg',
          '/images/p4.jpg',
          '/images/p5.jpg'
        ];
      }
      
      // In the fetchPropertyListings function, update the address mapping:
      return {
        id: listing.mlsNumber || `property-${index + 1}`,
        propertyName,
        description,
        class: propertyClass,
        type: propertyType,
        price: listing.listPrice || 0,
        address: {
          area: listing.address?.area || null,
          city: listing.address?.city || null,
          country: listing.address?.country || null,
          district: listing.address?.district || null,
          majorIntersection: listing.address?.majorIntersection || null,
          neighborhood: listing.address?.neighborhood || null,
          streetDirection: listing.address?.streetDirection || null,
          streetName: listing.address?.streetName || null,
          streetNumber: listing.address?.streetNumber || null,
          streetSuffix: listing.address?.streetSuffix || null,
          unitNumber: listing.address?.unitNumber || null,
          zip: listing.address?.zip || null,
          state: listing.address?.state || null,
          communityCode: listing.address?.communityCode || null,
          streetDirectionPrefix: listing.address?.streetDirectionPrefix || null,
          addressKey: listing.address?.addressKey || null,
          location: location
        },
        map: {
          latitude: listing.map?.latitude || null,
          longitude: listing.map?.longitude || null,
          point: listing.map?.point || null
        },
        details: {
          bedrooms: listing.details?.numBedrooms || 0,
          bathrooms: listing.details?.numBathrooms || 0,
          size: listing.details?.sqft || 0,
          landSize: listing.acres || listing.details?.lotSize || 'Unknown landSize'
        },
        images: {
          imageUrl: allImages[0],
          allImages: allImages
        }
      };
    });

    return transformedData;
  } catch (error) {
    console.error('Error fetching property listings:', error);
    // Return default properties with proper formatting
    return DEFAULT_PROPERTIES.map(property => ({
      ...property,
      id: property.id.toString(),
      class: property.type === 'Office' ? 'commercial' : 'residential',
      images: {
        imageUrl: property.images.imageUrl,
        allImages: property.images.allImages || [property.images.imageUrl]
      },
      // Include map coordinates in the fallback data
      map: {
        latitude: property.map?.latitude || null,
        longitude: property.map?.longitude || null,
        point: property.map?.point || null,
      }
    }));
  }
};

// Interface for city data
interface City {
  id: number;
  image: string;
  cityName: string;
  numberOfProperties: number;
}

// Function to fetch top cities
// In the fetchTopCities function, update the data type assertion
export const fetchTopCities = async (): Promise<City[]> => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'REPLIERS-API-KEY': 'wPBzfSTENIwtX6fXv6JZC2tR7tMUVT'
      }
    };

    const response = await fetch('https://api.repliers.io/listings', options);

    if (!response.ok) {
      console.error('API Response:', await response.text());
      throw new Error(`Failed to fetch listings: ${response.status}`);
    }

    const data = await response.json() as ListingsResponse;
    
    // Count properties by city
    const cityCounts: Record<string, number> = {};
    
    data.listings.forEach((listing: ApiListing) => {
      const city = listing.address?.city;
      if (city) {
        cityCounts[city] = (cityCounts[city] || 0) + 1;
      }
    });
    
    // Rest of the function remains the same
    const sortedCities = Object.entries(cityCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 6)
      .map(([cityName, count], index) => ({
        id: index + 1,
        image: `/images/c${(index % 6) + 1}.jpg`,
        cityName,
        numberOfProperties: count
      }));
    
    return sortedCities;
  } catch (error) {
    console.error('Error fetching top cities:', error);
    return cities; // Fallback to static data if API fails
  }
};