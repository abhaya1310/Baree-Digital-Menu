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
      <div
        className="min-h-screen max-w-[393px] mx-auto flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 40%, #CD853F 100%)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-white/70 font-inter text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div
        className="min-h-screen max-w-[393px] mx-auto flex items-center justify-center px-6"
        style={{ background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 40%, #CD853F 100%)' }}
      >
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-white font-inter text-base mb-4">{error || 'Something went wrong.'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#FAF7F2] text-[#5C2D0E] rounded-full font-inter font-medium text-[14px] cursor-pointer border-0 shadow-md hover:bg-white active:scale-95 transition-all"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { outlet, brand, accessPoints } = data;

  return (
    <div
      className="min-h-screen max-w-[393px] mx-auto flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 40%, #CD853F 100%)' }}
    >
      {/* Brand logo or name */}
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="h-[40px] object-contain mb-8"
        />
      ) : (
        <span className="font-playfair text-white text-[20px] font-bold mb-8">
          {brand.name}
        </span>
      )}

      {/* Outlet name */}
      <h1 className="font-playfair text-[32px] font-bold text-white text-center leading-tight mb-12">
        {outlet.name}
      </h1>

      {/* Prompt */}
      <p className="font-inter text-[16px] font-medium text-white/90 italic mb-1">
        How would you like to order?
      </p>
      <p className="font-inter text-[13px] text-white/50 mb-8">
        Choose your dining preference
      </p>

      {/* POS cards */}
      <div className="w-full max-w-[320px] flex flex-col gap-3">
        {accessPoints.map((ap) => (
          <button
            key={ap.id}
            onClick={() => navigate(`/${outletSlug}/${ap.slug}${window.location.search}`)}
            className="w-full flex items-center px-5 py-4 rounded-[12px] bg-[#FAF7F2] shadow-sm cursor-pointer border-0 transition-all duration-200 hover:shadow-md active:scale-[0.98] text-left"
          >
            <span className="text-[18px] mr-3">🍴</span>
            <span className="font-inter font-medium text-[16px] text-[#5C2D0E] flex-1 text-left">
              {ap.name}
            </span>
            <span className="text-[#5C2D0E]/50 text-[18px]">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
