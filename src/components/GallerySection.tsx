import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Plus,
  Upload,
  X,
} from 'lucide-react';
import {
  COMPANY_INFO,
  GALLERY_CATEGORIES,
  GalleryCategoryId,
  GalleryPhoto,
  INITIAL_GALLERY_PHOTOS,
  SOLAR_COMPARISON_METRICS,
} from '../data/siteData';
import { SafeImage } from './SafeImage';

interface GallerySectionProps {
  onBookSimilar: (serviceContext: string) => void;
}

const UPLOADED_STORAGE_KEY = 'aios-uploaded-gallery-v1';

const ELECTRICAL_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Site Inspection & Load Audit',
    detail: 'Measuring circuit loads, earthing continuity, and breaker sizing before wiring.',
  },
  {
    step: '02',
    title: 'Conduit, DB & Insulated Termination',
    detail: 'Clean PVC conduit routing, color-coded wiring, and insulated safety termination.',
  },
  {
    step: '03',
    title: 'Voltage Testing & Handover',
    detail: 'Full load testing, protection relay verification, and 24-hour emergency support.',
  },
];

export function GallerySection({ onBookSimilar }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryId>('all');
  const [uploadedPhotos, setUploadedPhotos] = useState<GalleryPhoto[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(UPLOADED_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Upload form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadCategory, setUploadCategory] = useState<GalleryCategoryId>('solar');
  const [uploadPreview, setUploadPreview] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');

  const allPhotos = useMemo(
    () => [...uploadedPhotos, ...INITIAL_GALLERY_PHOTOS],
    [uploadedPhotos]
  );

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return allPhotos;
    return allPhotos.filter((photo) => photo.categories.includes(activeCategory));
  }, [activeCategory, allPhotos]);

  const currentCategoryMeta = useMemo(
    () => GALLERY_CATEGORIES.find((c) => c.id === activeCategory) ?? GALLERY_CATEGORIES[0],
    [activeCategory]
  );

  // Keyboard controls for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, or WebP).');
      return;
    }
    if (file.size > 2.5 * 1024 * 1024) {
      setUploadError('Please select an image smaller than 2.5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUploadPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadPreview) {
      setUploadError('Please choose an image file to upload.');
      return;
    }
    if (!uploadTitle.trim()) {
      setUploadError('Please enter a title for the company photo.');
      return;
    }

    const newPhoto: GalleryPhoto = {
      id: `uploaded-${Date.now()}`,
      title: uploadTitle.trim(),
      caption:
        uploadCaption.trim() ||
        'Authentic company installation uploaded from business project records.',
      categories: [uploadCategory],
      src: uploadPreview,
      alt: uploadTitle.trim(),
      objectPosition: '50% 50%',
      aspect: 'standard',
      specs: 'Verified Company Upload',
      sourceLabel: 'Added by Business Owner',
      isUserUploaded: true,
    };

    const next = [newPhoto, ...uploadedPhotos];
    setUploadedPhotos(next);
    try {
      window.localStorage.setItem(UPLOADED_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // If quota exceeded, keep in memory for current session
    }

    setUploadTitle('');
    setUploadCaption('');
    setUploadPreview('');
    setUploadError('');
    setUploadModalOpen(false);
    setActiveCategory(uploadCategory);
  };

  const activeLightboxPhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] ?? null : null;

  // Dynamic grid layout class per category layoutStyle
  const gridContainerClass = useMemo(() => {
    switch (currentCategoryMeta.layoutStyle) {
      case 'wide':
        return 'grid grid-cols-1 gap-6 lg:grid-cols-2';
      case 'technical':
      case 'detail':
        return 'grid grid-cols-1 gap-6 md:grid-cols-2';
      case 'process':
      case 'maintenance':
        return 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3';
      case 'grid':
      case 'masonry':
      default:
        return 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3';
    }
  }, [currentCategoryMeta.layoutStyle]);

  return (
    <section
      id="gallery"
      className="border-b border-[#E2E8F0] bg-[#EFF6FF]/70 py-16 transition-colors duration-200 sm:py-20 dark:border-[#26364D] dark:bg-[#111C2E]/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Google Business Profile Actions */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#0D9488] dark:text-[#2DD4BF]">
              Authentic Company Gallery
            </p>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-[#0F2B46] sm:text-4xl dark:text-[#F8FAFC]">
              Real Technical Installations &amp; Service Portfolio
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
              Explore verified company visuals organized across all 10 engineering categories.
              Additional project photographs are hosted directly on our official Google Business
              Profile.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={COMPANY_INFO.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-[#2563EB] bg-[#FFFFFF] px-4 py-2.5 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#2563EB] hover:text-white dark:border-[#60A5FA] dark:bg-[#17263B] dark:text-[#60A5FA] dark:hover:bg-[#2563EB] dark:hover:text-white"
            >
              View Google Business Photos
              <ExternalLink className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-4 py-2.5 text-sm font-semibold text-[#0F2B46] transition-colors hover:border-[#2563EB] hover:text-[#2563EB] dark:border-[#26364D] dark:bg-[#17263B] dark:text-[#F8FAFC] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA]"
            >
              <Plus className="h-4 w-4" />
              Add Company Photo
            </button>
          </div>
        </div>

        {/* 10-Category Interactive Filter Bar */}
        <div
          role="tablist"
          aria-label="Gallery Categories"
          className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"
        >
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setLightboxIndex(null);
                }}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  isActive
                    ? 'bg-[#0F2B46] text-white shadow-sm dark:bg-[#2563EB] dark:text-white'
                    : 'border border-[#E2E8F0] bg-[#FFFFFF] text-[#475569] hover:border-[#2563EB]/50 hover:text-[#0F2B46] dark:border-[#26364D] dark:bg-[#111C2E] dark:text-[#B8C5D6] dark:hover:border-[#60A5FA]/50 dark:hover:text-[#F8FAFC]'
                }`}
              >
                {cat.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Active Category Description Strip */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4 dark:border-[#26364D]">
          <div>
            <h3 className="font-display text-lg font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
              {currentCategoryMeta.label}
            </h3>
            <p className="text-sm text-[#475569] dark:text-[#B8C5D6]">
              {currentCategoryMeta.description}
            </p>
          </div>
          <p className="font-mono-num text-xs font-medium text-[#475569] dark:text-[#B8C5D6]">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'item' : 'items'} shown
          </p>
        </div>

        {/* Category-Specific Contextual Module: Solar Before/After Comparison */}
        {activeCategory === 'solar' && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {SOLAR_COMPARISON_METRICS.map((block, idx) => (
              <div
                key={block.label}
                className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#17263B]"
              >
                <p
                  className={`text-xs font-semibold ${
                    idx === 1
                      ? 'text-[#0D9488] dark:text-[#2DD4BF]'
                      : 'text-[#B45309] dark:text-[#FBBF24]'
                  }`}
                >
                  {block.tag}
                </p>
                <h4 className="mt-1 font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                  {block.label}
                </h4>
                <ul className="mt-3 space-y-1.5 text-sm text-[#475569] dark:text-[#B8C5D6]">
                  {block.items.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span aria-hidden="true" className="font-bold text-[#2563EB] dark:text-[#60A5FA]">
                        ·
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Category-Specific Contextual Module: Electrical Installation Process */}
        {activeCategory === 'electrical' && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {ELECTRICAL_PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#17263B]"
              >
                <p className="font-mono-num text-xs font-semibold text-[#F59E0B] dark:text-[#FBBF24]">
                  Step {item.step}
                </p>
                <h4 className="mt-1 font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-sm text-[#475569] dark:text-[#B8C5D6]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Category-Specific Contextual Module: Networking & IT Infrastructure */}
        {activeCategory === 'networking' && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#17263B]">
              <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                Optical Distribution
              </p>
              <h4 className="mt-1 font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                ODF Splice Tray Assembly
              </h4>
              <p className="mt-1.5 text-sm text-[#475569] dark:text-[#B8C5D6]">
                Precision fusion splicing, pigtail routing, and SC/APC patch panel termination.
              </p>
            </div>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#17263B]">
              <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                Structured Cabling
              </p>
              <h4 className="mt-1 font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                Cat6 / Cat6A Rack Dressing
              </h4>
              <p className="mt-1.5 text-sm text-[#475569] dark:text-[#B8C5D6]">
                Labeled commercial patch panels, managed switches, and PoE camera backhaul.
              </p>
            </div>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#17263B]">
              <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                Verification
              </p>
              <h4 className="mt-1 font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                Link Continuity &amp; Wi-Fi Audit
              </h4>
              <p className="mt-1.5 text-sm text-[#475569] dark:text-[#B8C5D6]">
                Signal attenuation checks and multi-floor enterprise wireless coverage tuning.
              </p>
            </div>
          </div>
        )}

        {/* Category-Specific Contextual Module: Air Conditioning & HVAC */}
        {activeCategory === 'ac' && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#17263B]">
              <p className="text-xs font-semibold text-[#0D9488] dark:text-[#2DD4BF]">
                Installation
              </p>
              <h4 className="mt-1 font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                Split &amp; DC Inverter Mounting
              </h4>
              <p className="mt-1.5 text-sm text-[#475569] dark:text-[#B8C5D6]">
                Insulated copper piping, vacuum purging, and clean drain line routing.
              </p>
            </div>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#17263B]">
              <p className="text-xs font-semibold text-[#0D9488] dark:text-[#2DD4BF]">
                Maintenance
              </p>
              <h4 className="mt-1 font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                Deep Pressure Jet Cleaning
              </h4>
              <p className="mt-1.5 text-sm text-[#475569] dark:text-[#B8C5D6]">
                Indoor evaporator coil wash, blower sanitization, and outdoor condenser flush.
              </p>
            </div>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#17263B]">
              <p className="text-xs font-semibold text-[#0D9488] dark:text-[#2DD4BF]">
                Repair &amp; Charging
              </p>
              <h4 className="mt-1 font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                Gas Refill &amp; PCB Diagnostics
              </h4>
              <p className="mt-1.5 text-sm text-[#475569] dark:text-[#B8C5D6]">
                Leak pressure testing, R410A/R32 refrigerant charging, and inverter board repair.
              </p>
            </div>
          </div>
        )}

        {/* Category-Specific Contextual Module: Electronics & Technical Repairs */}
        {activeCategory === 'electronics' && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#17263B]">
              <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                Inverter &amp; UPS Bench
              </p>
              <h4 className="mt-1 font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                Component-Level Diagnostics &amp; Calibration
              </h4>
              <p className="mt-1.5 text-sm text-[#475569] dark:text-[#B8C5D6]">
                MOSFET/IGBT stage testing, MPPT controller servicing, and output voltage calibration for Growatt, Maxpower, Invex, and UPS systems.
              </p>
            </div>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 dark:border-[#26364D] dark:bg-[#17263B]">
              <p className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                Power Protection
              </p>
              <h4 className="mt-1 font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                Relay, Surge &amp; Load Verification
              </h4>
              <p className="mt-1.5 text-sm text-[#475569] dark:text-[#B8C5D6]">
                Under/over-voltage protector calibration, thermal inspection, and battery backup load testing before re-commissioning.
              </p>
            </div>
          </div>
        )}

        {/* Responsive Photo Gallery Grid */}
        <div className={`mt-8 ${gridContainerClass}`}>
          {filteredPhotos.map((photo, index) => {
            const isWide = currentCategoryMeta.layoutStyle === 'wide';
            return (
              <figure
                key={photo.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] transition-all duration-200 hover:border-[#2563EB]/50 dark:border-[#26364D] dark:bg-[#111C2E] dark:hover:border-[#60A5FA]/50"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Inspect ${photo.title} in lightbox`}
                  className={`relative block w-full overflow-hidden bg-[#F8FAFC] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB] dark:bg-[#17263B] ${
                    isWide ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <SafeImage
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    fallbackTitle={photo.title}
                    style={{ objectPosition: photo.objectPosition ?? '50% 50%' }}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2B46]/65 via-transparent to-transparent opacity-80 transition-opacity duration-200 group-hover:opacity-95" />
                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F2B46]/75 text-white opacity-90 transition-transform duration-150 group-hover:scale-105">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-xs font-medium text-[#E2E8F0]">
                      {photo.sourceLabel}
                    </p>
                  </div>
                </button>

                <figcaption className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h4 className="font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                      {photo.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#475569] dark:text-[#B8C5D6]">
                      {photo.caption}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-3 text-xs text-[#475569] dark:border-[#26364D] dark:text-[#B8C5D6]">
                    <span className="truncate">{photo.specs}</span>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="shrink-0 font-semibold text-[#2563EB] hover:underline dark:text-[#60A5FA]"
                    >
                      Inspect
                    </button>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxPhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxPhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1220]/90 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#26364D] bg-[#FFFFFF] shadow-2xl dark:bg-[#111C2E]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-3.5 dark:border-[#26364D]">
              <div className="min-w-0">
                <p className="truncate font-display text-base font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                  {activeLightboxPhoto.title}
                </p>
                <p className="font-mono-num text-xs text-[#475569] dark:text-[#B8C5D6]">
                  Photo {lightboxIndex + 1} of {filteredPhotos.length} ·{' '}
                  {activeLightboxPhoto.sourceLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#0F2B46] transition-colors hover:bg-[#EFF6FF] dark:border-[#26364D] dark:text-[#F8FAFC] dark:hover:bg-[#17263B]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image Stage */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#F8FAFC] p-4 dark:bg-[#0B1220]">
              <img
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.alt}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-auto max-w-full rounded-lg object-contain"
              />

              {filteredPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                      )
                    }
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#FFFFFF]/95 text-[#0F2B46] shadow-sm transition-colors hover:bg-[#EFF6FF] dark:border-[#26364D] dark:bg-[#111C2E]/95 dark:text-[#F8FAFC] dark:hover:bg-[#17263B]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)
                    }
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#FFFFFF]/95 text-[#0F2B46] shadow-sm transition-colors hover:bg-[#EFF6FF] dark:border-[#26364D] dark:bg-[#111C2E]/95 dark:text-[#F8FAFC] dark:hover:bg-[#17263B]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption & Action Footer */}
            <div className="flex flex-col justify-between gap-4 border-t border-[#E2E8F0] px-5 py-4 sm:flex-row sm:items-center dark:border-[#26364D]">
              <div className="max-w-2xl">
                <p className="text-sm leading-relaxed text-[#0F172A] dark:text-[#F8FAFC]">
                  {activeLightboxPhoto.caption}
                </p>
                <p className="mt-1 text-xs text-[#475569] dark:text-[#B8C5D6]">
                  {activeLightboxPhoto.specs}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const title = activeLightboxPhoto.title;
                  setLightboxIndex(null);
                  onBookSimilar(title);
                }}
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#F59E0B] px-4 py-2.5 text-sm font-bold text-[#0F172A] transition-colors hover:bg-[#D97706] hover:text-white dark:bg-[#FBBF24] dark:text-[#0B1220]"
              >
                Book Similar Work
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Authentic Company Photo Modal */}
      {uploadModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Add Authentic Company Photo"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1220]/80 p-4 backdrop-blur-sm"
          onClick={() => setUploadModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-xl dark:border-[#26364D] dark:bg-[#111C2E]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 dark:border-[#26364D]">
              <div>
                <h3 className="font-display text-lg font-bold text-[#0F2B46] dark:text-[#F8FAFC]">
                  Add Company Project Photo
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#B8C5D6]">
                  Upload authentic installation photos from your device or Google Business Profile.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                aria-label="Close upload dialog"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#0F2B46] hover:bg-[#EFF6FF] dark:border-[#26364D] dark:text-[#F8FAFC] dark:hover:bg-[#17263B]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                  Select Photograph
                </label>
                <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-6 text-center transition-colors hover:border-[#2563EB] dark:border-[#26364D] dark:bg-[#17263B] dark:hover:border-[#60A5FA]">
                  {uploadPreview ? (
                    <img
                      src={uploadPreview}
                      alt="Upload preview"
                      className="max-h-40 rounded-lg object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-[#2563EB] dark:text-[#60A5FA]" />
                      <span className="mt-2 text-sm font-medium text-[#0F2B46] dark:text-[#F8FAFC]">
                        Choose an image file
                      </span>
                      <span className="mt-0.5 text-xs text-[#475569] dark:text-[#B8C5D6]">
                        PNG, JPG, or WebP up to 2.5 MB
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              </div>

              <div>
                <label
                  htmlFor="upload-title"
                  className="block text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]"
                >
                  Photo Title
                </label>
                <input
                  id="upload-title"
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g., 10kW Hybrid Solar Inverter Setup"
                  className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                />
              </div>

              <div>
                <label
                  htmlFor="upload-category"
                  className="block text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]"
                >
                  Gallery Category
                </label>
                <select
                  id="upload-category"
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as GalleryCategoryId)}
                  className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                >
                  {GALLERY_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="upload-caption"
                  className="block text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]"
                >
                  Technical Caption
                </label>
                <textarea
                  id="upload-caption"
                  rows={2}
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  placeholder="Briefly describe the equipment or installation completed."
                  className="mt-1.5 w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-[#26364D] dark:bg-[#0B1220] dark:text-[#F8FAFC] dark:focus:border-[#60A5FA]"
                />
              </div>

              {uploadError && (
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  {uploadError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="rounded-lg border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] dark:border-[#26364D] dark:text-[#B8C5D6] dark:hover:bg-[#17263B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8]"
                >
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
