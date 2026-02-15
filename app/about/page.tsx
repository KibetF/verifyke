import Image from "next/image";

export default function AboutPage() {
  const team = [
    {
      name: "John Mwangi",
      role: "Founder & CEO",
      bio: "Diaspora Kenyan with 15+ years in property technology. Founded VerifyKe to bridge the trust gap for overseas investors.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    },
    {
      name: "Sarah Wanjiku",
      role: "Lead Field Inspector",
      bio: "10 years of land surveying experience. Oversees agent training and quality assurance for all field operations.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    {
      name: "David Kimani",
      role: "Operations Coordinator",
      bio: "Background in logistics and project management. Manages scheduling, documentation, and client communication.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0F766E" }}>
              About Us
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "#0B1F3B" }}>
              Independent Verification for Diaspora Property Investors
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
              VerifyKe was founded to solve a critical problem: the lack of trustworthy, on-the-ground verification for Kenyans investing in property from abroad.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "#0B1F3B" }}>
                Our Mission
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#475569" }}>
                To provide independent, evidence-based property verification for diaspora clients who cannot physically inspect their investments.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#475569" }}>
                We exist to document the truth — what is actually on the ground, verified with GPS coordinates, photographs, and video evidence.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#475569" }}>
                We are not brokers. We are not sellers. We are not contractors. We are independent verifiers committed to protecting your investment decisions with factual, observable data.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
                alt="VerifyKe mission - independent property verification"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Neutrality Statement */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#0F766E" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "#0B1F3B" }}>
                Our Independence Guarantee
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                  We Do Not Sell Land
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  We have no property listings, no inventory, and no sales targets. Our only product is the truth about what we find on the ground.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                  We Do Not Broker Deals
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  We are not agents, middlemen, or negotiators. We never earn commissions on transactions. Our fee is for verification alone.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2" style={{ color: "#0B1F3B" }}>
                  No Legal or Financial Advice
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  Our reports are factual, evidence-based documentation. We do not interpret the law or advise on financial decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center" style={{ color: "#0B1F3B" }}>
              Why We Started VerifyKe
            </h2>
            <div className="prose prose-lg" style={{ color: "#475569" }}>
              <p className="leading-relaxed mb-4">
                VerifyKe was born from personal experience. Like many diaspora Kenyans, our founder sent money home to invest in land — only to discover the plot did not match what was promised. GPS coordinates were off. Boundaries were unclear. Neighbors had conflicting claims.
              </p>
              <p className="leading-relaxed mb-4">
                There was no independent service to verify the truth before committing funds. Brokers had conflicts of interest. Family members lacked technical expertise. Legal opinions were expensive and reactive, not preventive.
              </p>
              <p className="leading-relaxed">
                VerifyKe was created to fill that gap: a technology-driven, GPS-verified, photo-documented verification service with no conflicts of interest. We exist solely to protect you with factual, observable evidence before you invest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
              Our Team
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#475569" }}>
              Experienced professionals committed to transparency and accuracy.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-slate-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: "#0B1F3B" }}>
                  {member.name}
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: "#0F766E" }}>
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
