"use client";

import React, { useState, useRef, useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Update the props interface to include all required properties
export interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (address: string) => void;
  onSelectCoordinates?: (coordinates: {lat: number, lng: number} | null) => void;
  placeholder?: string;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ 
  value, 
  onChange, 
  onSelect,
  onSelectCoordinates,
  placeholder = "Enter location",
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const {
    ready,
    value: inputValue,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  
  // Sync the external value with the internal input value
  useEffect(() => {
    // Only set the internal value if it's different, to avoid re-renders
    if (value !== inputValue) {
      setValue(value);
    }
  }, [value, setValue, inputValue]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  
  const handleSelectSuggestion = (description: string) => {
    setValue(description, false);
    onChange(description);
    clearSuggestions();
    setIsFocused(false);
    
    // Call the onSelect callback if it was provided
    if (onSelect) {
      onSelect(description);
    }

    // Get latitude and longitude via utility functions
    if (onSelectCoordinates) {
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
          onSelectCoordinates({ lat, lng });
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
          onSelectCoordinates(null);
        });
    }
  };
  
  // Define interfaces for better type safety
  interface SuggestionItem {
    id: string;
    mainText: string;
    secondaryText: string;
    description: string;
  }

  interface GroupedSuggestions {
    [category: string]: SuggestionItem[];
  }

  interface AutocompleteSuggestion {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
    types: string[];
  }

  // Group suggestions by types
  const groupedSuggestions = data.reduce((acc: GroupedSuggestions, suggestion: AutocompleteSuggestion) => {
    const mainText = suggestion.structured_formatting.main_text;
    const secondaryText = suggestion.structured_formatting.secondary_text;
    const type = getLocationType(suggestion.types);
    
    if (!acc[type]) {
      acc[type] = [];
    }
    
    acc[type].push({
      id: suggestion.place_id,
      mainText,
      secondaryText,
      description: suggestion.description
    });
    
    return acc;
  }, {} as GroupedSuggestions);
  
  // Helper function to determine location type
  function getLocationType(types: string[]) {
    if (types.includes('neighborhood')) return 'Neighborhoods';
    if (types.includes('locality')) return 'Cities';
    if (types.includes('street_address')) return 'Addresses';
    if (types.includes('sublocality')) return 'Districts';
    if (types.includes('administrative_area_level_1')) return 'States';
    if (types.includes('country')) return 'Countries';
    return 'Other Locations';
  }
  
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          disabled={!ready}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {inputValue && (
          <button 
            onClick={() => {
              setValue('');
              onChange('');
              clearSuggestions();
              if (onSelectCoordinates) onSelectCoordinates(null);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {isFocused && status === "OK" && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto"
        >
          {Object.entries(groupedSuggestions).map(([category, items]) => (
              <div key={category} className="px-1 py-2">
                <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                  {category}
                </div>
                <ul>
                  {items.map((item) => (
                    <li 
                      key={item.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleSelectSuggestion(item.description)}
                    >
                      <FaMapMarkerAlt className="text-primary mr-2" />
                      <div>
                        <div className="font-medium">{item.mainText}</div>
                        <div className="text-xs text-gray-500">{item.secondaryText}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;