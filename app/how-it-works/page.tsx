import Link from "next/link";

function ProcessStep({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#0F766E" }}>
          {icon}
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold text-lg text-white" style={{ backgroundColor: "#0B1F3B" }}>
          {number}
        </div>
        <h3 className="text-xl font-semibold mb-3" style={{ color: "#0B1F3B" }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#475569" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0F766E" }}>
              Our Process
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "#0B1F3B" }}>
              How It Works
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
              Transparent, process-driven verification in five simple steps. From booking to report delivery, we keep you informed every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            <ProcessStep
              number="1"
              title="Book Your Inspection"
              description="Submit a request through our contact form, WhatsApp, or email. Provide property location, GPS coordinates (if available), and the type of verification needed."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              }
            />

            <ProcessStep
              number="2"
              title="We Assign a Verified Agent"
              description="A background-checked field agent is assigned to your request. You'll receive their name, photo, and contact details before the site visit."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>
              }
            />

            <ProcessStep
              number="3"
              title="On-Site GPS-Verified Visit"
              description="Our agent arrives on-site, captures GPS coordinates, takes photos and videos, and conducts a thorough inspection based on your service type."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              }
            />

            <ProcessStep
              number="4"
              title="Evidence Capture & Risk Assessment"
              description="All findings are documented with timestamps. Our agent evaluates potential risks, encroachments, or red flags and prepares a risk rating."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
                </svg>
              }
            />

            <ProcessStep
              number="5"
              title="Structured Report Delivered"
              description="Receive a detailed PDF report with GPS data, photos, video links, findings, and risk assessment within 24-48 hours via email."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Transparency Commitment */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
                Transparency & Communication
              </h2>
              <p className="text-lg" style={{ color: "#475569" }}>
                You&apos;re kept informed at every stage of the process.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#0F766E" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                  Real-Time Updates
                </h3>
                <p className="text-sm" style={{ color: "#475569" }}>
                  Receive confirmation when the agent arrives on-site and when the inspection is complete.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#0F766E" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                  Direct Communication
                </h3>
                <p className="text-sm" style={{ color: "#475569" }}>
                  Speak directly with your assigned agent via WhatsApp or phone during the visit if needed.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#0F766E" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                  Secure Documentation
                </h3>
                <p className="text-sm" style={{ color: "#475569" }}>
                  All photos, videos, and reports are stored securely and accessible only to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
            Start Your Verification Today
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#475569" }}>
            Simple, transparent process. Verified agents. GPS-confirmed evidence.
          </p>
          <Link
            href="/contact"
            className="inline-block text-white font-semibold rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0B1F3B" }}
          >
            Book Inspection
          </Link>
        </div>
      </section>
    </div>
  );
}
