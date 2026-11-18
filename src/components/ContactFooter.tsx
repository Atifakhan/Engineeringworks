import React from 'react';
import { ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export function ContactFooter() {
  return (
    <>
      {/* Direct Contact Section */}
      <section
        id="contact"
        className="border-b border-[#E2E8F0] bg-[#FFFFFF] py-16 transition-colors duration-200 sm:py-20 dark:border-[#26364D] dark:bg-[#0B1220]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#0D9488] dark:text-[#2DD4BF]">
              Direct Engineering Desk
            </p>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F2B46] sm:text-4xl dark:text-[#F8FAFC]">
              Speak Directly With Our Engineering Leads
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
              No call centers or automated queues. Connect directly with our technical team for
              consultations, site surveys, or 24-hour emergency electrical assistance.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {COMPANY_INFO.contacts.map((contact, idx) => (
              <div
                key={contact.phone}
                className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 dark:border-[#26364D] dark:bg-[#111C2E]"
              >
                <div>
                  <p
                    className={`text-xs font-semibold ${
                      idx === 0
                        ? 'text-[#B45309] dark:text-[#FBBF24]'
                        : 'text-[#2563EB] dark:text-[#60A5FA]'
                    }`}
                  >
                    {contact.role}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                    {contact.name}
                  </h3>
                  <p className="mt-3 font-mono-num text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                    {contact.phone}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#E2E8F0] pt-4 dark:border-[#26364D]">
                  <a
                    href={contact.telHref}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call Now
                  </a>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#0D9488] px-4 py-2 text-xs font-semibold text-[#0D9488] transition-colors hover:bg-[#0D9488] hover:text-white dark:border-[#2DD4BF] dark:text-[#2DD4BF] dark:hover:bg-[#0D9488] dark:hover:text-[#0B1220]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}

            {/* Google Business Profile Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-[#EFF6FF] p-6 dark:border-[#26364D] dark:bg-[#17263B]">
              <div>
                <p className="text-xs font-semibold text-[#0D9488] dark:text-[#2DD4BF]">
                  Verified Business Listing
                </p>
                <h3 className="mt-1.5 font-display text-xl font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                  Google Business Profile
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
                  View our full catalog of authentic company photographs, customer reviews,
                  operating hours, and service coverage directly on Google.
                </p>
              </div>

              <div className="mt-6 border-t border-[#CBD5E1]/70 pt-4 dark:border-[#26364D]">
                <a
                  href={COMPANY_INFO.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0F2B46] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2563EB] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6]"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Open Google Business Profile
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-[#F8FAFC] py-10 transition-colors duration-200 dark:bg-[#0B1220]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 border-b border-[#E2E8F0] pb-8 md:flex-row md:items-center dark:border-[#26364D]">
            <div className="flex items-center gap-3">
              <img
                src={COMPANY_INFO.logoSrc}
                alt="All In One Solution Logo"
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-lg bg-white object-contain p-0.5 ring-1 ring-[#E2E8F0] dark:ring-[#26364D]"
              />
              <div>
                <p className="font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                  {COMPANY_INFO.brandName} — {COMPANY_INFO.divisionName}
                </p>
                <p className="text-xs text-[#475569] dark:text-[#B8C5D6]">
                  Electrical · Solar · CCTV Security · Networking &amp; Fiber · Air Conditioning
                </p>
              </div>
            </div>

            <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 text-sm text-[#475569] dark:text-[#B8C5D6]">
              <a href="#services" className="hover:text-[#2563EB] dark:hover:text-[#60A5FA]">
                Services
              </a>
              <a href="#gallery" className="hover:text-[#2563EB] dark:hover:text-[#60A5FA]">
                Gallery
              </a>
              <a href="#solutions" className="hover:text-[#2563EB] dark:hover:text-[#60A5FA]">
                Solutions
              </a>
              <a href="#booking" className="hover:text-[#2563EB] dark:hover:text-[#60A5FA]">
                Book Service
              </a>
              <a
                href={COMPANY_INFO.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2563EB] dark:hover:text-[#60A5FA]"
              >
                Google Profile
              </a>
            </nav>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-[#475569] sm:flex-row sm:items-center dark:text-[#B8C5D6]">
            <p>
              © {new Date().getFullYear()} {COMPANY_INFO.brandName} — {COMPANY_INFO.divisionName}.
              All rights reserved.
            </p>
            <p className="font-mono-num">
              24-Hr Emergency: 0300-5934412 · WhatsApp: 0335-9892741
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
