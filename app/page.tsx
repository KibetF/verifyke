import Link from "next/link";

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "#0F766E" }}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: "#0B1F3B" }}>
              Independent Property Verification for Kenyans Abroad
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed mb-8" style={{ color: "#475569" }}>
              We provide GPS-verified inspections, visual documentation, and risk-based reporting. We do not sell land or construct buildings. We exist solely to protect you from fraud and misinformation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-block text-white font-semibold rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0B1F3B" }}
              >
                Book Inspection
              </Link>
              <Link
                href="/services"
                className="inline-block font-semibold rounded-lg px-6 py-3 border transition-colors hover:bg-slate-50"
                style={{ color: "#0B1F3B", borderColor: "#CBD5E1" }}
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0F766E" }}>
              What We Do
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
              Evidence-Based Property Verification
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#475569" }}>
              We are an independent verification company providing transparent, documented field inspections across Kenya.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Site Inspections */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <FeatureIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </FeatureIcon>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                Site Inspections
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                On-site property visits by verified field agents with comprehensive boundary and access checks.
              </p>
            </div>

            {/* GPS Verification */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <FeatureIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
              </FeatureIcon>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                GPS Verification
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                Precise GPS coordinate confirmation to verify exact property location and boundaries.
              </p>
            </div>

            {/* Photo & Video Evidence */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <FeatureIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
                </svg>
              </FeatureIcon>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                Photo & Video Evidence
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                High-resolution photography and video documentation with GPS timestamps.
              </p>
            </div>

            {/* Detailed Risk Reports */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <FeatureIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </FeatureIcon>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                Detailed Risk Reports
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                Structured reports with findings, risk assessments, and evidence for your due diligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Band */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0F766E" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                  Our Independence Commitment
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  <strong>VerifyKe is an independent verification company.</strong> We do not sell land, broker transactions, construct buildings, or provide legal or financial advice. Our reports are produced solely for your due diligence and are based entirely on observable, documented evidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
              Ready to Verify Your Property?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#475569" }}>
              Get started with an independent inspection today. Transparent pricing, verified agents, GPS-confirmed evidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block text-white font-semibold rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0B1F3B" }}
              >
                Book Inspection
              </Link>
              <Link
                href="/pricing"
                className="inline-block font-semibold rounded-lg px-6 py-3 border transition-colors hover:bg-slate-50"
                style={{ color: "#0B1F3B", borderColor: "#CBD5E1" }}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
