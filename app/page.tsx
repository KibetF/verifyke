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
      {/* Hero Section — Two Columns */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
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

            {/* Right: Verification Illustration Card */}
            <div className="hidden lg:block">
              <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#0F766E" }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#0F766E" }}>Verification In Progress</span>
                </div>

                {/* Map area with Kenya silhouette */}
                <div className="relative rounded-xl bg-white border border-slate-200 p-6 mb-6" style={{ minHeight: "200px" }}>
                  <svg viewBox="0 0 300 220" className="w-full h-auto opacity-10" fill="none">
                    {/* Simplified Kenya outline */}
                    <path d="M150 20 L190 40 L210 80 L220 120 L200 160 L180 180 L160 200 L140 190 L120 170 L100 140 L90 100 L100 60 L120 35 Z" fill="#0B1F3B" />
                  </svg>
                  {/* GPS Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: "#0F766E" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent" style={{ borderTopColor: "#0F766E" }} />
                  </div>
                  {/* Property outline */}
                  <div className="absolute bottom-4 right-4 w-20 h-14 border-2 border-dashed rounded" style={{ borderColor: "#0F766E", opacity: 0.4 }} />
                  <div className="absolute bottom-6 right-6 w-16 h-10 border-2 border-dashed rounded" style={{ borderColor: "#0F766E", opacity: 0.2 }} />
                </div>

                {/* Status details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: "#475569" }}>Property Location</span>
                    <span className="font-medium" style={{ color: "#0B1F3B" }}>Karen, Nairobi</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: "#475569" }}>GPS Coordinates</span>
                    <span className="font-mono text-xs" style={{ color: "#0B1F3B" }}>-1.3187°, 36.6920°</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: "#475569" }}>Status</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#ECFDF5", color: "#059669" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#059669" }} />
                      Agent On-Site
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ backgroundColor: "#0B1F3B" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.5" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-white mb-1">47</p>
              <p className="text-sm" style={{ color: "#94A3B8" }}>Counties Covered</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.5" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-white mb-1">GPS</p>
              <p className="text-sm" style={{ color: "#94A3B8" }}>Verified Reports</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.5" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-white mb-1">48hr</p>
              <p className="text-sm" style={{ color: "#94A3B8" }}>Turnaround</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.5" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-white mb-1">100%</p>
              <p className="text-sm" style={{ color: "#94A3B8" }}>Independent</p>
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

      {/* How It Works */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0F766E" }}>
              How It Works
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
              Three Simple Steps
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#475569" }}>
              From booking to report delivery, we keep it straightforward and transparent.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-12">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5" style={{ backgroundColor: "#E2E8F0" }} />

            {/* Step 1 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-white text-2xl font-bold" style={{ backgroundColor: "#0F766E" }}>
                1
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#0B1F3B" }}>Book Online</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                Choose your property, select your service tier, and submit your verification request from anywhere in the world.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-white text-2xl font-bold" style={{ backgroundColor: "#0F766E" }}>
                2
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#0B1F3B" }}>Agent Visits</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                A verified field agent visits the property, captures GPS coordinates, takes photos and video, and inspects the site.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-white text-2xl font-bold" style={{ backgroundColor: "#0F766E" }}>
                3
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#0B1F3B" }}>Get Your Report</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                Receive a detailed risk report with GPS evidence, photo documentation, and an independent assessment within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Report Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0F766E" }}>
              What You&apos;ll Receive
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
              Sample Verification Report
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#475569" }}>
              Every report includes GPS-verified data, photo evidence, and a clear risk assessment.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Report header */}
              <div className="px-8 py-6 border-b border-slate-200" style={{ backgroundColor: "#0B1F3B" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>VerifyKe Report</p>
                    <p className="text-white font-bold text-lg mt-1">Property Verification Report</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: "#94A3B8" }}>Report #VK-2024-0847</p>
                    <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>Feb 2026</p>
                  </div>
                </div>
              </div>

              {/* Report body */}
              <div className="p-8 space-y-6">
                {/* Property details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#94A3B8" }}>Property</p>
                    <p className="text-sm font-medium" style={{ color: "#0B1F3B" }}>0.25 Acre Plot, Karen</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#94A3B8" }}>Location</p>
                    <p className="text-sm font-medium" style={{ color: "#0B1F3B" }}>Karen, Nairobi County</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#94A3B8" }}>GPS Coordinates</p>
                    <p className="text-sm font-mono" style={{ color: "#0B1F3B" }}>-1.3187°, 36.6920°</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#94A3B8" }}>Risk Level</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#FEF9C3", color: "#A16207" }}>
                      Moderate Risk
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200" />

                {/* Photo evidence */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#94A3B8" }}>Photo Evidence</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="aspect-[4/3] rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F1F5F9" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21z" />
                      </svg>
                    </div>
                    <div className="aspect-[4/3] rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F1F5F9" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21z" />
                      </svg>
                    </div>
                    <div className="aspect-[4/3] rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F1F5F9" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200" />

                {/* Summary */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#94A3B8" }}>Summary</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                    The property was physically verified at the stated GPS coordinates. Boundary markers were partially visible. Adjacent land use is residential. Title deed reference matches county records. Minor discrepancy noted in the eastern boundary — recommend surveyor confirmation before purchase.
                  </p>
                </div>
              </div>
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

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0F766E" }}>
              Trusted by the Diaspora
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <svg viewBox="0 0 24 24" fill="#E2E8F0" className="w-8 h-8 mb-4">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#475569" }}>
                I was about to purchase a plot in Kitengela from abroad. VerifyKe&apos;s report revealed boundary issues that the seller hadn&apos;t disclosed. Saved me from a costly mistake.
              </p>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#0B1F3B" }}>James M.</p>
                <p className="text-xs" style={{ color: "#94A3B8" }}>London, United Kingdom</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <svg viewBox="0 0 24 24" fill="#E2E8F0" className="w-8 h-8 mb-4">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#475569" }}>
                The GPS verification and photos gave me complete confidence. I could see the exact plot, the surroundings, and the access roads — all from Dallas. Highly recommend.
              </p>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#0B1F3B" }}>Grace W.</p>
                <p className="text-xs" style={{ color: "#94A3B8" }}>Dallas, United States</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <svg viewBox="0 0 24 24" fill="#E2E8F0" className="w-8 h-8 mb-4">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#475569" }}>
                My family was building a home in Kisumu and I needed eyes on the ground. VerifyKe sent an agent within 48 hours and the report was thorough and professional.
              </p>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#0B1F3B" }}>David K.</p>
                <p className="text-xs" style={{ color: "#94A3B8" }}>Dubai, UAE</p>
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
