import React, { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { COMPANY_INFO } from '../data/siteData';

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Book Service', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onBookClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-[#FFFFFF]/95 backdrop-blur-md transition-colors duration-200 dark:border-[#26364D] dark:bg-[#0B1220]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg"
        >
          <img
            src={COMPANY_INFO.logoSrc}
            alt="All In One Solution Engineering Works Logo"
            referrerPolicy="no-referrer"
            className="h-9 w-9 rounded-lg bg-white object-contain p-0.5 ring-1 ring-[#E2E8F0] dark:ring-[#26364D]"
          />
          <span className="font-display text-lg font-bold tracking-tight text-[#0F2B46] dark:text-[#F8FAFC]">
            {COMPANY_INFO.brandName}
          </span>
        </a>

        {/* Zone 2: Primary navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 text-sm font-medium text-[#475569] underline-offset-4 transition-colors duration-150 hover:text-[#2563EB] hover:underline dark:text-[#B8C5D6] dark:hover:text-[#60A5FA]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Theme Toggle + Primary Action */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F2B46] transition-all duration-200 hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-[#26364D] dark:bg-[#111C2E] dark:text-[#FBBF24] dark:hover:border-[#60A5FA] dark:hover:bg-[#17263B]"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 transition-transform duration-200 rotate-0 scale-100" />
              ) : (
                <Moon className="h-5 w-5 transition-transform duration-200 rotate-0 scale-100" />
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={onBookClick}
            className="hidden shrink-0 whitespace-nowrap rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 sm:inline-flex dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] dark:focus-visible:ring-offset-[#0B1220]"
          >
            Book a Service
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] text-[#0F2B46] transition-colors md:hidden dark:border-[#26364D] dark:bg-[#111C2E] dark:text-[#F8FAFC]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#E2E8F0] bg-[#FFFFFF] px-4 py-4 md:hidden dark:border-[#26364D] dark:bg-[#111C2E]">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav(link.href);
                }}
                className="rounded-lg px-3 py-3 text-base font-medium text-[#0F172A] transition-colors hover:bg-[#EFF6FF] hover:text-[#2563EB] dark:text-[#F8FAFC] dark:hover:bg-[#17263B] dark:hover:text-[#60A5FA]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 border-t border-[#E2E8F0] pt-4 dark:border-[#26364D]">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookClick();
              }}
              className="w-full rounded-lg bg-[#F59E0B] px-4 py-3 text-center text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#D97706] dark:bg-[#FBBF24] dark:text-[#0B1220]"
            >
              Book a Service Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
