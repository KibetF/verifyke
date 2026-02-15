import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      {/* Trust Band */}
      <div className="border-b border-slate-200" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F766E"
              strokeWidth="1.5"
              className="w-5 h-5 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <p className="text-sm font-semibold" style={{ color: "#0B1F3B" }}>
              Independent. Evidence-Based. No Conflicts.
            </p>
          </div>
          <p className="text-xs text-center mt-2 max-w-3xl mx-auto" style={{ color: "#475569" }}>
            VerifyKe is an independent verification company. We do not sell land, broker transactions, construct buildings, or provide legal or financial advice.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <Logo className="mb-4" />
            <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
              Independent property verification services for Kenyans abroad.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#0B1F3B" }}>
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#property" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  Property Verification
                </Link>
              </li>
              <li>
                <Link href="/services#construction" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  Construction Oversight
                </Link>
              </li>
              <li>
                <Link href="/services#installation" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  Installation Verification
                </Link>
              </li>
              <li>
                <Link href="/services#monitoring" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  Ongoing Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#0B1F3B" }}>
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#0B1F3B" }}>
              Legal & Compliance
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/data-protection" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  Data Protection
                </Link>
              </li>
              <li>
                <Link href="/independence" className="text-sm hover:text-[#0F766E] transition-colors" style={{ color: "#475569" }}>
                  Independent Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm" style={{ color: "#475569" }}>
            &copy; {new Date().getFullYear()} VerifyKe. Independent Property Verification.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "#475569" }}>
              Contact
            </Link>
            <Link href="/login" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "#475569" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
