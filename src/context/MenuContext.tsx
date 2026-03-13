import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import type { MenuData, ApiCategory, ApiMenuItem } from '../types/api';
import { fetchMenuBySlug, MenuFetchError, type MenuErrorCode } from '../services/api';

// ── Refresh interval (1 minute) ─────────────────────────────────────────────
const REFRESH_INTERVAL_MS = 1 * 60 * 1000;

// ── Retry delay for MENU_LOADING state ──────────────────────────────────────
const LOADING_RETRY_MS = 3000;

// ── Extract brand slug from hostname ────────────────────────────────────────

function getBrandSlug(): string | null {
  const hostname = window.location.hostname;

  // Local dev: use ?brand= query param or VITE_DEV_BRAND env var
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const params = new URLSearchParams(window.location.search);
    return params.get('brand') || import.meta.env.VITE_DEV_BRAND || null;
  }

  // Production: brandSlug.digimenu.csatcloud.com → "brandSlug"
  const parts = hostname.split('.');
  if (parts.length >= 3) {
    return parts[0];
  }

  return null;
}

// ── Context value shape ─────────────────────────────────────────────────────

interface MenuContextValue {
  menu: MenuData | null;
  loading: boolean;
  errorCode: MenuErrorCode | null;
  errorMessage: string | null;
  refetch: () => void;
  categories: ApiCategory[];
  allItems: ApiMenuItem[];
}

const MenuContext = createContext<MenuContextValue | null>(null);

// ── Provider ────────────────────────────────────────────────────────────────

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const { outletSlug, accessPointSlug } = useParams<{ outletSlug: string; accessPointSlug: string }>();
  const brandSlug = getBrandSlug();

  const [menu, setMenu] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<MenuErrorCode | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // silent=true: don't show loading spinner or clear current error state (used for retries + background refresh)
  const fetchMenu = useCallback(async (silent = false) => {
    if (!brandSlug || !outletSlug || !accessPointSlug) {
      setErrorCode('MENU_NOT_FOUND');
      setErrorMessage('No menu identifier provided. Please scan a valid QR code.');
      setLoading(false);
      return;
    }

    if (!silent) {
      setLoading(true);
      setErrorCode(null);
      setErrorMessage(null);
    }

    try {
      const data = await fetchMenuBySlug(brandSlug, outletSlug, accessPointSlug);
      setMenu(data);
      setErrorCode(null);
      setErrorMessage(null);

      // Set document title to brand name
      if (data.outlet?.brand?.name) {
        document.title = data.outlet.brand.name;
      }

      // Preload first 4 item thumbnails + brand logo
      const firstItems = data.categories?.[0]?.items?.slice(0, 4) ?? [];
      firstItems.forEach((item) => {
        if (item.thumbnail) {
          const img = new Image();
          img.src = item.thumbnail;
        }
      });
      if (data.outlet?.brand?.logo) {
        const logo = new Image();
        logo.src = data.outlet.brand.logo;
      }
    } catch (err) {
      if (err instanceof MenuFetchError) {
        setErrorCode(err.code);
        setErrorMessage(err.message);

        if (err.code === 'MENU_LOADING') {
          retryTimerRef.current = setTimeout(() => {
            fetchMenu(true); // silent retry — keeps "Preparing your menu" screen stable
          }, LOADING_RETRY_MS);
        }
      } else {
        setErrorCode('NETWORK_ERROR');
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [brandSlug, outletSlug, accessPointSlug]);

  useEffect(() => {
    fetchMenu();

    const interval = setInterval(() => fetchMenu(true), REFRESH_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, [fetchMenu]);

  const categories = menu?.categories ?? [];
  const allItems = categories.flatMap((cat) => cat.items);

  return (
    <MenuContext.Provider
      value={{
        menu,
        loading,
        errorCode,
        errorMessage,
        refetch: fetchMenu,
        categories,
        allItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useMenu(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within <MenuProvider>');
  return ctx;
}
