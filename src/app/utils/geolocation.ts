/**
 * Geolocation Utilities
 * Handles browser geolocation API and coordinate management
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationResult {
  coords: Coordinates;
  address?: string;
  error?: string;
}

/**
 * Get user's current location using browser Geolocation API
 */
export function getCurrentLocation(): Promise<LocationResult> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        error: 'Geolocation is not supported by your browser',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        reject({ error: errorMessage });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in kilometers
 */
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.latitude)) *
      Math.cos(toRad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Format coordinates for display
 */
export function formatCoordinates(coords: Coordinates): string {
  return `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
}

/**
 * Mock geocoding (convert address to coordinates)
 * In production, use Google Maps Geocoding API
 */
export async function geocodeAddress(address: string): Promise<Coordinates> {
  // Popular locations database (mock)
  const locationDatabase: Record<string, Coordinates> = {
    'Connaught Place, New Delhi': { latitude: 28.6315, longitude: 77.2167 },
    'Bandra West, Mumbai': { latitude: 19.0596, longitude: 72.8295 },
    'Koramangala, Bangalore': { latitude: 12.9352, longitude: 77.6245 },
    'Park Street, Kolkata': { latitude: 22.5535, longitude: 88.3516 },
    'Anna Nagar, Chennai': { latitude: 13.0878, longitude: 80.2085 },
    'Banjara Hills, Hyderabad': { latitude: 17.4239, longitude: 78.4438 },
    'Ashram Road, Ahmedabad': { latitude: 23.0225, longitude: 72.5714 },
    'Civil Lines, Jaipur': { latitude: 26.9124, longitude: 75.7873 },
  };

  // Check if address exists in database
  for (const [key, coords] of Object.entries(locationDatabase)) {
    if (address.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(address.toLowerCase())) {
      return coords;
    }
  }

  // Default fallback (Connaught Place)
  console.warn(`Address "${address}" not found in database, using default location`);
  return { latitude: 28.6315, longitude: 77.2167 };
}

/**
 * Reverse geocoding (convert coordinates to address)
 * In production, use Google Maps Reverse Geocoding API
 */
export async function reverseGeocode(coords: Coordinates): Promise<string> {
  // Mock reverse geocoding
  // In production: fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${API_KEY}`)
  
  const locationDatabase: Array<{ name: string; coords: Coordinates; radius: number }> = [
    { name: 'Connaught Place, New Delhi', coords: { latitude: 28.6315, longitude: 77.2167 }, radius: 2 },
    { name: 'Bandra West, Mumbai', coords: { latitude: 19.0596, longitude: 72.8295 }, radius: 2 },
    { name: 'Koramangala, Bangalore', coords: { latitude: 12.9352, longitude: 77.6245 }, radius: 2 },
    { name: 'Park Street, Kolkata', coords: { latitude: 22.5535, longitude: 88.3516 }, radius: 2 },
  ];

  // Find nearest location
  for (const location of locationDatabase) {
    const distance = calculateDistance(coords, location.coords);
    if (distance <= location.radius) {
      return location.name;
    }
  }

  return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
}

/**
 * Check if location services are available
 */
export function isGeolocationAvailable(): boolean {
  return 'geolocation' in navigator;
}

/**
 * Request location permission
 */
export async function requestLocationPermission(): Promise<boolean> {
  try {
    const result = await getCurrentLocation();
    return !!result.coords;
  } catch (error) {
    return false;
  }
}
