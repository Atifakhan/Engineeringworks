import React from 'react';
import { ArrowRight, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

const CREDENTIALS = [
  {
    value: '24/7',
    label: 'Emergency Electrical Dispatch',
    accent: 'text-[#F59E0B] dark:text-[#FBBF24]',
  },
  {
    value: '6 Divisions',
    label: 'Solar · Electrical · CCTV · IT · AC · Repair',
    accent: 'text-[#2563EB] dark:text-[#60A5FA]',
  },
  {
    value: 'Home & B2B',
    label: 'Residential & Commercial Engineering',
    accent: 'text-[#0D9488] dark:text-[#2DD4BF]',
  },
  {
    value: 'Direct Team',
    label: 'Led by Engr. Imtiaz Khan & M. Kashif Khan',
    accent: 'text-[#0F2B46] dark:text-[#F8FAFC]',
  },
];

export function Hero({ onBookClick, onExploreClick }: HeroProps) {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello All In One Solution — Engineering Works, I would like to inquire about your technical services.'
  )}`;

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#E2E8F0] bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EFF6FF] transition-colors duration-200 dark:border-[#26364D] dark:from-[#0B1220] dark:via-[#0B1220] dark:to-[#111C2E]"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* 2-column balanced hero split */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Copy & CTAs */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="mb-3 text-sm font-semibold text-[#2563EB] dark:text-[#60A5FA]">
              Engineering Works · Electrical, Solar, CCTV, Networking &amp; HVAC
            </p>

            <h1 className="font-display text-balance text-4xl font-extrabold leading-[1.12] tracking-tight text-[#0F2B46] sm:text-5xl lg:text-[3.35rem] dark:text-[#F8FAFC]">
              Professional Technical Solutions. One Trusted Team.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#475569] sm:text-lg dark:text-[#B8C5D6]">
              Reliable solutions for electrical systems, CCTV security, networking, solar energy,
              air conditioning and technical maintenance.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#F59E0B] px-6 py-3.5 text-sm font-bold text-[#0F172A] shadow-sm transition-all duration-150 hover:bg-[#D97706] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 dark:bg-[#FBBF24] dark:text-[#0B1220] dark:hover:bg-[#F59E0B] dark:focus-visible:ring-offset-[#0B1220]"
              >
                BOOK A SERVICE
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] dark:focus-visible:ring-offset-[#0B1220]"
              >
                EXPLORE OUR SERVICES
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#0D9488] bg-[#FFFFFF] px-5 py-3.5 text-sm font-semibold text-[#0D9488] transition-colors duration-150 hover:bg-[#0D9488] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] dark:border-[#2DD4BF] dark:bg-[#111C2E] dark:text-[#2DD4BF] dark:hover:bg-[#0D9488] dark:hover:text-[#0B1220]"
              >
                <MessageCircle className="h-4 w-4" />
                CONTACT VIA WHATSAPP
              </a>
            </div>

            {/* Direct Phone Lines & Verified Profile */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#E2E8F0] pt-6 text-sm text-[#475569] dark:border-[#26364D] dark:text-[#B8C5D6]">
              <a
                href={COMPANY_INFO.contacts[0].telHref}
                className="inline-flex items-center gap-2 font-medium text-[#0F2B46] transition-colors hover:text-[#2563EB] dark:text-[#F8FAFC] dark:hover:text-[#60A5FA]"
              >
                <Phone className="h-4 w-4 text-[#0D9488] dark:text-[#2DD4BF]" />
                <span>Engr. Imtiaz Khan:</span>
                <span className="font-mono-num font-semibold">0300-5934412</span>
              </a>
              <span aria-hidden="true" className="hidden text-[#CBD5E1] sm:inline dark:text-[#26364D]">
                ·
              </span>
              <a
                href={COMPANY_INFO.contacts[1].telHref}
                className="inline-flex items-center gap-2 font-medium text-[#0F2B46] transition-colors hover:text-[#2563EB] dark:text-[#F8FAFC] dark:hover:text-[#60A5FA]"
              >
                <Phone className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
                <span>M. Kashif Khan:</span>
                <span className="font-mono-num font-semibold">0335-9892741</span>
              </a>
            </div>
          </div>

          {/* Right Column: Authentic Company Visual Showcase */}
          <div className="flex flex-col lg:col-span-6">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-sm dark:border-[#26364D] dark:bg-[#111C2E]">
              <div className="relative flex-1 min-h-[260px] sm:min-h-[340px] bg-[#EFF6FF] dark:bg-[#17263B]">
                <SafeImage
                  src={COMPANY_INFO.heroBannerSrc}
                  alt="Engineering Works technicians installing hybrid solar inverters, electrical panels, fiber optics, and CCTV security systems"
                  loading="eager"
                  fallbackTitle="Engineering Works — Complete Solutions"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2E8F0] bg-[#FFFFFF] px-5 py-4 dark:border-[#26364D] dark:bg-[#111C2E]">
                <div>
                  <p className="text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]">
                    Complete Engineering Works — Residential &amp; Commercial
                  </p>
                  <p className="mt-0.5 text-xs text-[#475569] dark:text-[#B8C5D6]">
                    Growatt · Maxpower · Invex · Fiber Optics · CCTV · HVAC
                  </p>
                </div>
                <a
                  href={COMPANY_INFO.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8] dark:text-[#60A5FA] dark:hover:text-[#93C5FD]"
                >
                  Google Business Profile
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Engineering Credentials Strip */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-5 py-4 transition-colors duration-200 dark:border-[#26364D] dark:bg-[#111C2E]"
            >
              <div className={`font-display text-xl font-bold ${item.accent}`}>
                {item.value}
              </div>
              <div className="mt-1 text-xs font-medium text-[#475569] dark:text-[#B8C5D6]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
