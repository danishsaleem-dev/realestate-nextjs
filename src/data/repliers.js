const API_KEY = process.env.REPLIERS_API_KEY;
const BASE_URL = 'https://api.repliers.io';

export async function getListings(params = {}) {
  const query = new URLSearchParams({
    ...params,
    status: "A", // Active listings
    resultsPerPage: 50,
    // Add other default params as needed
  }).toString();

  const response = await fetch(`${BASE_URL}/listings?${query}`, {
    headers: {
      "REPLIERS-API-KEY": API_KEY,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) throw new Error('Failed to fetch listings');
  return response.json();
}

export async function getPropertyTypes() {
  // Some APIs have endpoints for metadata like property types
  // If not, we can extract from listings
}