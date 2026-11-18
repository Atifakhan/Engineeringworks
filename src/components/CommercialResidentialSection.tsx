import React from 'react';
import { Building2, Home } from 'lucide-react';
import { SERVICE_COMPARISON_ROWS } from '../data/siteData';

export function CommercialResidentialSection() {
  return (
    <section
      id="solutions"
      className="border-b border-[#E2E8F0] bg-[#FFFFFF] py-16 transition-colors duration-200 sm:py-20 dark:border-[#26364D] dark:bg-[#0B1220]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#2563EB] dark:text-[#60A5FA]">
            Residential &amp; Commercial Standards
          </p>
          <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F2B46] sm:text-4xl dark:text-[#F8FAFC]">
            Engineered for Homes, Offices &amp; Commercial Facilities
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
            Whether you need a clean residential solar and AC setup or multi-floor commercial
            fiber, CCTV, and 3-phase electrical distribution, our team delivers consistent
            workmanship and transparent support.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] dark:border-[#26364D] dark:bg-[#111C2E]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] dark:border-[#26364D] dark:bg-[#17263B]">
                  <th className="px-6 py-4 font-display text-xs font-bold tracking-wide text-[#0F2B46] uppercase dark:text-[#F8FAFC]">
                    Technical Discipline
                  </th>
                  <th className="px-6 py-4 font-display text-xs font-bold tracking-wide text-[#0F2B46] uppercase dark:text-[#F8FAFC]">
                    <span className="inline-flex items-center gap-2">
                      <Home className="h-4 w-4 text-[#F59E0B] dark:text-[#FBBF24]" />
                      Residential Solutions
                    </span>
                  </th>
                  <th className="px-6 py-4 font-display text-xs font-bold tracking-wide text-[#0F2B46] uppercase dark:text-[#F8FAFC]">
                    <span className="inline-flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
                      Commercial &amp; Office Contracts
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#26364D]">
                {SERVICE_COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.capability}
                    className="transition-colors hover:bg-[#EFF6FF]/50 dark:hover:bg-[#17263B]/60"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]">
                      {row.capability}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#475569] dark:text-[#B8C5D6]">
                      {row.residential}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#475569] dark:text-[#B8C5D6]">
                      {row.commercial}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supported Hardware & Engineering Standards */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#26364D] dark:bg-[#111C2E]">
            <p className="text-xs font-semibold text-[#B45309] dark:text-[#FBBF24]">
              Solar &amp; Power Equipment
            </p>
            <p className="mt-1.5 text-sm font-medium text-[#0F2B46] dark:text-[#F8FAFC]">
              Growatt, Inverex, Maxpower &amp; Hybrid Inverter Platforms
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
              Installation, commissioning, surge protection, and component-level repair.
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#26364D] dark:bg-[#111C2E]">
            <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">
              IT, Fiber &amp; Networking
            </p>
            <p className="mt-1.5 text-sm font-medium text-[#0F2B46] dark:text-[#F8FAFC]">
              Optical Fiber ODF Trays, Structured Cat6A &amp; Commercial Racks
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
              Clean splice management, tested patch links, and reliable office connectivity.
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 dark:border-[#26364D] dark:bg-[#111C2E]">
            <p className="text-xs font-semibold text-[#0D9488] dark:text-[#2DD4BF]">
              Security &amp; Climate Control
            </p>
            <p className="mt-1.5 text-sm font-medium text-[#0F2B46] dark:text-[#F8FAFC]">
              IP/HD CCTV Surveillance &amp; Split/Inverter AC Servicing
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
              Clear night-vision security monitoring and efficient cooling maintenance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
