import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import {
  MapPin,
  ArrowRight,
  SlidersHorizontal,
  ArrowUpDown,
  LayoutGrid,
  Zap,
  Bike,
  Car,
  CarFront,
  Truck,
  Crown,
  ChevronLeft,
  RotateCw,
  Filter,
  TrendingUp,
  Award,
  Sparkles,
  Clock,
  DollarSign,
  Navigation,
  Star,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { FareCard } from "./FareCard";
import { Slider } from "./ui/slider";
import { generateMockResults, vehicleCategories, providers } from "../data/mockData";
import type { RideOption } from "../data/mockData";
import { getCurrentLocation, formatCoordinates } from "../utils/geolocation";

type SortOption = "price-asc" | "price-desc" | "eta-asc" | "rating-desc";

const categoryIcons: Record<string, React.ReactNode> = {
  all: <LayoutGrid className="w-5 h-5" />,
  auto: <Zap className="w-5 h-5" />,
  bike: <Bike className="w-5 h-5" />,
  mini: <Car className="w-5 h-5" />,
  sedan: <CarFront className="w-5 h-5" />,
  suv: <Truck className="w-5 h-5" />,
  premium: <Crown className="w-5 h-5" />,
};

export function ResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pickup = searchParams.get("pickup") || "";
  const drop = searchParams.get("drop") || "";

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [showSurgeOnly, setShowSurgeOnly] = useState(false);
  const [maxETA, setMaxETA] = useState<number>(60);

  // UI States
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [locationDetecting, setLocationDetecting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pickup, drop]);

  const allResults = useMemo(() => {
    if (!pickup || !drop) return [];
    return generateMockResults(pickup, drop);
  }, [pickup, drop]);

  // Auto-set price range based on available results
  useEffect(() => {
    if (allResults.length > 0) {
      const fares = allResults.map((r) => r.fare);
      const minFare = Math.floor(Math.min(...fares) - 50);
      const maxFare = Math.ceil(Math.max(...fares) + 50);
      setPriceRange([Math.max(0, minFare), maxFare]);
    }
  }, [allResults]);

  const filteredResults = useMemo(() => {
    let results = [...allResults];

    // Vehicle category filter
    if (selectedCategory !== "all") {
      results = results.filter((r) => r.vehicleCategory === selectedCategory);
    }

    // Provider filter
    if (selectedProviders.length > 0) {
      results = results.filter((r) => selectedProviders.includes(r.provider));
    }

    // Price range filter
    results = results.filter((r) => r.fare >= priceRange[0] && r.fare <= priceRange[1]);

    // Rating filter
    results = results.filter((r) => r.rating >= minRating);

    // ETA filter
    results = results.filter((r) => r.eta <= maxETA);

    // Surge filter
    if (showSurgeOnly) {
      results = results.filter((r) => r.surgeMultiplier && r.surgeMultiplier > 1);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        results.sort((a, b) => a.fare - b.fare);
        break;
      case "price-desc":
        results.sort((a, b) => b.fare - a.fare);
        break;
      case "eta-asc":
        results.sort((a, b) => a.eta - b.eta);
        break;
      case "rating-desc":
        results.sort((a, b) => b.rating - a.rating);
        break;
    }

    return results;
  }, [allResults, selectedCategory, selectedProviders, priceRange, minRating, maxETA, showSurgeOnly, sortBy]);

  const cheapestId = useMemo(() => {
    if (filteredResults.length === 0) return null;
    return filteredResults.reduce((min, r) => (r.fare < min.fare ? r : min), filteredResults[0]).id;
  }, [filteredResults]);

  const fastestId = useMemo(() => {
    if (filteredResults.length === 0) return null;
    return filteredResults.reduce((min, r) => (r.eta < min.eta ? r : min), filteredResults[0]).id;
  }, [filteredResults]);

  const toggleProvider = (name: string) => {
    setSelectedProviders((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const handleDetectLocation = async () => {
    setLocationDetecting(true);
    try {
      const location = await getCurrentLocation();
      const coords = formatCoordinates(location.coords);
      // In production, use reverse geocoding
      console.log("Detected location:", coords);
      alert(`Location detected: ${coords}\nIn production, this will auto-fill the pickup field.`);
    } catch (error: any) {
      alert(error.error || "Unable to detect location");
    } finally {
      setLocationDetecting(false);
    }
  };

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSelectedProviders([]);
    const fares = allResults.map((r) => r.fare);
    setPriceRange([Math.floor(Math.min(...fares) - 50), Math.ceil(Math.max(...fares) + 50)]);
    setMinRating(0);
    setMaxETA(60);
    setShowSurgeOnly(false);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (selectedProviders.length > 0) count++;
    if (minRating > 0) count++;
    if (showSurgeOnly) count++;
    if (maxETA < 60) count++;
    return count;
  }, [selectedCategory, selectedProviders, minRating, showSurgeOnly, maxETA]);

  const surgeCount = filteredResults.filter((r) => r.surgeMultiplier && r.surgeMultiplier > 1).length;

  if (!pickup || !drop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
        <div className="max-w-xl text-center">
          <div className="w-20 h-20 rounded-2xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-foreground mb-4" style={{ fontSize: "1.75rem", fontWeight: 800 }}>No Route Specified</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed" style={{ fontSize: "1.05rem" }}>
            Please enter your pickup and destination to discover premium mobility options.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:shadow-xl transition-all no-underline border-2 border-accent/30"
            style={{ fontWeight: 700 }}
          >
            <ChevronLeft className="w-5 h-5" />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 animated-scrollbar">
      {/* Premium Header */}
      <div className="bg-gradient-to-br from-primary via-[#2a2321] to-primary border-b-4 border-accent/30 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
              style={{ fontSize: "0.95rem", fontWeight: 600 }}
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              New Search
            </button>

            <button
              onClick={handleDetectLocation}
              disabled={locationDetecting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 border border-accent/30 text-primary-foreground hover:bg-primary-foreground/20 transition-all disabled:opacity-50"
              style={{ fontSize: "0.85rem", fontWeight: 700 }}
            >
              <Navigation className={`w-4 h-4 ${locationDetecting ? 'animate-spin' : ''}`} />
              {locationDetecting ? 'Detecting...' : 'Use My Location'}
            </button>
          </div>

          <div className="flex items-center gap-4 flex-wrap mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-accent/20 rounded-xl blur-md" />
              <div className="relative flex items-center gap-3 px-5 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl border-2 border-accent/40">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <MapPin className="w-5 h-5 text-accent" />
                <span style={{ fontSize: "1rem", fontWeight: 700 }} className="text-primary-foreground max-w-[200px] truncate">{pickup}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-12 h-px bg-gradient-to-r from-accent/60 to-transparent" />
              <ArrowRight className="w-6 h-6 text-accent flex-shrink-0" />
              <div className="w-12 h-px bg-gradient-to-l from-accent/60 to-transparent" />
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-destructive/20 rounded-xl blur-md" />
              <div className="relative flex items-center gap-3 px-5 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl border-2 border-destructive/40">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />
                <MapPin className="w-5 h-5 text-destructive" />
                <span style={{ fontSize: "1rem", fontWeight: 700 }} className="text-primary-foreground max-w-[200px] truncate">{drop}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 border border-accent/30 backdrop-blur-sm">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-primary-foreground" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                {filteredResults.length} Premium Options
              </span>
            </div>
            {surgeCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/20 border border-destructive/40 backdrop-blur-sm">
                <TrendingUp className="w-4 h-4 text-destructive" />
                <span className="text-destructive uppercase tracking-wider" style={{ fontSize: "0.8rem", fontWeight: 800 }}>
                  {surgeCount} Surge Active
                </span>
              </div>
            )}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 border border-accent/40 backdrop-blur-sm">
                <Filter className="w-4 h-4 text-accent" />
                <span className="text-accent uppercase tracking-wider" style={{ fontSize: "0.8rem", fontWeight: 800 }}>
                  {activeFiltersCount} Active Filters
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[360px_1fr] gap-8">
          {/* Enhanced Sidebar Filters */}
          <div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-between px-6 py-4 bg-card border-2 border-border/50 rounded-xl mb-6 hover:border-accent/50 transition-all shadow-lg"
              style={{ fontWeight: 700 }}
            >
              <span className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters & Sorting {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            <div className={`${showFilters ? "block" : "hidden"} lg:block space-y-6`}>
              {/* FILTER ROW 1: Vehicle Type & Providers */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-card rounded-2xl border-2 border-border/50 group-hover:border-accent/50 p-6 transition-all shadow-lg">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-foreground flex items-center gap-2" style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                      <LayoutGrid className="w-5 h-5 text-accent" />
                      Vehicle Type
                    </h4>
                    {selectedCategory !== "all" && (
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="text-accent hover:text-accent/80"
                        style={{ fontSize: "0.75rem", fontWeight: 700 }}
                      >
                        CLEAR
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {vehicleCategories.map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all ${selectedCategory === cat.key
                            ? "bg-gradient-to-r from-accent to-[#c1a028] text-accent-foreground border-accent shadow-lg scale-105"
                            : "bg-card text-muted-foreground border-border/50 hover:border-accent/50"
                          }`}
                        style={{ fontSize: "0.85rem", fontWeight: 700 }}
                      >
                        {categoryIcons[cat.key]}
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-6" />

                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-foreground" style={{ fontSize: "1rem", fontWeight: 800 }}>
                      Service Providers
                    </h4>
                    {selectedProviders.length > 0 && (
                      <button
                        onClick={() => setSelectedProviders([])}
                        className="text-accent hover:text-accent/80"
                        style={{ fontSize: "0.75rem", fontWeight: 700 }}
                      >
                        CLEAR
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {providers.map((p) => (
                      <label
                        key={p.name}
                        className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-all border border-transparent hover:border-accent/30 group/provider"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedProviders.length === 0 || selectedProviders.includes(p.name)}
                            onChange={() => toggleProvider(p.name)}
                            className="w-5 h-5 rounded border-2 border-accent accent-accent cursor-pointer"
                          />
                          {(selectedProviders.length === 0 || selectedProviders.includes(p.name)) && (
                            <CheckCircle2 className="w-5 h-5 text-accent absolute inset-0 pointer-events-none" />
                          )}
                        </div>
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 rounded-lg blur-sm opacity-0 group-hover/provider:opacity-50 transition-opacity" style={{ backgroundColor: p.color }} />
                          <div
                            className="relative w-10 h-10 rounded-lg flex items-center justify-center shadow-md group-hover/provider:scale-110 transition-transform overflow-hidden"
                            style={{ backgroundColor: p.color }}
                          >
                            <img
                              src={p.logo}
                              alt={`${p.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <span className="flex-1" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{p.name}</span>
                        <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                          {allResults.filter(r => r.provider === p.name).length} rides
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* FILTER ROW 2: Price Range & Rating */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-card rounded-2xl border-2 border-border/50 group-hover:border-accent/50 p-6 transition-all shadow-lg">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-foreground flex items-center gap-2" style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                      <DollarSign className="w-5 h-5 text-accent" />
                      Price Range
                    </h4>
                    <span className="text-accent" style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={Math.max(...allResults.map(r => r.fare)) + 100}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                    <span>₹0</span>
                    <span>₹{Math.max(...allResults.map(r => r.fare)) + 100}</span>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-6" />

                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-foreground flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 800 }}>
                      <Star className="w-5 h-5 text-accent fill-accent" />
                      Minimum Rating
                    </h4>
                    <span className="text-accent" style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                      {minRating.toFixed(1)}+
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={5}
                    step={0.5}
                    value={[minRating]}
                    onValueChange={(val) => setMinRating(val[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                    <span>0.0</span>
                    <span>5.0</span>
                  </div>
                </div>
              </div>

              {/* FILTER ROW 3: ETA, Surge & Sort */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-card rounded-2xl border-2 border-border/50 group-hover:border-accent/50 p-6 transition-all shadow-lg">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-foreground flex items-center gap-2" style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                      <Clock className="w-5 h-5 text-accent" />
                      Maximum ETA
                    </h4>
                    <span className="text-accent" style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                      {maxETA} min
                    </span>
                  </div>
                  <Slider
                    min={5}
                    max={60}
                    step={5}
                    value={[maxETA]}
                    onValueChange={(val) => setMaxETA(val[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                    <span>5 min</span>
                    <span>60 min</span>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-6" />

                  <label className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-all border border-transparent hover:border-accent/30">
                    <div className="flex items-center gap-3">
                      <Flame className="w-5 h-5 text-destructive" />
                      <span style={{ fontSize: "0.95rem", fontWeight: 700 }}>Show Surge Only</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={showSurgeOnly}
                      onChange={(e) => setShowSurgeOnly(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-accent accent-accent cursor-pointer"
                    />
                  </label>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-6" />

                  <h4 className="text-foreground mb-4 flex items-center gap-2" style={{ fontSize: "1rem", fontWeight: 800 }}>
                    <ArrowUpDown className="w-5 h-5 text-accent" />
                    Sort Results
                  </h4>
                  <div className="space-y-2">
                    {[
                      { value: "price-asc" as SortOption, label: "Price: Low to High", icon: <DollarSign className="w-4 h-4" /> },
                      { value: "price-desc" as SortOption, label: "Price: High to Low", icon: <DollarSign className="w-4 h-4" /> },
                      { value: "eta-asc" as SortOption, label: "Fastest ETA", icon: <Clock className="w-4 h-4" /> },
                      { value: "rating-desc" as SortOption, label: "Highest Rating", icon: <Star className="w-4 h-4" /> },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all border-2 ${sortBy === opt.value
                            ? "bg-gradient-to-r from-accent/20 to-accent/10 text-foreground border-accent shadow-md"
                            : "text-muted-foreground border-transparent hover:bg-muted/50 hover:border-border/50"
                          }`}
                        style={{ fontSize: "0.95rem", fontWeight: 700 }}
                      >
                        {opt.icon}
                        {opt.label}
                        {sortBy === opt.value && <Sparkles className="w-4 h-4 ml-auto text-accent" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-destructive/20 to-destructive/10 text-destructive rounded-xl border-2 border-destructive/40 hover:border-destructive/60 transition-all shadow-lg hover:shadow-xl"
                  style={{ fontSize: "1rem", fontWeight: 800 }}
                >
                  <RotateCw className="w-5 h-5" />
                  Reset All Filters
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div>
            {isLoading ? (
              <div className="space-y-5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-card rounded-2xl border-2 border-border/50 p-8 animate-pulse shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-muted to-muted/50" />
                        <div>
                          <div className="w-40 h-6 bg-gradient-to-r from-muted to-muted/50 rounded mb-3" />
                          <div className="w-32 h-5 bg-gradient-to-r from-muted to-muted/50 rounded" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-24 h-8 bg-gradient-to-r from-muted to-muted/50 rounded mb-3" />
                        <div className="w-32 h-12 bg-gradient-to-r from-muted to-muted/50 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="text-center py-24 bg-card rounded-2xl border-2 border-border/50 shadow-lg">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-foreground mb-2" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                  No Rides Match Your Criteria
                </h3>
                <p className="text-muted-foreground mb-6" style={{ fontSize: "1rem" }}>
                  Try adjusting your filters to see more options
                </p>
                <button
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl hover:shadow-xl transition-all"
                  style={{ fontSize: "1rem", fontWeight: 700 }}
                >
                  <RotateCw className="w-5 h-5" />
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Premium Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[
                    {
                      icon: <DollarSign className="w-5 h-5" />,
                      label: "CHEAPEST",
                      value: `₹${Math.min(...filteredResults.map((r) => r.fare))}`,
                      gradient: "from-[#d4af37] to-[#c1a028]",
                    },
                    {
                      icon: <Clock className="w-5 h-5" />,
                      label: "FASTEST",
                      value: `${Math.min(...filteredResults.map((r) => r.eta))} min`,
                      gradient: "from-[#1a1311] to-[#0d0b0a]",
                    },
                    {
                      icon: <TrendingUp className="w-5 h-5" />,
                      label: "AVG FARE",
                      value: `₹${Math.round(filteredResults.reduce((s, r) => s + r.fare, 0) / filteredResults.length)}`,
                      gradient: "from-[#c1440e] to-[#a03a0c]",
                    },
                    {
                      icon: <Award className="w-5 h-5" />,
                      label: "OPTIONS",
                      value: `${filteredResults.length}`,
                      gradient: "from-[#5a524d] to-[#3a342f]",
                    },
                  ].map((stat, i) => (
                    <div key={i} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity`} />
                      <div className={`relative px-5 py-5 rounded-xl border-2 border-accent/30 bg-gradient-to-br ${stat.gradient} text-white shadow-xl group-hover:scale-105 transition-transform`}>
                        <div className="flex items-center gap-2 mb-2">
                          {stat.icon}
                          <p style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em" }} className="opacity-90">
                            {stat.label}
                          </p>
                        </div>
                        <p style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-0.02em" }}>{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fare Cards */}
                {filteredResults.map((ride) => (
                  <FareCard
                    key={ride.id}
                    ride={ride}
                    isCheapest={ride.id === cheapestId}
                    isFastest={ride.id === fastestId && ride.id !== cheapestId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
