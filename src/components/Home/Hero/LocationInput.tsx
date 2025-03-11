import React, { useState } from 'react';

interface LocationInputProps {
  onSelect: (place: string) => void;
  placeholder: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ onSelect, placeholder }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (input: string) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyB0KWOeJWvvAoo5pbLcqYTnqhCv1mp3X5U`
    );
    const data = await response.json();
    const places = data.predictions.map((prediction: any) => prediction.description);
    setSuggestions(places);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;