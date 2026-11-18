const ASSET_BASE = `${import.meta.env.BASE_URL}assets/aistudio/`;

export const COMPANY_INFO = {
  brandName: 'All In One Solution',
  divisionName: 'Engineering Works',
  googleProfileUrl: 'https://share.google/QGallxiS8ATxY87D7',
  whatsappNumber: '923359892741',
  whatsappDisplay: '0335-9892741',
  contacts: [
    {
      name: 'Engr. Imtiaz Khan',
      role: 'Lead Electrical & Solar Engineer',
      phone: '0300-5934412',
      telHref: 'tel:+923005934412',
      whatsappHref: 'https://wa.me/923005934412',
    },
    {
      name: 'M. Kashif Khan',
      role: 'Technical Operations & Client Support',
      phone: '0335-9892741',
      telHref: 'tel:+923359892741',
      whatsappHref: 'https://wa.me/923359892741',
    },
  ],
  logoSrc: ASSET_BASE + 'eng_83d763a8.png',
  heroBannerSrc: ASSET_BASE + 'serv2_3d091b79.png',
  servicesPosterSrc: ASSET_BASE + 'serv1_d91da994.png',
  electricalBannerSrc: ASSET_BASE + 'serv_3dd6fbac.png',
};

export type ServiceAccent = 'blue' | 'orange' | 'teal';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  categoryLabel: string;
  accent: ServiceAccent;
  summary: string;
  deliverables: string[];
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  responseNote: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'solar-energy',
    number: '01',
    title: 'Solar Energy & Hybrid Inverters',
    categoryLabel: 'Energy Systems',
    accent: 'orange',
    summary:
      'Complete rooftop solar panel arrays, hybrid and on-grid inverter commissioning, battery bank integration, and long-term performance maintenance.',
    deliverables: [
      'Rooftop solar panel design & structural mounting',
      'Growatt, Inverex & Maxpower inverter installation',
      'AC/DC surge protection & earthing compliance',
      'Solar inverter diagnostics, repair & cleaning',
    ],
    imageSrc: ASSET_BASE + 'serv2_3d091b79.png',
    imageAlt: 'Engineering Works technicians installing hybrid solar inverters and photovoltaic panels',
    imageClassName: 'object-cover object-center',
    responseNote: 'Residential & Commercial kW Systems',
  },
  {
    id: 'electrical-systems',
    number: '02',
    title: 'Electrical Installation & Maintenance',
    categoryLabel: 'Power & Wiring',
    accent: 'orange',
    summary:
      'Safe, code-compliant house and office wiring, distribution board assembly, load balancing, fault tracing, and 24-hour emergency electrical support.',
    deliverables: [
      'House, commercial & office concealed wiring',
      'Main distribution board (DB) & breaker setup',
      'UPS backup wiring & voltage protection',
      '24-hour emergency fault troubleshooting',
    ],
    imageSrc: ASSET_BASE + 'serv_3dd6fbac.png',
    imageAlt: 'Engineering Works professional electrical socket wiring and safety testing',
    imageClassName: 'object-cover object-bottom',
    responseNote: '24-Hour Emergency Dispatch Available',
  },
  {
    id: 'networking-it',
    number: '03',
    title: 'Networking, Fiber Optics & IT Infrastructure',
    categoryLabel: 'Technology & Telecom',
    accent: 'blue',
    summary:
      'Precision optical fiber splicing, ODF tray termination, structured Cat6/Cat6A cabling, server racks, and dependable commercial Wi-Fi networks.',
    deliverables: [
      'Precision fiber optic splicing & ODF enclosure setup',
      'Structured LAN cabling & network rack dressing',
      'Enterprise switches, routers & multi-floor Wi-Fi',
      'Link testing, attenuation verification & troubleshooting',
    ],
    imageSrc: ASSET_BASE + 'serv1_d91da994.png',
    imageAlt: 'Precision fiber optic splice enclosure and telecom termination workbench',
    imageClassName: 'object-cover object-[12%_88%]',
    responseNote: 'Precision Fiber & Structured Cabling',
  },
  {
    id: 'cctv-security',
    number: '04',
    title: 'CCTV & Security Installations',
    categoryLabel: 'Security & Reliability',
    accent: 'teal',
    summary:
      'High-definition IP and analog surveillance systems engineered for clear day/night perimeter monitoring, NVR storage, and secure mobile remote viewing.',
    deliverables: [
      'Indoor & weatherproof outdoor IP/HD camera mounting',
      'NVR/DVR configuration with redundant storage',
      'Mobile app remote viewing & motion alerts',
      'Perimeter cabling & camera maintenance',
    ],
    imageSrc: ASSET_BASE + 'serv_3dd6fbac.png',
    imageAlt: 'Weatherproof outdoor CCTV bullet security camera installation',
    imageClassName: 'object-cover object-right-bottom',
    responseNote: 'HD & IP Surveillance Solutions',
  },
  {
    id: 'ac-hvac',
    number: '05',
    title: 'Air Conditioning & HVAC Services',
    categoryLabel: 'Climate & Maintenance',
    accent: 'teal',
    summary:
      'Inverter and split air conditioner installation, deep chemical jet cleaning, refrigerant gas charging, PCB troubleshooting, and seasonal preventive care.',
    deliverables: [
      'Split & DC inverter AC installation and relocation',
      'Complete AC repair, compressor & PCB diagnostics',
      'Refrigerant gas charging & leak pressure testing',
      'Deep pressure cleaning & annual maintenance plans',
    ],
    imageSrc: ASSET_BASE + 'serv1_d91da994.png',
    imageAlt: 'Engineering Works complete AC, solar, and electrical service portfolio',
    imageClassName: 'object-cover object-top',
    responseNote: 'Split, Inverter & Commercial AC Units',
  },
  {
    id: 'electronics-repair',
    number: '06',
    title: 'Electronics, Inverter & UPS Technical Repairs',
    categoryLabel: 'Diagnostics & Repair',
    accent: 'blue',
    summary:
      'Component-level bench diagnostics and repair for solar inverters, pure sine-wave UPS systems, power supplies, and commercial electronic control boards.',
    deliverables: [
      'Solar hybrid & off-grid inverter board repair',
      'UPS troubleshooting, calibration & battery testing',
      'Voltage regulator & protection relay servicing',
      'Preventive thermal & load inspection',
    ],
    imageSrc: ASSET_BASE + 'serv1_d91da994.png',
    imageAlt: 'Wall-mounted Growatt and hybrid inverter systems with live voltage monitoring',
    imageClassName: 'object-cover object-[88%_26%]',
    responseNote: 'Bench-Level Electronic Diagnostics',
  },
];

export type GalleryCategoryId =
  | 'all'
  | 'cctv'
  | 'networking'
  | 'solar'
  | 'ac'
  | 'electrical'
  | 'electronics'
  | 'commercial'
  | 'residential'
  | 'equipment'
  | 'team';

export interface GalleryCategory {
  id: GalleryCategoryId;
  label: string;
  shortLabel: string;
  layoutStyle: 'masonry' | 'grid' | 'wide' | 'technical' | 'process' | 'maintenance' | 'detail';
  description: string;
  accent: ServiceAccent;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: 'all',
    label: 'All Company Photos',
    shortLabel: 'All',
    layoutStyle: 'masonry',
    description: 'Verified company visuals, installations, equipment boards, and technical divisions.',
    accent: 'blue',
  },
  {
    id: 'cctv',
    label: 'CCTV & Security Installations',
    shortLabel: 'CCTV & Security',
    layoutStyle: 'grid',
    description: 'Surveillance camera installations, perimeter monitoring, and security system integration.',
    accent: 'teal',
  },
  {
    id: 'networking',
    label: 'Networking & IT Infrastructure',
    shortLabel: 'Networking & IT',
    layoutStyle: 'technical',
    description: 'Precision fiber optic splicing, ODF trays, and structured telecom termination.',
    accent: 'blue',
  },
  {
    id: 'solar',
    label: 'Solar Installations',
    shortLabel: 'Solar',
    layoutStyle: 'wide',
    description: 'Rooftop solar arrays, Growatt & hybrid inverter setups, and clean energy integration.',
    accent: 'orange',
  },
  {
    id: 'ac',
    label: 'Air Conditioning & HVAC',
    shortLabel: 'AC & HVAC',
    layoutStyle: 'maintenance',
    description: 'Split and inverter AC installation, gas charging, cleaning, and preventive maintenance.',
    accent: 'teal',
  },
  {
    id: 'electrical',
    label: 'Electrical Installation & Maintenance',
    shortLabel: 'Electrical',
    layoutStyle: 'process',
    description: 'Distribution board wiring, socket termination, safety testing, and 24-hour fault response.',
    accent: 'orange',
  },
  {
    id: 'electronics',
    label: 'Electronics & Technical Repairs',
    shortLabel: 'Electronics & Repair',
    layoutStyle: 'detail',
    description: 'Solar inverter servicing, UPS diagnostics, and precision electronic troubleshooting.',
    accent: 'blue',
  },
  {
    id: 'commercial',
    label: 'Commercial Projects',
    shortLabel: 'Commercial',
    layoutStyle: 'wide',
    description: 'Integrated power, security, solar, and networking infrastructure for offices and facilities.',
    accent: 'blue',
  },
  {
    id: 'residential',
    label: 'Residential Projects',
    shortLabel: 'Residential',
    layoutStyle: 'grid',
    description: 'Complete home electrical wiring, rooftop solar, AC servicing, and residential CCTV.',
    accent: 'orange',
  },
  {
    id: 'equipment',
    label: 'Equipment & Products',
    shortLabel: 'Equipment',
    layoutStyle: 'detail',
    description: 'Growatt, Maxpower & Invex inverters, ODF fiber trays, breakers, and CCTV hardware.',
    accent: 'blue',
  },
  {
    id: 'team',
    label: 'Team & Technical Work',
    shortLabel: 'Team & Work',
    layoutStyle: 'masonry',
    description: 'Our certified engineering team executing safe, standards-driven technical installations.',
    accent: 'teal',
  },
];

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  categories: GalleryCategoryId[];
  src: string;
  alt: string;
  objectPosition?: string;
  aspect?: 'wide' | 'square' | 'tall' | 'standard';
  specs: string;
  sourceLabel: string;
  isUserUploaded?: boolean;
}

export const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'real-inverter-wall',
    title: 'Multi-Inverter Solar Control Board',
    caption:
      'Wall-mounted Growatt and hybrid solar inverter array with neat PVC conduit routing, protection breakers, and live digital AC voltage display (229V).',
    categories: ['solar', 'electronics', 'equipment', 'commercial', 'residential'],
    src: ASSET_BASE + 'serv1_d91da994.png',
    alt: 'Real mounted Growatt and hybrid solar inverter wall installation',
    objectPosition: '85% 25%',
    aspect: 'wide',
    specs: 'Growatt & Hybrid Inverters · Conduit Routing · Voltage Meter',
    sourceLabel: 'Company Portfolio Asset',
  },
  {
    id: 'real-fiber-odf',
    title: 'Precision Fiber Optic Splice Enclosure (ODF)',
    caption:
      'Optical fiber splice tray assembly with organized pigtail routing, SC/APC couplers, and field termination tools during a telecom installation.',
    categories: ['networking', 'commercial', 'equipment', 'team'],
    src: ASSET_BASE + 'serv1_d91da994.png',
    alt: 'Real fiber optic splice enclosure tray with orange fiber cable and tools',
    objectPosition: '15% 84%',
    aspect: 'standard',
    specs: 'Fiber Optic Splicing · ODF Patch Tray · Telecom Grade',
    sourceLabel: 'Company Portfolio Asset',
  },
  {
    id: 'complete-solutions-workshop',
    title: 'Engineering Works — Integrated Technical Operations',
    caption:
      'Full-scope engineering capability spanning Growatt, Maxpower & Invex inverters, distribution panel wiring, CCTV security mounting, fiber splicing, and solar arrays.',
    categories: ['solar', 'commercial', 'electrical', 'networking', 'cctv', 'team', 'equipment'],
    src: ASSET_BASE + 'serv2_3d091b79.png',
    alt: 'Engineering Works complete solar, inverter, CCTV, electrical, and fiber optic operations',
    objectPosition: '50% 50%',
    aspect: 'wide',
    specs: 'Solar · Inverters · CCTV · Fiber · Distribution Boards',
    sourceLabel: 'Official Company Visual',
  },
  {
    id: 'electrical-cctv-service',
    title: 'Insulated Electrical Wiring & CCTV Security Setup',
    caption:
      'Safe live-circuit socket termination using insulated protective gloves alongside weatherproof IR bullet CCTV camera integration and 24-hour emergency support.',
    categories: ['electrical', 'cctv', 'residential', 'team', 'ac'],
    src: ASSET_BASE + 'serv_3dd6fbac.png',
    alt: 'Electrical socket wiring with insulated gloves and outdoor bullet CCTV camera',
    objectPosition: '60% 80%',
    aspect: 'wide',
    specs: '24/7 Emergency Electrical · IR Bullet CCTV · Safety First',
    sourceLabel: 'Official Company Banner',
  },
  {
    id: 'complete-service-overview',
    title: 'Complete Electrical, Electronic, AC & Solar Portfolio',
    caption:
      'Overview of our residential rooftop solar installations, inverter walls, fiber optic telecom enclosures, AC repair & cleaning, and electrical security services.',
    categories: ['solar', 'ac', 'electrical', 'electronics', 'residential', 'cctv', 'networking'],
    src: ASSET_BASE + 'serv1_d91da994.png',
    alt: 'Engineering Works complete electrical, electronic, AC, and solar solutions poster',
    objectPosition: '50% 50%',
    aspect: 'tall',
    specs: 'Solar · AC Maintenance · UPS & Inverter Repair · Fiber · CCTV',
    sourceLabel: 'Official Company Poster',
  },
  {
    id: 'rooftop-solar-residential',
    title: 'Residential Rooftop Solar Array Architecture',
    caption:
      'Pitched-roof photovoltaic panel layout engineered for clean residential aesthetics, optimal solar yield, and reliable hybrid inverter integration.',
    categories: ['solar', 'residential', 'equipment'],
    src: ASSET_BASE + 'serv1_d91da994.png',
    alt: 'Residential rooftop solar panel installation showcase',
    objectPosition: '20% 28%',
    aspect: 'standard',
    specs: 'Residential PV Array · High-Efficiency Panels · Clean Mounting',
    sourceLabel: 'Company Portfolio Asset',
  },
  {
    id: 'company-brand-emblem',
    title: 'Engineering Works — Official Brand Identity',
    caption:
      'Representing disciplined electrical, solar, IT, and mechanical engineering services led by Engr. Imtiaz Khan and M. Kashif Khan.',
    categories: ['team', 'commercial', 'ac', 'electronics'],
    src: ASSET_BASE + 'eng_83d763a8.png',
    alt: 'Engineering Works official navy and orange logo emblem',
    objectPosition: '50% 50%',
    aspect: 'square',
    specs: 'Engr. Imtiaz Khan · M. Kashif Khan · One Trusted Team',
    sourceLabel: 'Official Company Logo',
  },
];

export interface ComparisonRow {
  capability: string;
  residential: string;
  commercial: string;
  division: ServiceAccent;
}

export const SERVICE_COMPARISON_ROWS: ComparisonRow[] = [
  {
    capability: 'Electrical Wiring & DBs',
    residential: 'Home wiring, earthing, breaker upgrades & UPS lines',
    commercial: '3-phase distribution panels, load balancing & office cabling',
    division: 'orange',
  },
  {
    capability: 'Solar & Inverter Systems',
    residential: '3kW–15kW hybrid & net-metering rooftop setups',
    commercial: '20kW+ commercial arrays, multi-inverter parallel racks',
    division: 'orange',
  },
  {
    capability: 'CCTV & Perimeter Security',
    residential: '4–8 HD/IP cameras with smartphone live monitoring',
    commercial: '16–64+ IP camera NVR networks & access control',
    division: 'teal',
  },
  {
    capability: 'Networking & Fiber Optics',
    residential: 'Whole-home mesh Wi-Fi & clean Cat6 room outlets',
    commercial: 'Fiber optic ODF splicing, server racks & managed switches',
    division: 'blue',
  },
  {
    capability: 'Air Conditioning & HVAC',
    residential: 'Split/inverter AC installation, gas refill & jet wash',
    commercial: 'Multi-unit office AC maintenance contracts & diagnostics',
    division: 'teal',
  },
  {
    capability: 'Emergency & SLA Support',
    residential: 'Same-day troubleshooting & 24-hour emergency callout',
    commercial: 'Scheduled preventive audits & priority technical dispatch',
    division: 'blue',
  },
];

export const SOLAR_COMPARISON_METRICS = [
  {
    label: 'Unoptimized Grid-Only Setup',
    tag: 'Before Engineering Upgrade',
    items: [
      'Full exposure to peak utility tariffs and load-shedding',
      'Unbalanced electrical load causing frequent breaker trips',
      'No surge protection or real-time AC voltage visibility',
    ],
  },
  {
    label: 'Hybrid Solar + Clean DB Architecture',
    tag: 'After Engineering Works Installation',
    items: [
      'Seamless solar + grid switching via Growatt / Inverex inverters',
      'Dedicated AC/DC protection breakers with clean conduit routing',
      'Continuous 229V regulated output for ACs, IT racks & appliances',
    ],
  },
];
