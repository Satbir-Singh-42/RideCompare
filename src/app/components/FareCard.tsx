import {
  Clock,
  Star,
  ExternalLink,
  TrendingUp,
  Zap,
  Car,
  CarFront,
  Truck,
  Bike,
  Crown,
  Sparkles,
} from "lucide-react";
import type { RideOption } from "../data/mockData";
import { providerLogoMap } from "../data/mockData";

const vehicleIcons: Record<string, React.ReactNode> = {
  auto: <Zap className="w-4 h-4" />,
  bike: <Bike className="w-4 h-4" />,
  mini: <Car className="w-4 h-4" />,
  sedan: <CarFront className="w-4 h-4" />,
  suv: <Truck className="w-4 h-4" />,
  premium: <Crown className="w-4 h-4" />,
};

interface FareCardProps {
  ride: RideOption;
  isCheapest?: boolean;
  isFastest?: boolean;
}

export function FareCard({ ride, isCheapest, isFastest }: FareCardProps) {
  return (
    <div
      className={`group relative transition-all duration-300 ${isCheapest || isFastest ? "scale-[1.02]" : ""
        }`}
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isCheapest
          ? "bg-accent/30"
          : isFastest
            ? "bg-primary/30"
            : "bg-accent/20"
        }`} />

      {/* Main Card */}
      <div
        className={`relative bg-card rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${isCheapest
            ? "border-accent/60 ring-2 ring-accent/20 shadow-accent/10"
            : isFastest
              ? "border-primary/60 ring-2 ring-primary/20 shadow-primary/10"
              : "border-border/50 hover:border-accent/50"
          } shadow-lg group-hover:-translate-y-0.5`}
      >
        {/* Premium Badges */}
        {(isCheapest || isFastest) && (
          <div className="absolute -top-3.5 left-6 flex gap-2 z-10">
            {isCheapest && (
              <div className="relative">
                <div className="absolute inset-0 bg-accent rounded-full blur-md opacity-50" />
                <div className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent to-[#c1a028] text-accent-foreground shadow-xl border-2 border-accent/30">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.05em" }}>
                    BEST VALUE
                  </span>
                </div>
              </div>
            )}
            {isFastest && (
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-50" />
                <div className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-[#0d0b0a] text-primary-foreground shadow-xl border-2 border-primary/30">
                  <Zap className="w-3.5 h-3.5" />
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.05em" }}>
                    FASTEST
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-6">
            {/* Left: Provider + Vehicle info */}
            <div className="flex items-start gap-5 flex-1 min-w-0">
              {/* Provider Logo */}
              <div className="relative flex-shrink-0 group/logo">
                <div className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover/logo:opacity-75 transition-opacity" style={{ backgroundColor: ride.providerColor }} />
                <div
                  className="relative w-14 h-14 rounded-xl flex items-center justify-center shadow-xl group-hover/logo:shadow-2xl group-hover/logo:scale-110 transition-all duration-300 overflow-hidden"
                  style={{ backgroundColor: ride.providerColor }}
                >
                  <img
                    src={providerLogoMap[ride.provider] || ""}
                    alt={`${ride.provider} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                {/* Vehicle Title & Category */}
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <h4 className="text-foreground truncate" style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                    {ride.vehicleType}
                  </h4>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-muted/80 to-muted/40 text-foreground border-2 border-border/30">
                    {vehicleIcons[ride.vehicleCategory]}
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                      {ride.vehicleCategory.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-5 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-muted-foreground uppercase tracking-wider" style={{ fontSize: "0.65rem", fontWeight: 600, lineHeight: 1 }}>
                        ETA
                      </p>
                      <p className="text-foreground" style={{ fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.3 }}>
                        {ride.eta} min
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                    </div>
                    <div>
                      <p className="text-muted-foreground uppercase tracking-wider" style={{ fontSize: "0.65rem", fontWeight: 600, lineHeight: 1 }}>
                        Rating
                      </p>
                      <p className="text-foreground" style={{ fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.3 }}>
                        {ride.rating}
                      </p>
                    </div>
                  </div>

                  {ride.surgeMultiplier && ride.surgeMultiplier > 1 && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-destructive/20 rounded-lg blur-sm" />
                      <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-destructive/20 to-destructive/10 border-2 border-destructive/40">
                        <TrendingUp className="w-4 h-4 text-destructive" />
                        <span className="text-destructive" style={{ fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.03em" }}>
                          {ride.surgeMultiplier}x SURGE
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Price + Book */}
            <div className="flex flex-col items-end gap-4 flex-shrink-0">
              {/* Price */}
              <div className="text-right">
                {ride.originalFare && (
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <span className="text-muted-foreground line-through" style={{ fontSize: "0.85rem" }}>
                      ₹{ride.originalFare}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/30" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                      SAVE
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-muted-foreground" style={{ fontSize: "1rem", fontWeight: 600 }}>₹</span>
                  <span className="text-foreground" style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
                    {ride.fare}
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <a
                href={ride.deepLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary via-[#2a2321] to-primary text-primary-foreground hover:shadow-2xl hover:shadow-accent/20 transition-all no-underline border-2 border-accent/40 hover:border-accent/60 overflow-hidden"
                style={{ fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.05em" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative">BOOK NOW</span>
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform relative" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent group-hover:via-accent/60 transition-all duration-500 rounded-b-2xl" />
      </div>
    </div>
  );
}
