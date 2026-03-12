import React, { useState, useEffect } from "react";
import { MenuProvider, useMenu } from "./context/MenuContext";
import MenuScreen from "./screens/MenuScreen";
import SpecialsScreen from "./screens/SpecialsScreen";
import DrinksScreen from "./screens/DrinksScreen";
import TobaccoScreen from "./screens/TobaccoScreen";

// ── Loading screen (matches Template 4 cream/brown theme) ────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-3 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
        <p className="font-inter text-[14px] text-brand-muted">Loading menu...</p>
      </div>
    </div>
  );
}

// ── Error screen ─────────────────────────────────────────────────────────────
function ErrorScreen({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4 max-w-[320px] text-center">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="#C76A3A" strokeWidth="2" />
          <line x1="24" y1="14" x2="24" y2="28" stroke="#C76A3A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="34" r="1.5" fill="#C76A3A" />
        </svg>
        <h2 className="font-playfair font-semibold text-[22px] text-brand-brown">
          Something went wrong
        </h2>
        <p className="font-inter text-[14px] text-brand-muted leading-relaxed">
          {message}
        </p>
        <button
          onClick={onRetry}
          className="mt-2 px-8 py-3 bg-brand-accent text-white rounded-full font-inter font-medium text-[14px] cursor-pointer border-0 shadow-[0_4px_16px_rgba(199,106,58,0.35)]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// ── Menu loading screen (snapshot being built) ───────────────────────────────
function MenuLoadingScreen() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4 max-w-[320px] text-center">
        <div className="w-12 h-12 border-3 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
        <h2 className="font-playfair font-semibold text-[22px] text-brand-brown">
          Preparing your menu
        </h2>
        <p className="font-inter text-[14px] text-brand-muted leading-relaxed">
          Please wait while we get everything ready...
        </p>
      </div>
    </div>
  );
}

// ── Inner app with screen navigation ─────────────────────────────────────────
function AppContent() {
  const { menu, loading, errorCode, errorMessage, refetch } = useMenu();
  const [currentScreen, setCurrentScreen] = useState<
    "specials" | "menu" | "drinks" | "tobacco"
  >("menu");

  // Reset scroll position when screen changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  if (loading && !menu) return <LoadingScreen />;
  if (errorCode === 'MENU_LOADING') return <MenuLoadingScreen />;
  if (errorCode && !menu) return <ErrorScreen message={errorMessage || 'Failed to load menu.'} onRetry={refetch} />;
  if (!menu) return <ErrorScreen message="Menu not available." onRetry={refetch} />;

  return (
    <>
      {currentScreen === "specials" ? (
        <SpecialsScreen
          key="specials"
          onNavigateToMenu={() => setCurrentScreen("menu")}
        />
      ) : currentScreen === "menu" ? (
        <MenuScreen
          key="menu"
          onNavigateToSpecials={() => setCurrentScreen("specials")}
          onNavigateToDrinks={() => setCurrentScreen("drinks")}
          onNavigateToTobacco={() => setCurrentScreen("tobacco")}
        />
      ) : currentScreen === "drinks" ? (
        <DrinksScreen
          key="drinks"
          onNavigateToSpecials={() => setCurrentScreen("specials")}
          onNavigateToFood={() => setCurrentScreen("menu")}
          onNavigateToTobacco={() => setCurrentScreen("tobacco")}
        />
      ) : (
        <TobaccoScreen
          key="tobacco"
          onNavigateToSpecials={() => setCurrentScreen("specials")}
          onNavigateToFood={() => setCurrentScreen("menu")}
          onNavigateToDrinks={() => setCurrentScreen("drinks")}
        />
      )}
    </>
  );
}

function App() {
  return (
    <MenuProvider>
      <AppContent />
    </MenuProvider>
  );
}

export default App;
