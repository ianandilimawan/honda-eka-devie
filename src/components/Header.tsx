'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="https://www.astra-honda.com/assets/images/logo/honda.svg" 
              alt="Honda" 
              className="h-8 lg:h-10"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/products" className="text-gray-800 hover:text-[#e31837] font-semibold text-sm transition-colors">
              Produk
            </Link>
            <Link href="/products?category=sport" className="text-gray-800 hover:text-[#e31837] font-semibold text-sm transition-colors">
              Sport
            </Link>
            <Link href="/products?category=scooter" className="text-gray-800 hover:text-[#e31837] font-semibold text-sm transition-colors">
              Scooter
            </Link>
            <Link href="/products?category=matic" className="text-gray-800 hover:text-[#e31837] font-semibold text-sm transition-colors">
              Matic
            </Link>
            <Link href="/products?category=bebek" className="text-gray-800 hover:text-[#e31837] font-semibold text-sm transition-colors">
              Bebek
            </Link>
            <Link href="/blog" className="text-gray-800 hover:text-[#e31837] font-semibold text-sm transition-colors">
              Blog
            </Link>
          </nav>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-3">
              <Link 
                href="/products" 
                className="text-gray-800 hover:text-[#e31837] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Produk
              </Link>
              <Link 
                href="/products?category=sport" 
                className="text-gray-800 hover:text-[#e31837] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sport
              </Link>
              <Link 
                href="/products?category=scooter" 
                className="text-gray-800 hover:text-[#e31837] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Scooter
              </Link>
              <Link 
                href="/products?category=matic" 
                className="text-gray-800 hover:text-[#e31837] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Matic
              </Link>
              <Link 
                href="/products?category=bebek" 
                className="text-gray-800 hover:text-[#e31837] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bebek
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-800 hover:text-[#e31837] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}