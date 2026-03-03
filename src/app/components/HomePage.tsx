import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  MapPin,
  ArrowRight,
  Clock,
  TrendingDown,
  Smartphone,
  Shield,
  ChevronRight,
  Sparkles,
  Award,
  Zap,
  Star,
  Navigation,
} from "lucide-react";
import { popularLocations, providerLogoMap } from "../data/mockData";
import { getCurrentLocation, reverseGeocode } from "../utils/geolocation";

export function HomePage() {
  useEffect(() => {
    document.title =
      "RideCompare – Compare Uber, Lyft, Ola & Rapido Fares Instantly";
  }, []);
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  const handleCompare = () => {
    if (pickup.trim() && drop.trim()) {
      navigate(
        `/results?pickup=${encodeURIComponent(pickup)}&drop=${encodeURIComponent(drop)}`,
      );
    }
  };

  const filteredLocations = (query: string) =>
    popularLocations.filter((loc) =>
      loc.toLowerCase().includes(query.toLowerCase()),
    );

  const handleDetectLocation = async () => {
    setDetectingLocation(true);
    try {
      const location = await getCurrentLocation();
      const address = await reverseGeocode(location.coords);
      setPickup(address);
    } catch (error) {
      console.error("Error detecting location:", error);
    } finally {
      setDetectingLocation(false);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section with Parallax Background */}
      <section className="relative overflow-hidden bg-primary min-h-[85vh] flex items-center">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#2a2321] to-[#0d0b0a]" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 border-accent/40 bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm mb-8 shadow-lg">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span
                  className="text-accent uppercase tracking-[0.15em]"
                  style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                  Smart Ride Comparison
                </span>
                <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              </div>

              <h1
                className="text-primary-foreground mb-6 leading-[1.05]"
                style={{
                  fontSize: "clamp(2.75rem, 6vw, 5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                }}>
                The Definitive{" "}
                <span className="relative inline-block">
                  <span className="text-accent">Standard</span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/80 to-transparent rounded-full" />
                </span>{" "}
                in Ride Comparison
              </h1>

              <p
                className="text-primary-foreground/70 mb-10 max-w-xl leading-relaxed"
                style={{ fontSize: "1.15rem", lineHeight: 1.8 }}>
                Compare rides from Uber, Lyft, Ola, and Rapido side by side. Get
                real-time fares, ETAs, and availability — all in one place.
              </p>




              {/* Search Form */}
              <div className="relative">
                <div className="absolute inset-0 bg-accent/10 rounded-xl blur-lg" />
                <div className="relative bg-[#1a1311]/90 backdrop-blur-xl rounded-xl border border-accent/20 p-3 sm:p-5 shadow-xl">
                  <div className="flex flex-col gap-2 sm:gap-3">
                    {/* Pickup */}
                    <div className="relative group">
                      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10">
                        <div className="w-2.5 h-2.5 rounded-full bg-accent ring-2 ring-accent/20 group-focus-within:ring-4 transition-all" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter pickup location"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        onFocus={() => setShowPickupSuggestions(true)}
                        onBlur={() =>
                          setTimeout(() => setShowPickupSuggestions(false), 200)
                        }
                        className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-[#2a2321]/60 rounded-lg border border-accent/15 focus:border-accent/50 focus:bg-[#2a2321]/80 outline-none transition-all text-primary-foreground placeholder:text-primary-foreground/35"
                        style={{
                          fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
                          fontWeight: 500,
                        }}
                      />
                      {showPickupSuggestions && pickup.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#1a1311] rounded-lg border border-accent/20 shadow-xl z-20 max-h-56 overflow-y-auto backdrop-blur-xl">
                          {filteredLocations(pickup).map((loc) => (
                            <button
                              key={loc}
                              className="w-full text-left px-4 py-2.5 hover:bg-accent/10 transition-colors flex items-center gap-2.5 text-primary-foreground border-b border-accent/10 last:border-0"
                              onMouseDown={() => {
                                setPickup(loc);
                                setShowPickupSuggestions(false);
                              }}>
                              <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                                {loc}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Route Connector */}
                    <div className="flex items-center pl-4 sm:pl-5">
                      <div className="flex flex-col items-center gap-px">
                        <div className="w-px h-1.5 bg-accent/40" />
                        <div className="w-px h-1.5 bg-accent/25" />
                        <div className="w-px h-1.5 bg-destructive/25" />
                        <div className="w-px h-1.5 bg-destructive/40" />
                      </div>
                    </div>

                    {/* Drop */}
                    <div className="relative group">
                      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10">
                        <div className="w-2.5 h-2.5 rounded-full bg-destructive ring-2 ring-destructive/20 group-focus-within:ring-4 transition-all" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter destination"
                        value={drop}
                        onChange={(e) => setDrop(e.target.value)}
                        onFocus={() => setShowDropSuggestions(true)}
                        onBlur={() =>
                          setTimeout(() => setShowDropSuggestions(false), 200)
                        }
                        className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-[#2a2321]/60 rounded-lg border border-accent/15 focus:border-accent/50 focus:bg-[#2a2321]/80 outline-none transition-all text-primary-foreground placeholder:text-primary-foreground/35"
                        style={{
                          fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
                          fontWeight: 500,
                        }}
                      />
                      {showDropSuggestions && drop.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#1a1311] rounded-lg border border-accent/20 shadow-xl z-20 max-h-56 overflow-y-auto backdrop-blur-xl">
                          {filteredLocations(drop).map((loc) => (
                            <button
                              key={loc}
                              className="w-full text-left px-4 py-2.5 hover:bg-accent/10 transition-colors flex items-center gap-2.5 text-primary-foreground border-b border-accent/10 last:border-0"
                              onMouseDown={() => {
                                setDrop(loc);
                                setShowDropSuggestions(false);
                              }}>
                              <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                                {loc}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleCompare}
                      disabled={!pickup.trim() || !drop.trim()}
                      className="mt-1.5 w-full py-3 sm:py-3.5 bg-accent text-accent-foreground rounded-lg hover:shadow-lg hover:shadow-accent/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 group relative overflow-hidden"
                      style={{
                        fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                      }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative">COMPARE FARES</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Locations */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span
                  className="text-primary-foreground/50 uppercase tracking-wider"
                  style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                  Popular:
                </span>
                {["Connaught Place", "Bandra West", "Koramangala"].map(
                  (loc) => (
                    <button
                      key={loc}
                      onClick={() =>
                        setPickup(
                          popularLocations.find((l) => l.includes(loc)) || loc,
                        )
                      }
                      className="px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/80 hover:bg-accent hover:text-accent-foreground transition-all border border-primary-foreground/20 hover:border-accent"
                      style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {loc}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="hidden lg:block relative mt-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-3xl overflow-hidden border-4 border-accent/30 shadow-2xl group">
                  <img
                    src="/images/hero-luxury-car.png"
                    alt="Ride comparison hero"
                    className="w-full h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />

                  {/* Floating Stats Cards */}
                  <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
                    {[
                      {
                        icon: <Star className="w-4 h-4" />,
                        value: "4.8",
                        label: "Rating",
                      },
                      {
                        icon: <Zap className="w-4 h-4" />,
                        value: "2min",
                        label: "ETA",
                      },
                      {
                        icon: <Award className="w-4 h-4" />,
                        value: "₹89",
                        label: "Best",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-card/95 backdrop-blur-xl rounded-lg p-3 border border-accent/30 shadow-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-accent">{item.icon}</div>
                          <span
                            className="text-foreground"
                            style={{ fontSize: "1.1rem", fontWeight: 800 }}>
                            {item.value}
                          </span>
                        </div>
                        <p
                          className="text-muted-foreground uppercase tracking-wider"
                          style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-20 sm:h-28">
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%">
                <stop offset="0%" stopColor="#f4e8d9" stopOpacity="1" />
                <stop offset="50%" stopColor="#e8dcc8" stopOpacity="1" />
                <stop offset="100%" stopColor="#f4e8d9" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M0,40 C240,90 480,10 720,50 C960,90 1200,30 1440,60 L1440,120 L0,120 Z"
              fill="url(#waveGradient)"
            />
          </svg>
        </div>
      </section>

      {/* Premium Features Showcase */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231a1311' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
              <Award className="w-4 h-4 text-accent" />
              <span
                className="text-accent uppercase tracking-[0.15em]"
                style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                Why RideCompare
              </span>
            </div>
            <h2
              className="text-foreground mb-5"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}>
              Why People Choose Us
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full" />
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <TrendingDown className="w-8 h-8" />,
                title: "Best Price",
                desc: "Smart algorithms find the cheapest ride across all providers so you always get the best deal.",
                color: "from-[#d4af37] to-[#c1a028]",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Save Time",
                desc: "One search instead of switching between four apps. See all your options instantly.",
                color: "from-[#1a1311] to-[#0d0b0a]",
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Seamless Integration",
                desc: "Direct deep-linking to official provider applications ensures secure, verified bookings.",
                color: "from-[#c1440e] to-[#a03a0c]",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Trusted Data",
                desc: "Official API partnerships with every provider ensure accurate, real-time data.",
                color: "from-[#5a524d] to-[#3a342f]",
              },
            ].map((feature, i) => (
              <div key={i} className="group relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card */}
                <div className="relative h-full bg-card rounded-2xl border-2 border-border/50 group-hover:border-accent/60 p-8 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      {feature.icon}
                    </div>
                    <div
                      className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} blur-md opacity-50 group-hover:opacity-70 transition-opacity`}
                    />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-foreground mb-3"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                    }}>
                    {feature.title}
                  </h3>
                  <p
                    className="text-muted-foreground leading-relaxed"
                    style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                    {feature.desc}
                  </p>

                  {/* Decorative Line */}
                  <div className="mt-6 w-12 h-0.5 bg-gradient-to-r from-accent to-transparent rounded-full group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border-4 border-accent/30 shadow-2xl">
                <img
                  src="/images/premium-business-travel.png"
                  alt="Business travel"
                  className="w-full h-[350px] sm:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm mb-3">
                    <Star className="w-3.5 h-3.5 text-accent-foreground" />
                    <span
                      className="text-accent-foreground uppercase tracking-wider"
                      style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                      All Vehicle Types
                    </span>
                  </div>
                  <h3
                    className="text-primary-foreground mb-2"
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      letterSpacing: "-0.01em",
                    }}>
                    Every Ride Option
                  </h3>
                  <p
                    className="text-primary-foreground/80"
                    style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                    Compare autos, bikes, minis, sedans, SUVs, and more across
                    all providers with transparent pricing
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border-4 border-accent/30 shadow-2xl">
                <img
                  src="/images/city-skyline-night.png"
                  alt="City mobility"
                  className="w-full h-[350px] sm:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm mb-3">
                    <Zap className="w-3.5 h-3.5 text-accent-foreground" />
                    <span
                      className="text-accent-foreground uppercase tracking-wider"
                      style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                      Real-Time Intelligence
                    </span>
                  </div>
                  <h3
                    className="text-primary-foreground mb-2"
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      letterSpacing: "-0.01em",
                    }}>
                    Instant Comparison
                  </h3>
                  <p
                    className="text-primary-foreground/80"
                    style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                    Live fare aggregation from multiple platforms in under 2
                    seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-card relative overflow-hidden border-y-4 border-accent/20">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-foreground mb-5"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}>
              Our Partners
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full mb-6" />
            <p
              className="text-muted-foreground max-w-2xl mx-auto"
              style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
              Official API integrations with the world's leading mobility
              providers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { name: "Uber", color: "#000000", tagline: "Global Leader" },
              { name: "Lyft", color: "#FFFFFF", tagline: "US Premier" },
              { name: "Ola", color: "#FFFFFF", tagline: "India's Choice" },
              { name: "Rapido", color: "#FFD500", tagline: "Quick Transit" },
            ].map((p, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex flex-col items-start sm:items-center p-5 sm:p-8 bg-gradient-to-b from-background/50 to-background rounded-2xl border-2 border-border/50 group-hover:border-accent/60 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-5 overflow-hidden"
                    style={{ backgroundColor: p.color }}>
                    <img
                      src={providerLogoMap[p.name]}
                      alt={`${p.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4
                    className="text-foreground mb-1 sm:mb-2"
                    style={{
                      fontSize: "clamp(1rem, 3vw, 1.3rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                    }}>
                    {p.name}
                  </h4>
                  <p
                    className="text-muted-foreground uppercase tracking-wider text-left sm:text-center"
                    style={{
                      fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                      fontWeight: 600,
                    }}>
                    {p.tagline}
                  </p>
                  <div className="mt-3 sm:mt-4 w-12 h-0.5 bg-gradient-to-r from-accent to-transparent rounded-full group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#2a2321] to-primary">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 border-2 border-accent/40 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span
              className="text-accent uppercase tracking-[0.15em]"
              style={{ fontSize: "0.75rem", fontWeight: 700 }}>
              Begin Your Journey
            </span>
          </div>

          <h2
            className="text-primary-foreground mb-6 leading-tight"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}>
            Experience Mobility <span className="text-accent">Simplified</span>
          </h2>

          <p
            className="text-primary-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
            Discover the easiest way to compare and book rides. Enter your
            locations above to find the best option for you.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-4 px-12 py-6 bg-accent text-accent-foreground rounded-xl hover:shadow-2xl hover:shadow-accent/30 transition-all shadow-xl border-2 border-accent/30 relative overflow-hidden"
            style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative">COMPARE NOW</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative" />
          </button>
        </div>
      </section>
    </div>
  );
}
