"use client";

import { useState } from "react";
import Link from "next/link";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left hover:opacity-80 transition-opacity"
      >
        <h3 className="text-base font-semibold pr-8" style={{ color: "#0B1F3B" }}>
          {question}
        </h3>
        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="#0B1F3B"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const faqs = [
    {
      question: "Are you affiliated with land sellers or developers?",
      answer: "No. VerifyKe is completely independent. We do not sell land, broker transactions, or receive any commissions from property sales. We are paid solely for verification services, ensuring our reports are objective and unbiased.",
    },
    {
      question: "Do you verify title deeds?",
      answer: "We do not provide legal verification of title deeds. Our service focuses on physical, on-the-ground verification: GPS coordinates, boundary visibility, encroachment risks, and visual documentation. For legal title verification, we recommend consulting a qualified lawyer.",
    },
    {
      question: "Can I join the inspection live via video call?",
      answer: "Yes! We offer a Live Video Inspection add-on (+$15) where you can join the agent via WhatsApp video call during the site visit. This allows you to see the property in real-time and ask questions directly.",
    },
    {
      question: "How long does it take to receive the report?",
      answer: "Standard reports are delivered within 24-48 hours after the site visit. Express same-day service is available for an additional fee (+$10). Emergency verifications include rapid 4-hour report delivery.",
    },
    {
      question: "What if I am not satisfied with the inspection?",
      answer: "If you believe the inspection was incomplete or inaccurate, contact us within 7 days. We will review the case and, if warranted, dispatch another agent for a follow-up visit at no additional cost.",
    },
    {
      question: "How is pricing determined?",
      answer: "Pricing is based on the service tier (Quick Check, Standard, or Premium) plus distance-based travel fees. The final price is confirmed before service execution. All prices are in USD and clearly outlined on our Pricing page.",
    },
    {
      question: "Are my documents and photos secure?",
      answer: "Yes. All photos, videos, and reports are stored on secure, encrypted servers and are accessible only to you via a password-protected link. We do not share your data with third parties.",
    },
    {
      question: "Do you operate in all counties across Kenya?",
      answer: "We have verified agents in most major counties. For remote or hard-to-reach areas, we will provide a custom quote and timeline. Contact us with your property location for confirmation.",
    },
    {
      question: "Can I request a specific agent?",
      answer: "Yes, for Concierge Verification clients, you can request a dedicated agent who will handle all your future inspections. This is ideal for clients with multiple properties or ongoing monitoring needs.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-Pesa, bank transfer, and international payment via PayPal or Wise. Payment details are provided after you submit an inspection request.",
    },
    {
      question: "Do you provide construction management services?",
      answer: "No. We provide construction oversight and documentation only. We do not manage contractors, purchase materials, or make construction decisions on your behalf. We observe, document, and report.",
    },
    {
      question: "What if the property has encroachment or disputes?",
      answer: "We will document any visible signs of encroachment, boundary disputes, or unauthorized occupation in our report. We do not mediate disputes or provide legal advice, but our evidence can support your legal or negotiation efforts.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#0F766E" }}>
              FAQ
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "#0B1F3B" }}>
              Frequently Asked Questions
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
              Common questions from diaspora clients about our verification process, independence, and services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "#0B1F3B" }}>
            Still Have Questions?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#475569" }}>
            Contact us directly and we&apos;ll be happy to assist you.
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
