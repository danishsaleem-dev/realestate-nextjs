import React from 'react'

const Location = () => {
  return (
    <div className="space-y-6">
      {/* Map Section */}
      <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
        {/* Placeholder for Map (Replace with actual Map component or iframe) */}
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB0KWOeJWvvAoo5pbLcqYTnqhCv1mp3X5U&q=New+York"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-gray-500">Address</span>
          <span className="text-gray-900 font-semibold">150 sqft</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-gray-500">City</span>
          <span className="text-gray-900 font-semibold">#1234</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-gray-500">State/County</span>
          <span className="text-gray-900 font-semibold">$7,500</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-gray-500">Postal Code</span>
          <span className="text-gray-900 font-semibold">7.328</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-gray-500">Area</span>
          <span className="text-gray-900 font-semibold">7.328</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-gray-500">Country</span>
          <span className="text-gray-900 font-semibold">2024</span>
        </div>
      </div>
    </div>
  )
}

export default Location