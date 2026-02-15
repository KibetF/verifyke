import Image from "next/image";
import Link from "next/link";

function ServiceSection({
  id,
  title,
  description,
  features,
  imageUrl,
  imageAlt,
}: {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-16 border-b border-slate-200 last:border-0">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
            {title}
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#475569" }}>
            {description}
          </p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm" style={{ color: "#475569" }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden border border-slate-200">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0F766E" }}>
              Our Services
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "#0B1F3B" }}>
              Comprehensive Property Verification
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
              Independent, evidence-based inspections across Kenya. From single-visit verifications to ongoing monitoring, we provide GPS-confirmed documentation you can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <ServiceSection
          id="property"
          title="Property & Land Verification"
          description="Our core service for property buyers and investors. We visit the site, verify GPS coordinates, document boundaries, assess risks, and provide a comprehensive report with photo and video evidence."
          features={[
            "GPS coordinate confirmation with precision mapping",
            "Boundary beacon visibility check and documentation",
            "Encroachment and dispute risk assessment",
            "Access road condition and right-of-way verification",
            "Surrounding land use observation and neighbor interviews",
            "High-resolution photo documentation (20+ images)",
            "360° video sweep of the entire property",
            "Risk rating: Low / Moderate / High with detailed findings",
          ]}
          imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
          imageAlt="Drone aerial view of property land verification"
        />

        <ServiceSection
          id="construction"
          title="Construction Oversight"
          description="Track your construction project with regular site visits and milestone verification. We document progress, confirm material quality, verify contractor presence, and provide timeline comparisons against your original plan."
          features={[
            "Stage-by-stage construction progress verification",
            "Foundation, slab, and roof milestone confirmation",
            "Visible defect documentation with close-up photography",
            "Contractor and worker presence confirmation",
            "Material quality visual check (cement, steel, timber)",
            "Timeline comparison against project schedule",
            "Photo and video documentation per visit",
            "Risk assessment summary with recommendations",
          ]}
          imageUrl="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
          imageAlt="Construction site inspection by field agent"
        />

        <ServiceSection
          id="installation"
          title="Installation Verification"
          description="Ensure your equipment installations match contractor claims. We verify CCTV systems, solar panels, electric fences, boreholes, and other infrastructure with equipment counts, functionality tests, and quality checks."
          features={[
            "CCTV and security system installation verification",
            "Solar panel count, positioning, and wiring check",
            "Electric fence and gate installation confirmation",
            "Borehole pump and water system functionality test",
            "Roofing and renovation completion verification",
            "Equipment count verification against quotations",
            "Installation quality and workmanship assessment",
            "Structured checklist confirmation with photographic evidence",
          ]}
          imageUrl="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80"
          imageAlt="Technician inspecting CCTV and security systems"
        />

        <ServiceSection
          id="monitoring"
          title="Ongoing Monitoring (Subscription)"
          description="Protect your investment over time with scheduled periodic visits. Ideal for absentee landlords, diaspora property owners, and construction projects requiring long-term oversight."
          features={[
            "Quarterly or monthly scheduled site visits",
            "Fence condition and boundary integrity check",
            "Unauthorized occupancy or encroachment detection",
            "Property condition tracking over time",
            "Tenant activity and rental condition verification",
            "Updated visual log with timestamped photos",
            "Property condition summary with change alerts",
            "Flexible subscription plans (3, 6, or 12 months)",
          ]}
          imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
          imageAlt="Inspector conducting property monitoring visit"
        />

        <ServiceSection
          id="concierge"
          title="Concierge Verification"
          description="Premium white-glove service for high-value clients. Dedicated agent, custom scope, priority response, and multi-site portfolio verification with direct communication."
          features={[
            "Dedicated verified agent assigned to your account",
            "Custom verification scope tailored to your needs",
            "Priority response and same-day visit options",
            "Multi-site and property portfolio verification",
            "Delivery confirmation and asset purchase verification",
            "Caretaker supervision and payment milestone checks",
            "Direct WhatsApp and phone communication with assigned agent",
            "Quarterly executive summary reports",
          ]}
          imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
          imageAlt="Agent preparing detailed verification report"
        />
      </div>

      {/* CTA */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#475569" }}>
            Book your inspection today or contact us to discuss a custom verification plan.
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
      </section>
    </div>
  );
}
