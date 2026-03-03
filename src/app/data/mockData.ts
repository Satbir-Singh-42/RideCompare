export interface RideOption {
  id: string;
  provider: string;
  providerColor: string;
  vehicleType: string;
  vehicleCategory: "auto" | "bike" | "mini" | "sedan" | "suv" | "premium";
  fare: number;
  originalFare?: number;
  eta: number; // minutes
  surgeMultiplier?: number;
  rating: number;
  deepLink: string;
}

export interface Provider {
  name: string;
  color: string;
  logo: string;
}

export const providers: Provider[] = [
  { name: "Uber", color: "#000000", logo: "/logos/uber.png" },
  { name: "Lyft", color: "#FFFFFF", logo: "/logos/lyft.png" },
  { name: "Ola", color: "#FFFFFF", logo: "/logos/ola.png" },
  { name: "Rapido", color: "#FFD500", logo: "/logos/rapido.png" },
];

export const providerLogoMap: Record<string, string> = {
  Uber: "/logos/uber.png",
  Lyft: "/logos/lyft.png",
  Ola: "/logos/ola.png",
  Rapido: "/logos/rapido.png",
};

export const vehicleCategories = [
  { key: "all", label: "All", icon: "LayoutGrid" },
  { key: "auto", label: "Auto", icon: "Zap" },
  { key: "bike", label: "Bike", icon: "Bike" },
  { key: "mini", label: "Mini", icon: "Car" },
  { key: "sedan", label: "Sedan", icon: "CarFront" },
  { key: "suv", label: "SUV", icon: "Truck" },
  { key: "premium", label: "Premium", icon: "Crown" },
];

export function generateMockResults(pickup: string, drop: string): RideOption[] {
  // Generate deterministic-ish prices based on strings
  const seed = (pickup.length + drop.length) * 7;
  const baseDistance = 5 + (seed % 15);

  const results: RideOption[] = [
    // Uber options
    {
      id: "uber-auto",
      provider: "Uber",
      providerColor: "#000000",
      vehicleType: "Uber Auto",
      vehicleCategory: "auto",
      fare: Math.round(35 + baseDistance * 8),
      eta: 3 + (seed % 5),
      rating: 4.6,
      deepLink: "https://m.uber.com",
    },
    {
      id: "uber-moto",
      provider: "Uber",
      providerColor: "#000000",
      vehicleType: "Uber Moto",
      vehicleCategory: "bike",
      fare: Math.round(20 + baseDistance * 5),
      eta: 2 + (seed % 3),
      rating: 4.5,
      deepLink: "https://m.uber.com",
    },
    {
      id: "uber-go",
      provider: "Uber",
      providerColor: "#000000",
      vehicleType: "UberGo",
      vehicleCategory: "mini",
      fare: Math.round(65 + baseDistance * 12),
      eta: 4 + (seed % 6),
      rating: 4.7,
      deepLink: "https://m.uber.com",
    },
    {
      id: "uber-sedan",
      provider: "Uber",
      providerColor: "#000000",
      vehicleType: "Uber Comfort",
      vehicleCategory: "sedan",
      fare: Math.round(95 + baseDistance * 15),
      eta: 6 + (seed % 8),
      surgeMultiplier: 1.3,
      originalFare: Math.round(80 + baseDistance * 13),
      rating: 4.8,
      deepLink: "https://m.uber.com",
    },
    {
      id: "uber-xl",
      provider: "Uber",
      providerColor: "#000000",
      vehicleType: "Uber XL",
      vehicleCategory: "suv",
      fare: Math.round(140 + baseDistance * 18),
      eta: 8 + (seed % 10),
      rating: 4.8,
      deepLink: "https://m.uber.com",
    },
    {
      id: "uber-premier",
      provider: "Uber",
      providerColor: "#000000",
      vehicleType: "Uber Premier",
      vehicleCategory: "premium",
      fare: Math.round(180 + baseDistance * 22),
      eta: 10 + (seed % 12),
      rating: 4.9,
      deepLink: "https://m.uber.com",
    },
    // Lyft options
    {
      id: "lyft-standard",
      provider: "Lyft",
      providerColor: "#FFFFFF",
      vehicleType: "Lyft Standard",
      vehicleCategory: "mini",
      fare: Math.round(60 + baseDistance * 11),
      eta: 5 + (seed % 7),
      rating: 4.6,
      deepLink: "https://www.lyft.com",
    },
    {
      id: "lyft-xl",
      provider: "Lyft",
      providerColor: "#FFFFFF",
      vehicleType: "Lyft XL",
      vehicleCategory: "suv",
      fare: Math.round(130 + baseDistance * 17),
      eta: 7 + (seed % 9),
      surgeMultiplier: 1.5,
      originalFare: Math.round(100 + baseDistance * 14),
      rating: 4.7,
      deepLink: "https://www.lyft.com",
    },
    {
      id: "lyft-lux",
      provider: "Lyft",
      providerColor: "#FFFFFF",
      vehicleType: "Lyft Lux",
      vehicleCategory: "premium",
      fare: Math.round(200 + baseDistance * 25),
      eta: 12 + (seed % 10),
      rating: 4.9,
      deepLink: "https://www.lyft.com",
    },
    // Ola options
    {
      id: "ola-auto",
      provider: "Ola",
      providerColor: "#FFFFFF",
      vehicleType: "Ola Auto",
      vehicleCategory: "auto",
      fare: Math.round(30 + baseDistance * 7),
      eta: 2 + (seed % 4),
      rating: 4.4,
      deepLink: "https://www.olacabs.com",
    },
    {
      id: "ola-bike",
      provider: "Ola",
      providerColor: "#FFFFFF",
      vehicleType: "Ola Bike",
      vehicleCategory: "bike",
      fare: Math.round(18 + baseDistance * 4),
      eta: 2 + (seed % 3),
      rating: 4.3,
      deepLink: "https://www.olacabs.com",
    },
    {
      id: "ola-mini",
      provider: "Ola",
      providerColor: "#FFFFFF",
      vehicleType: "Ola Mini",
      vehicleCategory: "mini",
      fare: Math.round(55 + baseDistance * 10),
      eta: 3 + (seed % 5),
      rating: 4.5,
      deepLink: "https://www.olacabs.com",
    },
    {
      id: "ola-sedan",
      provider: "Ola",
      providerColor: "#FFFFFF",
      vehicleType: "Ola Prime Sedan",
      vehicleCategory: "sedan",
      fare: Math.round(85 + baseDistance * 14),
      eta: 5 + (seed % 7),
      rating: 4.7,
      deepLink: "https://www.olacabs.com",
    },
    {
      id: "ola-suv",
      provider: "Ola",
      providerColor: "#FFFFFF",
      vehicleType: "Ola Prime SUV",
      vehicleCategory: "suv",
      fare: Math.round(125 + baseDistance * 16),
      eta: 8 + (seed % 10),
      rating: 4.7,
      deepLink: "https://www.olacabs.com",
    },
    // Rapido options
    {
      id: "rapido-bike",
      provider: "Rapido",
      providerColor: "#FFD500",
      vehicleType: "Rapido Bike",
      vehicleCategory: "bike",
      fare: Math.round(15 + baseDistance * 3),
      eta: 2 + (seed % 2),
      rating: 4.2,
      deepLink: "https://www.rapido.bike",
    },
    {
      id: "rapido-auto",
      provider: "Rapido",
      providerColor: "#FFD500",
      vehicleType: "Rapido Auto",
      vehicleCategory: "auto",
      fare: Math.round(28 + baseDistance * 6),
      eta: 3 + (seed % 4),
      rating: 4.3,
      deepLink: "https://www.rapido.bike",
    },
  ];

  return results;
}

export const popularLocations = [
  "Connaught Place, New Delhi",
  "Bandra West, Mumbai",
  "Koramangala, Bangalore",
  "Salt Lake, Kolkata",
  "Jubilee Hills, Hyderabad",
  "T. Nagar, Chennai",
  "Aundh, Pune",
  "Vastrapur, Ahmedabad",
];
