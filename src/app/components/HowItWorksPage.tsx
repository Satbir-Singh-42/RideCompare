import {
  MapPin,
  Search,
  BarChart3,
  ExternalLink,
  Shield,
  Database,
  Building2,
  Globe,
  DollarSign,
  TrendingUp,
  Award,
  Bell,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useEffect } from "react";

export function HowItWorksPage() {
  useEffect(() => {
    document.title =
      "How It Works – RideCompare | Official API Fare Comparison";
  }, []);
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-28 md:py-36 overflow-hidden bg-gradient-to-br from-primary via-[#2a2321] to-primary">
        {/* Animated Background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative Glows */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 border-accent/40 bg-accent/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span
              className="text-accent uppercase tracking-[0.15em]"
              style={{ fontSize: "0.75rem", fontWeight: 700 }}>
              The Process
            </span>
          </div>

          <h1
            className="text-primary-foreground mb-8 leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}>
            How RideCompare
            <br />
            <span className="text-accent">Works</span>
          </h1>

          <div className="w-40 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full mb-8" />

          <p
            className="text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontSize: "1.25rem", lineHeight: 1.8 }}>
            A ride comparison platform built on official API partnerships,
            designed to save you time and money.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231a1311' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {(
              [
                {
                  step: 1,
                  icon: <MapPin className="w-8 h-8" />,
                  title: "Define Your Journey",
                  desc: "Input your precise pickup and destination coordinates. Our intelligent autocomplete system leverages geolocation data to ensure pinpoint accuracy and efficiency.",
                  features: [
                    "Smart autocomplete",
                    "Geolocation precision",
                    "Popular destinations",
                  ],
                  gradient: "from-[#d4af37] to-[#c1a028]",
                },
                {
                  step: 2,
                  icon: <Search className="w-8 h-8" />,
                  title: "API Orchestration",
                  desc: "Our platform executes parallel queries across authenticated APIs from Uber, Lyft, Ola, and Rapido, retrieving comprehensive real-time fare estimates and vehicle availability.",
                  features: [
                    "Parallel processing",
                    "Official APIs",
                    "Real-time data",
                  ],
                  gradient: "from-[#1a1311] to-[#0d0b0a]",
                },
                {
                  step: 3,
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Intelligent Analysis",
                  desc: "View meticulously curated comparisons featuring fare structures, estimated time of arrival, vehicle classifications, surge pricing indicators, and comprehensive ratings.",
                  features: [
                    "Multi-factor analysis",
                    "Transparent pricing",
                    "Quality metrics",
                  ],
                  gradient: "from-[#c1440e] to-[#a03a0c]",
                },
                {
                  step: 4,
                  icon: <ExternalLink className="w-8 h-8" />,
                  title: "Verified Booking",
                  desc: "Execute your selection with confidence. Our deep-link integration redirects you seamlessly to the official provider application for secure, authenticated booking.",
                  features: [
                    "Direct deep-linking",
                    "Secure transfer",
                    "Official booking",
                  ],
                  gradient: "from-[#5a524d] to-[#3a342f]",
                },
              ] as const
            ).map((item, i, arr) => (
              <div key={item.step} className="flex gap-5 sm:gap-10 lg:gap-16">
                {/* Timeline - Desktop */}
                <div className="hidden sm:flex flex-col items-center">
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
                    />
                    <div
                      className={`relative w-20 h-20 rounded-2xl border-4 border-accent/40 flex items-center justify-center flex-shrink-0 shadow-2xl text-white bg-gradient-to-br ${item.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="relative w-1 flex-1 min-h-[80px] my-6">
                      <div className="absolute inset-0 bg-gradient-to-b from-accent/60 via-accent/30 to-accent/60 rounded-full" />
                      <div className="absolute inset-0 bg-gradient-to-b from-accent to-transparent rounded-full animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Timeline - Mobile */}
                <div className="flex sm:hidden flex-col items-center">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-xl blur-lg opacity-50`}
                    />
                    <div
                      className={`relative w-12 h-12 rounded-xl border-2 border-accent/40 flex items-center justify-center flex-shrink-0 shadow-lg text-white bg-gradient-to-br ${item.gradient}`}>
                      {item.icon}
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="relative w-0.5 flex-1 min-h-[40px] my-3">
                      <div className="absolute inset-0 bg-gradient-to-b from-accent/60 via-accent/30 to-accent/60 rounded-full" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-10 sm:pb-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border-2 border-accent/30">
                      <span
                        className="text-accent uppercase tracking-[0.15em]"
                        style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                        STEP {item.step}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
                  </div>

                  <h3
                    className="text-foreground mb-4"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.01em",
                    }}>
                    {item.title}
                  </h3>

                  <p
                    className="text-muted-foreground mb-6 max-w-2xl leading-relaxed"
                    style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {item.features.map((feature, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border-2 border-border/50 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span
                          className="text-foreground"
                          style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Compliance */}
      <section className="py-14 sm:py-20 lg:py-28 bg-card relative overflow-hidden border-y-4 border-accent/20">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
              <Shield className="w-4 h-4 text-accent" />
              <span
                className="text-accent uppercase tracking-[0.15em]"
                style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                Trust & Integrity
              </span>
            </div>
            <h2
              className="text-foreground mb-5"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}>
              Built on Absolute Compliance
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full mb-6" />
            <p
              className="text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              style={{ fontSize: "1.15rem", lineHeight: 1.8 }}>
              Every aspect of our platform is engineered with transparency,
              privacy protection, and official authorization at its core.
            </p>
          </div>

          {/* Partnership Image */}
          <div className="mb-16 relative group max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-accent/30 shadow-2xl">
              <img
                src="/images/business-partnership.png"
                alt="Professional partnerships and trust"
                className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-10 sm:left-10 sm:right-10 md:left-16 md:bottom-16 md:right-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/90 backdrop-blur-sm mb-4">
                  <Award className="w-4 h-4 text-accent-foreground" />
                  <span
                    className="text-accent-foreground uppercase tracking-wider"
                    style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                    Verified Partnerships
                  </span>
                </div>
                <h3
                  className="text-primary-foreground mb-3"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                  }}>
                  Official API Agreements
                </h3>
                <p
                  className="text-primary-foreground/80 max-w-2xl leading-relaxed"
                  style={{
                    fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                    lineHeight: 1.7,
                  }}>
                  Working exclusively with authenticated provider APIs to
                  guarantee authentic, real-time data and maintain the highest
                  standards of trust.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[
              {
                icon: <Shield className="w-7 h-7" />,
                title: "Official APIs Exclusively",
                desc: "Zero tolerance for unauthorized access. Every data point originates from authenticated, official provider partnerships.",
                gradient: "from-[#d4af37] to-[#c1a028]",
              },
              {
                icon: <Database className="w-7 h-7" />,
                title: "Privacy by Design",
                desc: "User location queries are never persisted. All processing occurs in real-time with immediate data purging.",
                gradient: "from-[#1a1311] to-[#0d0b0a]",
              },
              {
                icon: <Globe className="w-7 h-7" />,
                title: "Brand Adherence",
                desc: "All provider trademarks, logos, and brand assets are utilized in strict accordance with official guidelines and licensing agreements.",
                gradient: "from-[#c1440e] to-[#a03a0c]",
              },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-background rounded-2xl border-2 border-border/50 group-hover:border-accent/60 p-5 sm:p-8 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1">
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      {item.icon}
                    </div>
                    <div
                      className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} blur-md opacity-50 group-hover:opacity-70 transition-opacity`}
                    />
                  </div>
                  <h4
                    className="text-foreground mb-3"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                    }}>
                    {item.title}
                  </h4>
                  <p
                    className="text-muted-foreground leading-relaxed"
                    style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                  <div className="mt-6 w-12 h-0.5 bg-gradient-to-r from-accent to-transparent rounded-full group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Model */}
      <section className="py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-foreground mb-5"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}>
              Sustainable Monetization
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full mb-6" />
            <p
              className="text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              style={{ fontSize: "1.15rem", lineHeight: 1.8 }}>
              A carefully architected revenue model that preserves user
              experience while ensuring platform sustainability
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-8">
            {[
              {
                icon: <Award className="w-7 h-7" />,
                title: "Affiliate Commission Structure",
                desc: "Performance-based referral fees earned for verified bookings redirected through our platform to official provider applications.",
                metrics: "Commission-based",
              },
              {
                icon: <Bell className="w-7 h-7" />,
                title: "Fare Alert Services",
                desc: "Subscription tier providing real-time surge notifications, fare reduction alerts, and optimal booking window recommendations.",
                metrics: "Recurring SaaS",
              },
              {
                icon: <Building2 className="w-7 h-7" />,
                title: "Enterprise Analytics Access",
                desc: "Comprehensive dashboard solutions designed for corporate travel managers, fleet operators, and travel agencies requiring aggregated insights.",
                metrics: "B2B Licensing",
              },
              {
                icon: <DollarSign className="w-7 h-7" />,
                title: "Developer API Tier",
                desc: "Paid API endpoints enabling third-party integrations, mobility aggregators, and application developers to leverage our infrastructure.",
                metrics: "Usage-based",
              },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-5 sm:p-8 bg-card rounded-2xl border-2 border-border/50 group-hover:border-accent/60 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h4
                        className="text-foreground"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: 800,
                          letterSpacing: "-0.01em",
                        }}>
                        {item.title}
                      </h4>
                      <span
                        className="px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30 text-nowrap"
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                        }}>
                        {item.metrics}
                      </span>
                    </div>
                    <p
                      className="text-muted-foreground leading-relaxed"
                      style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="relative py-14 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#2a2321] to-primary">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 border-2 border-accent/40 backdrop-blur-sm mb-8">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span
                className="text-accent uppercase tracking-[0.15em]"
                style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                Strategic Roadmap
              </span>
            </div>
            <h2
              className="text-primary-foreground mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}>
              The Path Forward
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full mb-8" />
            <p
              className="text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed"
              style={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
              Our vision for growing the ride comparison space globally
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Expansion",
                desc: "Scaling across 50+ major cities worldwide — from New York and London to Mumbai and São Paulo — powered by AI-driven market analysis.",
                timeline: "Q3 2026",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "AI Predictive Pricing",
                desc: "Machine-learning engine that forecasts fare trends and recommends optimal booking windows, saving users up to 30% on average.",
                timeline: "Q4 2026",
              },
              {
                icon: <Bell className="w-8 h-8" />,
                title: "Smart Fare Alerts",
                desc: "Personalized AI notifications that detect price drops and surge patterns in real-time, so you always book at the best moment.",
                timeline: "Q2 2026",
              },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border-2 border-accent/40 hover:border-accent/70 transition-all duration-300 group-hover:-translate-y-2 shadow-xl">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="absolute inset-0 w-16 h-16 rounded-xl bg-accent blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/40 mb-4">
                    <span
                      className="text-accent uppercase tracking-wider"
                      style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                      {item.timeline}
                    </span>
                  </div>

                  <h4
                    className="text-primary-foreground mb-4"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                    }}>
                    {item.title}
                  </h4>
                  <p
                    className="text-primary-foreground/70 leading-relaxed"
                    style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
