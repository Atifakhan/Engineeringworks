import React from 'react';
import {
  ArrowUpRight,
  Check,
  Cpu,
  Network,
  ShieldCheck,
  SunMedium,
  Wind,
  Zap,
} from 'lucide-react';
import { SERVICES, ServiceAccent, ServiceItem } from '../data/siteData';
import { SafeImage } from './SafeImage';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

const ACCENT_STYLES: Record<
  ServiceAccent,
  {
    iconWrap: string;
    label: string;
    check: string;
    button: string;
    topRule: string;
  }
> = {
  orange: {
    iconWrap:
      'bg-[#FEF3C7] text-[#B45309] dark:bg-[#FBBF24]/15 dark:text-[#FBBF24]',
    label: 'text-[#B45309] dark:text-[#FBBF24]',
    check: 'text-[#F59E0B] dark:text-[#FBBF24]',
    button:
      'text-[#B45309] hover:text-[#92400E] dark:text-[#FBBF24] dark:hover:text-[#FDE68A]',
    topRule: 'bg-[#F59E0B] dark:bg-[#FBBF24]',
  },
  blue: {
    iconWrap:
      'bg-[#EFF6FF] text-[#2563EB] dark:bg-[#60A5FA]/15 dark:text-[#60A5FA]',
    label: 'text-[#2563EB] dark:text-[#60A5FA]',
    check: 'text-[#2563EB] dark:text-[#60A5FA]',
    button:
      'text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#60A5FA] dark:hover:text-[#93C5FD]',
    topRule: 'bg-[#2563EB] dark:bg-[#60A5FA]',
  },
  teal: {
    iconWrap:
      'bg-[#CCFBF1] text-[#0F766E] dark:bg-[#2DD4BF]/15 dark:text-[#2DD4BF]',
    label: 'text-[#0D9488] dark:text-[#2DD4BF]',
    check: 'text-[#0D9488] dark:text-[#2DD4BF]',
    button:
      'text-[#0D9488] hover:text-[#0F766E] dark:text-[#2DD4BF] dark:hover:text-[#5EEAD4]',
    topRule: 'bg-[#0D9488] dark:bg-[#2DD4BF]',
  },
};

function getServiceIcon(id: string) {
  switch (id) {
    case 'solar-energy':
      return SunMedium;
    case 'electrical-systems':
      return Zap;
    case 'networking-it':
      return Network;
    case 'cctv-security':
      return ShieldCheck;
    case 'ac-hvac':
      return Wind;
    default:
      return Cpu;
  }
}

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="border-b border-[#E2E8F0] bg-[#FFFFFF] py-16 transition-colors duration-200 sm:py-20 dark:border-[#26364D] dark:bg-[#0B1220]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#2563EB] dark:text-[#60A5FA]">
              Engineering Divisions
            </p>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F2B46] sm:text-4xl dark:text-[#F8FAFC]">
              Six Specialized Technical Services Under One Roof
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
              From high-efficiency solar arrays and code-compliant electrical distribution to
              precision fiber optics, CCTV surveillance, and HVAC care.
            </p>
          </div>

          {/* Domain Color Legend (clean unboxed text) */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#475569] dark:text-[#B8C5D6]">
            <span className="text-[#B45309] dark:text-[#FBBF24]">
              Solar &amp; Electrical Energy
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[#2563EB] dark:text-[#60A5FA]">
              Networking, IT &amp; Electronics
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[#0D9488] dark:text-[#2DD4BF]">
              Security, HVAC &amp; Reliability
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service: ServiceItem) => {
            const Icon = getServiceIcon(service.id);
            const styles = ACCENT_STYLES[service.accent];

            return (
              <article
                key={service.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] transition-all duration-200 hover:border-[#2563EB]/40 dark:border-[#26364D] dark:bg-[#111C2E] dark:hover:border-[#60A5FA]/50"
              >
                {/* Thin top domain accent line */}
                <div className={`h-1 w-full ${styles.topRule}`} />

                {/* Company Image Preview */}
                <div className="relative h-44 w-full overflow-hidden bg-[#EFF6FF] dark:bg-[#17263B]">
                  <SafeImage
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    loading="lazy"
                    fallbackTitle={service.title}
                    className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${
                      service.imageClassName ?? 'object-cover'
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2B46]/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium text-white">
                    <span className="font-mono-num">{service.number}.</span>
                    <span>{service.responseNote}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-xs font-semibold ${styles.label}`}>
                        {service.categoryLabel}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                        {service.title}
                      </h3>
                    </div>
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
                    {service.summary}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-[#E2E8F0] pt-4 dark:border-[#26364D]">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#0F172A] dark:text-[#E2E8F0]"
                      >
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${styles.check}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(service.title)}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${styles.button}`}
                    >
                      Request this service
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
