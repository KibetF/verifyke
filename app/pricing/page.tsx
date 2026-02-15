import Link from "next/link";

export default function PricingPage() {
  const tiers = [
    {
      name: "Quick Check",
      price: "$25",
      description: "Basic property verification with GPS coordinates and photo evidence. Ideal for initial due diligence.",
      features: [
        "GPS location verification",
        "Photo evidence (5+ images)",
        "Basic property report",
        "24-48 hour turnaround",
      ],
    },
    {
      name: "Standard Inspection",
      price: "$65",
      description: "Comprehensive inspection with detailed reporting. Recommended for property transactions.",
      features: [
        "Everything in Quick Check",
        "Video walkthrough",
        "Boundary verification",
        "Detailed written report",
        "Risk assessment",
      ],
      popular: true,
    },
    {
      name: "Premium Verification",
      price: "$120",
      description: "Full verification with extended documentation. Best for high-value transactions.",
      features: [
        "Everything in Standard",
        "Neighbor interviews",
        "Historical land use check",
        "Extended photo & video",
        "Priority support",
      ],
    },
  ];

  const addOns = [
    { name: "Live Video Inspection", description: "Real-time video call during site visit", price: "+$15" },
    { name: "Express Same-Day", description: "Priority scheduling for urgent requests", price: "+$10" },
    { name: "Emergency Dispatch", description: "Agent on-site within 2 hours", price: "+$35" },
    { name: "Impromptu Spot Check", description: "Unannounced same-day visit", price: "+$20" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0F766E" }}>
              Pricing
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "#0B1F3B" }}>
              Transparent, Straightforward Pricing
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
              Clear USD pricing with no hidden fees. All services include GPS-verified location data and photographic evidence.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-xl border p-8 relative ${
                  tier.popular
                    ? "ring-2 ring-[#0F766E] border-[#0F766E]"
                    : "border-slate-200"
                }`}
              >
                {tier.popular && (
                  <span
                    className="absolute -top-3 left-6 text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: "#0F766E" }}
                  >
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1" style={{ color: "#0B1F3B" }}>
                  {tier.name}
                </h3>
                <p className="text-3xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
                  {tier.price}
                </p>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "#475569" }}>
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm" style={{ color: "#475569" }}>
                      <svg className="w-5 h-5 flex-shrink-0" fill="#0F766E" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${
                    tier.popular
                      ? "text-white"
                      : "border"
                  }`}
                  style={
                    tier.popular
                      ? { backgroundColor: "#0B1F3B" }
                      : { color: "#0B1F3B", borderColor: "#CBD5E1" }
                  }
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Distance Policy */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#0B1F3B" }}>
              Distance-Based Travel Fees
            </h3>
            <p className="text-sm mb-6" style={{ color: "#475569" }}>
              Travel fees are calculated based on the distance from our nearest agent to the property location.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex justify-between items-center p-4 rounded-lg border border-slate-100">
                <span className="text-sm font-medium" style={{ color: "#0B1F3B" }}>
                  0–15 km
                </span>
                <span className="text-sm font-semibold" style={{ color: "#0F766E" }}>
                  Included
                </span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg border border-slate-100">
                <span className="text-sm font-medium" style={{ color: "#0B1F3B" }}>
                  15–40 km
                </span>
                <span className="text-sm font-semibold" style={{ color: "#0F766E" }}>
                  +$10
                </span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg border border-slate-100">
                <span className="text-sm font-medium" style={{ color: "#0B1F3B" }}>
                  40–80 km
                </span>
                <span className="text-sm font-semibold" style={{ color: "#0F766E" }}>
                  +$25
                </span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg border border-slate-100">
                <span className="text-sm font-medium" style={{ color: "#0B1F3B" }}>
                  80+ km
                </span>
                <span className="text-sm font-semibold" style={{ color: "#0F766E" }}>
                  Custom Quote
                </span>
              </div>
            </div>
          </div>

          {/* Add-Ons */}
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <h3 className="text-lg font-semibold mb-6" style={{ color: "#0B1F3B" }}>
              Optional Add-Ons
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {addOns.map((addon) => (
                <div key={addon.name} className="flex justify-between items-center p-4 rounded-lg border border-slate-100">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#0B1F3B" }}>
                      {addon.name}
                    </p>
                    <p className="text-xs" style={{ color: "#475569" }}>
                      {addon.description}
                    </p>
                  </div>
                  <span className="text-sm font-semibold flex-shrink-0 ml-4" style={{ color: "#0F766E" }}>
                    {addon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 p-6 rounded-xl border border-slate-200" style={{ backgroundColor: "#F8FAFC" }}>
            <p className="text-sm text-center" style={{ color: "#475569" }}>
              <strong>Note:</strong> Final pricing is confirmed before service execution. All prices shown are in USD.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
            Ready to Book Your Inspection?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#475569" }}>
            Contact us today for a quote tailored to your property location and verification needs.
          </p>
          <Link
            href="/contact"
            className="inline-block text-white font-semibold rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0B1F3B" }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
