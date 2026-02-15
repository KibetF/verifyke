"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyLocation: "",
    serviceType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you! We will contact you within 24 hours.");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0F766E" }}>
              Contact Us
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "#0B1F3B" }}>
              Book Your Inspection
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
              Fill out the form below and we&apos;ll get back to you within 24 hours with pricing and next steps.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold mb-6" style={{ color: "#0B1F3B" }}>
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0F766E" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: "#0B1F3B" }}>
                      Email
                    </h3>
                    <a href="mailto:info@verifyke.com" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "#475569" }}>
                      info@verifyke.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0F766E" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: "#0B1F3B" }}>
                      WhatsApp
                    </h3>
                    <a href="https://wa.me/254700000000" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "#475569" }}>
                      +254 700 000 000
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0F766E" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: "#0B1F3B" }}>
                      Location
                    </h3>
                    <p className="text-sm" style={{ color: "#475569" }}>
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0F766E" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: "#0B1F3B" }}>
                      Response Time
                    </h3>
                    <p className="text-sm" style={{ color: "#475569" }}>
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "#0B1F3B" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
                      placeholder="John Mwangi"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#0B1F3B" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: "#0B1F3B" }}>
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
                      placeholder="+254 700 000 000"
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium mb-2" style={{ color: "#0B1F3B" }}>
                      Service Type *
                    </label>
                    <select
                      id="serviceType"
                      required
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
                      style={{ color: "#0B1F3B" }}
                    >
                      <option value="">Select a service...</option>
                      <option value="quick-check">Quick Check ($25)</option>
                      <option value="standard">Standard Inspection ($65)</option>
                      <option value="premium">Premium Verification ($120)</option>
                      <option value="construction">Construction Oversight</option>
                      <option value="installation">Installation Verification</option>
                      <option value="monitoring">Ongoing Monitoring</option>
                      <option value="concierge">Concierge Verification</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="propertyLocation" className="block text-sm font-medium mb-2" style={{ color: "#0B1F3B" }}>
                    Property Location (County/Town) *
                  </label>
                  <input
                    type="text"
                    id="propertyLocation"
                    required
                    value={formData.propertyLocation}
                    onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors"
                    placeholder="e.g., Kiambu County, Ruiru"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: "#0B1F3B" }}>
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none transition-colors resize-none"
                    placeholder="GPS coordinates, specific requirements, urgency level, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white font-semibold rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#0B1F3B" }}
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
