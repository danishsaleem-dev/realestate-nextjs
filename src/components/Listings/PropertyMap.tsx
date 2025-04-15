"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/navigation';

// Define the property interface
interface PropertyListing {
  id: string;
  propertyName: string;
  description: string;
  class: string;
  type: string;
  price: number;
  address: {
    location: string;
    // Include other address properties
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

interface PropertyMapProps {
  properties: PropertyListing[];
  selectedProperty: PropertyListing | null;
  onPropertySelect: (property: PropertyListing) => void;
  onBoundsChange: (bounds: {north: number; south: number; east: number; west: number}) => void;
}

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaXNoLWtoYW4iLCJhIjoiY2xzMnZqNXJrMDFpZzJrcGRxcWVnNnRwZSJ9.Oa-Ux8m_iZ1TNs2kBELp_g';

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties, 
  selectedProperty, 
  onPropertySelect,
  onBoundsChange
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{[key: string]: mapboxgl.Marker}>({});
  const popupsRef = useRef<{[key: string]: mapboxgl.Popup}>({});
  const router = useRouter();
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === 'undefined' || !mapContainerRef.current) return;
    
    if (!mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-98.5795, 39.8283], // Center of US [lng, lat]
        zoom: 3
      });

      map.on('load', () => {
        setMapLoaded(true);
      });

      map.on('moveend', () => {
        const bounds = map.getBounds();
        onBoundsChange({
          north: bounds?.getNorth() ?? 0,
          south: bounds?.getSouth() ?? 0,
          east: bounds?.getEast() ?? 0,
          west: bounds?.getWest() ?? 0
        });
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onBoundsChange]);

  // Update markers when properties change
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    
    try {
      // Clear existing markers
      Object.values(markersRef.current).forEach(marker => {
        marker.remove();
      });
      Object.values(popupsRef.current).forEach(popup => {
        popup.remove();
      });
      markersRef.current = {};
      popupsRef.current = {};

      // Add markers for properties with coordinates
      const validProperties = properties.filter(
        p => p.map.latitude && p.map.longitude
      );

      if (validProperties.length === 0) return;

      // Create bounds for fitting the map
      const bounds = new mapboxgl.LngLatBounds();

      validProperties.forEach(property => {
        if (!property.map.latitude || !property.map.longitude) return;

        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-marker';
        markerEl.innerHTML = `
          <div class="${selectedProperty?.id === property.id ? 'bg-secondary' : 'bg-primary'} text-white px-2 py-1 rounded shadow-md">
            $${(property.price / 1000).toFixed(0)}k
          </div>
        `;

        // Create popup with property info
        const popupContent = document.createElement('div');
        popupContent.className = 'property-popup';
        popupContent.innerHTML = `
          <div style="width: 240px;">
            <img src="${property.images.imageUrl}" alt="${property.propertyName}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 4px;" />
            <h3 style="font-weight: bold; margin: 8px 0; font-size: 16px;">${property.propertyName}</h3>
            <p style="margin: 4px 0; font-size: 14px;">${property.address.location}</p>
            <div style="display: flex; justify-content: space-between; margin-top: 8px;">
              <span style="font-size: 14px;">$${property.price.toLocaleString()}</span>
              <span style="font-size: 14px;">${property.details.bedrooms} bd | ${property.details.bathrooms} ba | ${property.details.size} sqft</span>
            </div>
            <button class="view-property-btn-${property.id}" style="background-color: #4a60a1; color: white; border: none; padding: 6px 12px; border-radius: 4px; margin-top: 8px; width: 100%; cursor: pointer;">View Details</button>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setDOMContent(popupContent);

        // Create marker
        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat([property.map.longitude, property.map.latitude])
          .setPopup(popup)
          .addTo(mapRef.current!);

        // Add click event to marker
        markerEl.addEventListener('click', () => {
          onPropertySelect(property);
        });

        // Store references
        markersRef.current[property.id] = marker;
        popupsRef.current[property.id] = popup;

        // Add click event to "View Details" button in popup
        popup.on('open', () => {
          setTimeout(() => {
            const btn = document.querySelector(`.view-property-btn-${property.id}`);
            if (btn) {
              btn.addEventListener('click', () => {
                router.push(`/property/${property.id}`);
              });
            }
          }, 100);
        });

        // Extend bounds to include this marker
        bounds.extend([property.map.longitude, property.map.latitude]);
      });

      // Fit map to bounds if we have valid properties
      if (validProperties.length > 0) {
        mapRef.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      }
    } catch (error) {
      console.error('Error updating markers:', error);
    }
  }, [properties, selectedProperty, onPropertySelect, router, mapLoaded]);

  // Center map on selected property
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !selectedProperty || !selectedProperty.map.latitude || !selectedProperty.map.longitude) return;

    // Fly to selected property
    mapRef.current.flyTo({
      center: [selectedProperty.map.longitude, selectedProperty.map.latitude],
      zoom: 15,
      essential: true
    });

    // Open popup for selected property
    const marker = markersRef.current[selectedProperty.id];
    if (marker) {
      marker.togglePopup();
    }
  }, [selectedProperty, mapLoaded]);

  return (
    <div 
      ref={mapContainerRef}
      style={{ width: '100%', height: '100%' }}
      className="mapbox-container"
    ></div>
  );
};

export default PropertyMap;