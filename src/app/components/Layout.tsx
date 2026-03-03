import { Outlet, Link, useLocation } from "react-router";
import { Navigation, Menu, X } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary border-b-2 border-accent/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shadow-lg">
                <Navigation className="w-6 h-6 text-accent-foreground" />
              </div>
              <span
                className="text-primary-foreground tracking-tight"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                }}>
                Ride<span className="text-accent">Compare</span>
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-2">
              <Link
                to="/"
                className={`px-5 py-2.5 rounded-lg transition-all no-underline ${
                  location.pathname === "/"
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
                style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                Home
              </Link>
              <Link
                to="/how-it-works"
                className={`px-5 py-2.5 rounded-lg transition-all no-underline ${
                  location.pathname === "/how-it-works"
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
                style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                How It Works
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors">
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden pb-4 border-t border-accent/20 mt-2 pt-4">
              <nav className="flex flex-col gap-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all no-underline ${
                    location.pathname === "/"
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                  style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  Home
                </Link>
                <Link
                  to="/how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all no-underline ${
                    location.pathname === "/how-it-works"
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                  style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  How It Works
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground border-t-4 border-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shadow-lg">
                  <Navigation className="w-6 h-6 text-accent-foreground" />
                </div>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                  }}>
                  Ride<span className="text-accent">Compare</span>
                </span>
              </div>
              <p
                className="text-primary-foreground/70 max-w-md mb-5"
                style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                Compare ride fares across multiple providers in one place. We
                aggregate real-time data from official APIs to help you find the
                best option.
              </p>
            </div>
            <div>
              <h4
                className="text-accent mb-4"
                style={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                }}>
                PLATFORM
              </h4>
              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="text-primary-foreground/70 hover:text-accent transition-colors no-underline"
                  style={{ fontSize: "0.9rem" }}>
                  Home
                </Link>
                <Link
                  to="/how-it-works"
                  className="text-primary-foreground/70 hover:text-accent transition-colors no-underline"
                  style={{ fontSize: "0.9rem" }}>
                  How It Works
                </Link>
              </div>
            </div>
            <div>
              <h4
                className="text-accent mb-4"
                style={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                }}>
                LEGAL
              </h4>
              <div className="flex flex-col gap-3">
                <span
                  className="text-primary-foreground/50"
                  style={{ fontSize: "0.9rem" }}>
                  Privacy Policy
                </span>
                <span
                  className="text-primary-foreground/50"
                  style={{ fontSize: "0.9rem" }}>
                  Terms of Service
                </span>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-accent/20 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-primary-foreground/60"
              style={{ fontSize: "0.85rem" }}>
              © 2026 RideCompare. All rights reserved.
            </p>
            <p
              className="text-primary-foreground/60"
              style={{ fontSize: "0.85rem" }}>
              Prepared by:{" "}
              <span className="text-accent font-semibold">Satbir Singh</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
