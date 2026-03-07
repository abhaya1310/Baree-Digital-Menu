import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMenu, type MenuData } from '../api/menu';
import MenuScreen from './MenuScreen';

// ── Loading spinner ──────────────────────────────────────────────────────────
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center gap-6">
      <img src="/logo.png" alt="logo" className="w-[100px] h-[35px] object-contain" />
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce" />
      </div>
      <p className="font-inter text-[14px] text-brand-muted">Loading menu…</p>
    </div>
  );
}

// ── Preparing state (backend says "loading") ─────────────────────────────────
function PreparingScreen() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center gap-6">
      <img src="/logo.png" alt="logo" className="w-[100px] h-[35px] object-contain" />
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce" />
      </div>
      <p className="font-inter text-[15px] text-brand-brown font-medium">Preparing your menu…</p>
      <p className="font-inter text-[13px] text-brand-muted">This will only take a moment</p>
    </div>
  );
}

// ── Error / inactive ─────────────────────────────────────────────────────────
function ErrorScreen({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center gap-4 px-8 text-center">
      <img src="/logo.png" alt="logo" className="w-[100px] h-[35px] object-contain mb-4" />
      <h2 className="font-playfair font-semibold text-[28px] text-brand-brown">{title}</h2>
      <p className="font-inter text-[14px] text-brand-muted leading-relaxed max-w-[320px]">{subtitle}</p>
    </div>
  );
}

// ── Main wrapper page ────────────────────────────────────────────────────────
export default function MenuPage() {
  const { qrSlug } = useParams<{ qrSlug: string }>();
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ title: string; subtitle: string } | null>(null);

  const loadMenu = useCallback(async () => {
    if (!qrSlug) return;
    try {
      setLoading(true);
      setError(null);

      const result = await fetchMenu(qrSlug);

      if (!result.success) {
        setError({
          title: 'Invalid QR Code',
          subtitle: 'This menu link is not valid. Please scan a valid QR code.',
        });
        return;
      }

      // Handle special backend statuses
      if (result.data.status === 'inactive') {
        setError({
          title: 'Menu Temporarily Unavailable',
          subtitle: "This restaurant's menu is currently not available. Please contact staff.",
        });
        return;
      }

      if (result.data.status === 'loading') {
        // Auto-retry after 3 seconds
        setMenu(null);
        setLoading(false);
        setTimeout(() => loadMenu(), 3000);
        return;
      }

      setMenu(result.data);
    } catch {
      setError({
        title: 'Something went wrong',
        subtitle: 'Could not load the menu. Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  }, [qrSlug]);

  // Initial load
  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  // Periodic refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      loadMenu();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadMenu]);

  // ── Render states ──────────────────────────────────────────────────────────

  if (loading && !menu) return <LoadingSpinner />;

  if (error) return <ErrorScreen title={error.title} subtitle={error.subtitle} />;

  // Backend returned "loading" status — show preparing screen
  if (!menu) return <PreparingScreen />;

  return <MenuScreen menu={menu} onRefresh={loadMenu} />;
}
