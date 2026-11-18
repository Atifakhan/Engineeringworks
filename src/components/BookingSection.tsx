import React, { useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/siteData';

interface BookingSectionProps {
  preselectedService: string;
  onNotify: (message: string) => void;
}

interface BookingRecord {
  reference: string;
  name: string;
  phone: string;
  propertyType: 'Residential' | 'Commercial' | 'Industrial';
  service: string;
  urgency: 'Standard Scheduled' | 'Same-Day Priority' | '24-Hour Emergency';
  preferredDate: string;
  timeWindow: string;
  location: string;
  notes: string;
  createdAt: string;
}

const BOOKINGS_STORAGE_KEY = 'aios-service-bookings-v1';

const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.title),
  'General Technical Inspection / Multiple Services',
];

export function BookingSection({ preselectedService, onNotify }: BookingSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial' | 'Industrial'>(
    'Residential'
  );
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [urgency, setUrgency] = useState<
    'Standard Scheduled' | 'Same-Day Priority' | '24-Hour Emergency'
  >('Standard Scheduled');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeWindow, setTimeWindow] = useState('Morning (9:00 AM – 12:00 PM)');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [latestBooking, setLatestBooking] = useState<BookingRecord | null>(null);

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  useEffect(() => {
    if (preselectedService) {
      const exactMatch = SERVICE_OPTIONS.find(
        (opt) => opt.toLowerCase() === preselectedService.toLowerCase()
      );
      if (exactMatch) {
        setService(exactMatch);
      } else {
        setNotes((prev) =>
          prev
            ? prev
            : `Interested in work similar to: ${preselectedService}`
        );
      }
    }
  }, [preselectedService]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      nextErrors.phone = 'Please enter a valid phone or WhatsApp number (at least 10 digits).';
    }
    if (!location.trim()) {
      nextErrors.location = 'Please enter your area or street address.';
    }
    if (!preferredDate) {
      nextErrors.preferredDate = 'Please select a preferred date.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const record: BookingRecord = {
      reference: `AIOS-${new Date().getFullYear()}-${randomCode}`,
      name: name.trim(),
      phone: phone.trim(),
      propertyType,
      service,
      urgency,
      preferredDate,
      timeWindow,
      location: location.trim(),
      notes: notes.trim(),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    const next = [record, ...bookings].slice(0, 8);
    setBookings(next);
    setLatestBooking(record);
    try {
      window.localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage write errors
    }

    onNotify(`Service request ${record.reference} saved. You can also dispatch it via WhatsApp.`);
    setName('');
    setPhone('');
    setLocation('');
    setNotes('');
    setErrors({});
  };

  const clearHistory = () => {
    setBookings([]);
    try {
      window.localStorage.removeItem(BOOKINGS_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const buildWhatsAppLink = (record: BookingRecord) => {
    const text = [
      `New Service Booking (${record.reference})`,
      `Name: ${record.name}`,
      `Phone: ${record.phone}`,
      `Property: ${record.propertyType}`,
      `Service: ${record.service}`,
      `Urgency: ${record.urgency}`,
      `Schedule: ${record.preferredDate} · ${record.timeWindow}`,
      `Location: ${record.location}`,
      record.notes ? `Notes: ${record.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="booking"
      className="border-b border-[#E2E8F0] bg-[#EFF6FF]/60 py-16 transition-colors duration-200 sm:py-20 dark:border-[#26364D] dark:bg-[#111C2E]/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Engineering Dispatch Info */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#B45309] dark:text-[#FBBF24]">
              Service Scheduling
            </p>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F2B46] sm:text-4xl dark:text-[#F8FAFC]">
              Book a Certified Engineer or Technical Visit
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
              Submit your installation, repair, or maintenance requirements below. Receive an
              instant reference number and send your brief directly to our technical operations
              desk on WhatsApp.
            </p>

            {/* Reassurance Details */}
            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#111C2E]">
                <div className="flex items-start gap-3.5">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#F59E0B] dark:text-[#FBBF24]" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                      24-Hour Emergency Electrical Support
                    </h3>
                    <p className="mt-1 text-sm text-[#475569] dark:text-[#B8C5D6]">
                      For urgent power outages, breaker trips, or short-circuit faults, call Engr.
                      Imtiaz Khan directly at{' '}
                      <a
                        href={COMPANY_INFO.contacts[0].telHref}
                        className="font-mono-num font-semibold text-[#2563EB] hover:underline dark:text-[#60A5FA]"
                      >
                        0300-5934412
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#111C2E]">
                <div className="flex items-start gap-3.5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0D9488] dark:text-[#2DD4BF]" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                      Transparent Site Survey &amp; Estimate
                    </h3>
                    <p className="mt-1 text-sm text-[#475569] dark:text-[#B8C5D6]">
                      Clear equipment specifications and scope confirmation before installation
                      begins for solar, CCTV, networking, electrical, or AC projects.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#111C2E]">
                <div className="flex items-start gap-3.5">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB] dark:text-[#60A5FA]" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                      Direct WhatsApp Technical Desk
                    </h3>
                    <p className="mt-1 text-sm text-[#475569] dark:text-[#B8C5D6]">
                      M. Kashif Khan ·{' '}
                      <a
                        href={COMPANY_INFO.contacts[1].whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-num font-semibold text-[#0D9488] hover:underline dark:text-[#2DD4BF]"
                      >
                        0335-9892741
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Validated Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm sm:p-8 dark:border-[#26364D] dark:bg-[#111C2E]">
              {latestBooking && (
                <div className="mb-6 rounded-xl border border-[#0D9488]/30 bg-[#F0FDFA] p-5 dark:border-[#2DD4BF]/30 dark:bg-[#0D9488]/10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0D9488] dark:text-[#2DD4BF]" />
                    <div className="flex-1">
                      <p className="font-display text-sm font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                        Booking Request Confirmed ·{' '}
                        <span className="font-mono-num text-[#0D9488] dark:text-[#2DD4BF]">
                          {latestBooking.reference}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-[#475569] dark:text-[#B8C5D6]">
                        {latestBooking.service} ({latestBooking.propertyType}) scheduled for{' '}
                        <span className="font-mono-num font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                          {latestBooking.preferredDate}
                        </span>
                        . Send these details on WhatsApp for fastest engineer assignment.
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <a
                          href={buildWhatsAppLink(latestBooking)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-[#0D9488] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0F766E] dark:bg-[#2DD4BF] dark:text-[#0B1220] dark:hover:bg-[#5EEAD4]"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Send Booking on WhatsApp
                        </a>
                        <button
                          type="button"
                          onClick={() => setLatestBooking(null)}
                          className="text-xs font-semibold text-[#475569] hover:text-[#0F2B46] dark:text-[#B8C5D6] dark:hover:text-[#F8FAFC]"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]"
                    >
                      Full Name *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Tariq Mahmood"
                      className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]"
                    >
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 0300-1234567"
                      className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono-num text-sm text-[#0F172A] placeholder:font-sans placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Property Type Segmented Buttons */}
                <div>
                  <span className="block text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]">
                    Property Type
                  </span>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {(['Residential', 'Commercial', 'Industrial'] as const).map((type) => {
                      const active = propertyType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors ${
                            active
                              ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] dark:border-[#60A5FA] dark:bg-[#17263B] dark:text-[#60A5FA]'
                              : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:text-[#0F2B46] dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#B8C5D6] dark:hover:text-[#F8FAFC]'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-service"
                      className="block text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]"
                    >
                      Required Service
                    </label>
                    <select
                      id="booking-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-urgency"
                      className="block text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]"
                    >
                      Priority Level
                    </label>
                    <select
                      id="booking-urgency"
                      value={urgency}
                      onChange={(e) =>
                        setUrgency(
                          e.target.value as
                            | 'Standard Scheduled'
                            | 'Same-Day Priority'
                            | '24-Hour Emergency'
                        )
                      }
                      className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                    >
                      <option value="Standard Scheduled">Standard Scheduled Visit</option>
                      <option value="Same-Day Priority">Same-Day Priority</option>
                      <option value="24-Hour Emergency">24-Hour Emergency Support</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]"
                    >
                      Preferred Date *
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono-num text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                    />
                    {errors.preferredDate && (
                      <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                        {errors.preferredDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-time"
                      className="block text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]"
                    >
                      Preferred Time Window
                    </label>
                    <select
                      id="booking-time"
                      value={timeWindow}
                      onChange={(e) => setTimeWindow(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                    >
                      <option value="Morning (9:00 AM – 12:00 PM)">
                        Morning (9:00 AM – 12:00 PM)
                      </option>
                      <option value="Afternoon (12:00 PM – 4:00 PM)">
                        Afternoon (12:00 PM – 4:00 PM)
                      </option>
                      <option value="Evening (4:00 PM – 8:00 PM)">
                        Evening (4:00 PM – 8:00 PM)
                      </option>
                      <option value="Immediate Emergency Dispatch">
                        Immediate Emergency Dispatch
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-location"
                    className="block text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]"
                  >
                    Site Address / Sector / Area *
                  </label>
                  <input
                    id="booking-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Street 14, Sector F-10, Islamabad"
                    className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-notes"
                    className="block text-sm font-semibold text-[#0F2B46] dark:text-[#F8FAFC]"
                  >
                    Technical Details / Equipment Notes
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe inverter capacity, number of CCTV cameras, AC tonnage, or electrical fault symptoms..."
                    className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#F59E0B] px-6 py-3.5 text-sm font-bold text-[#0F172A] shadow-sm transition-colors duration-150 hover:bg-[#D97706] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 dark:bg-[#FBBF24] dark:text-[#0B1220] dark:hover:bg-[#F59E0B] dark:focus-visible:ring-offset-[#111C2E]"
                >
                  <Calendar className="h-4 w-4" />
                  Confirm Service Booking
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Saved Service Requests Table */}
        {bookings.length > 0 && (
          <div className="mt-12 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 dark:border-[#26364D] dark:bg-[#111C2E]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4 dark:border-[#26364D]">
              <div>
                <h3 className="font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                  Your Recent Service Requests
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#B8C5D6]">
                  Saved locally on this device for quick follow-up with our engineers.
                </p>
              </div>
              <button
                type="button"
                onClick={clearHistory}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-red-600 dark:text-[#B8C5D6] dark:hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear History
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-xs font-semibold text-[#475569] dark:border-[#26364D] dark:text-[#B8C5D6]">
                    <th className="py-2.5 pr-4">Reference</th>
                    <th className="py-2.5 pr-4">Service</th>
                    <th className="py-2.5 pr-4">Schedule</th>
                    <th className="py-2.5 pr-4">Priority</th>
                    <th className="py-2.5 text-right">Dispatch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#26364D]">
                  {bookings.map((b) => (
                    <tr key={b.reference}>
                      <td className="py-3 pr-4 font-mono-num text-xs font-semibold text-[#0F2B46] dark:text-[#F8FAFC]">
                        {b.reference}
                      </td>
                      <td className="py-3 pr-4 text-[#0F172A] dark:text-[#E2E8F0]">
                        {b.service}
                      </td>
                      <td className="py-3 pr-4 font-mono-num text-xs text-[#475569] dark:text-[#B8C5D6]">
                        {b.preferredDate}
                      </td>
                      <td className="py-3 pr-4 text-xs font-medium text-[#0D9488] dark:text-[#2DD4BF]">
                        {b.urgency}
                      </td>
                      <td className="py-3 text-right">
                        <a
                          href={buildWhatsAppLink(b)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline dark:text-[#60A5FA]"
                        >
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
