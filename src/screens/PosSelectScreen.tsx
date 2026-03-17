import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOutletAccessPoints, MenuFetchError, type OutletInfo } from '../services/api';

function getBrandSlug(): string | null {
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const params = new URLSearchParams(window.location.search);
    return params.get('brand') || import.meta.env.VITE_DEV_BRAND || null;
  }
  const parts = hostname.split('.');
  if (parts.length >= 3) return parts[0];
  return null;
}

export default function PosSelectScreen() {
  const { outletSlug } = useParams<{ outletSlug: string }>();
  const navigate = useNavigate();
  const brandSlug = getBrandSlug();

  const [data, setData] = useState<OutletInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!brandSlug || !outletSlug) {
        setError('Invalid URL. Please scan a valid QR code.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await fetchOutletAccessPoints(brandSlug, outletSlug);

        if (cancelled) return;

        // Single access point → auto-redirect
        if (result.accessPoints.length === 1) {
          const ap = result.accessPoints[0];
          navigate(`/${outletSlug}/${ap.slug}${window.location.search}`, { replace: true });
          return;
        }

        setData(result);

        if (result.brand?.name) {
          document.title = result.brand.name;
        }
      } catch (err) {
        if (cancelled) return;
        if (err instanceof MenuFetchError) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [brandSlug, outletSlug, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-3 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
          <p className="font-inter text-[14px] text-brand-muted">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 max-w-[320px] text-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#C76A3A" strokeWidth="2" />
            <line x1="24" y1="14" x2="24" y2="28" stroke="#C76A3A" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="24" cy="34" r="1.5" fill="#C76A3A" />
          </svg>
          <h2 className="font-playfair font-semibold text-[22px] text-brand-brown">
            Outlet Not Found
          </h2>
          <p className="font-inter text-[14px] text-brand-muted leading-relaxed">
            {error || 'Unable to load outlet information.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-8 py-3 bg-brand-accent text-white rounded-full font-inter font-medium text-[14px] cursor-pointer border-0 shadow-[0_4px_16px_rgba(199,106,58,0.35)]"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { outlet, brand, accessPoints } = data;

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center">
      {/* Header */}
      <header className="flex flex-col items-center pt-12 pb-6 px-6">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-16 mb-4 object-contain"
          />
        ) : (
          <h1 className="font-playfair font-semibold text-[28px] text-brand-brown mb-4">
            {brand.name}
          </h1>
        )}
        <h2 className="font-playfair font-medium text-[22px] text-brand-brown text-center">
          {outlet.name}
        </h2>
        {outlet.address && (
          <p className="font-inter text-[13px] text-brand-muted text-center mt-1 max-w-[320px]">
            {outlet.address}
          </p>
        )}
      </header>

      {/* Select heading */}
      <div className="w-full max-w-[393px] px-6 mb-4">
        <h3 className="font-playfair text-[20px] font-medium text-brand-brown">
          Select your menu
        </h3>
        <p className="font-inter text-[12px] text-brand-muted mt-1">
          Choose a dining section to view the menu
        </p>
      </div>

      {/* Access point cards */}
      <div className="w-full max-w-[393px] px-6 pb-12 flex flex-col gap-3">
        {accessPoints.map((ap) => (
          <button
            key={ap.id}
            onClick={() => navigate(`/${outletSlug}/${ap.slug}${window.location.search}`)}
            className="w-full bg-white border border-brand-divider rounded-[12px] px-5 py-4 shadow-[0_2px_8px_rgba(124,63,32,0.08)] hover:shadow-[0_4px_16px_rgba(124,63,32,0.15)] hover:border-brand-accent/30 transition-all duration-200 active:scale-[0.98] cursor-pointer text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-grad-fab flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 2h18v20H3z" />
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h6" />
                  </svg>
                </div>
                <span className="font-inter font-semibold text-[16px] text-brand-brown">
                  {ap.name}
                </span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C76A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
