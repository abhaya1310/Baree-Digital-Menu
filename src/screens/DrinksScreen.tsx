import React, { useState, useEffect } from "react";
import SearchOverlay from "../SearchOverlay";
import FilterModal from "../FilterModal";
import MenuCategoriesModal from "../MenuCategoriesModal";
import DishDetailModal from "../DishDetailModal";
import { drinks, type Drink } from "../data/drinks";
import CategoryCard from "../components/ui/CategoryCard";
import MenuFab from "../components/ui/MenuFab";

interface DrinksScreenProps {
  onNavigateToSpecials: () => void;
  onNavigateToFood: () => void;
  onNavigateToTobacco: () => void;
}

export default function DrinksScreen({
  onNavigateToSpecials,
  onNavigateToFood,
  onNavigateToTobacco,
}: DrinksScreenProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [activeFilters, setActiveFilters] = useState(0);
  const [alcoholicMode, setAlcoholicMode] = useState<"ALCOHOLIC" | "NON-ALCOHOLIC">("ALCOHOLIC");
  const [activeTab, setActiveTab] = useState("Beer");
  const [searchQuery, setSearchQuery] = useState("");

  const ALL_DRINK_TABS = [
    "Beer", "Soft Drink", "Mocktail", "Shakes", "Signature Cocktail",
    "Classic Cocktail", "Single Malt Whiskey", "American Whisky",
    "Blended Scotch Whiskey", "SHORTS", "LIQUERS", "GIN", "VODKA",
    "TEQUILA", "RUM", "Hard liquor", "SPARKLING WINE", "RED WINE", "WHITE WINE"
  ];

  const NON_ALCOHOLIC_CATEGORIES = ["Soft Drink", "Mocktail", "Shakes"];

  // Auto-switch alcoholic mode based on search results
  useEffect(() => {
    if (searchQuery) {
      const searchedDrinks = drinks.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (searchedDrinks.length > 0) {
        const hasNonAlcoholic = searchedDrinks.some(d => NON_ALCOHOLIC_CATEGORIES.includes(d.category || ''));
        const hasAlcoholic = searchedDrinks.some(d => !NON_ALCOHOLIC_CATEGORIES.includes(d.category || ''));

        // If current mode shows no results but opposite mode has results, switch
        if (alcoholicMode === 'NON-ALCOHOLIC' && !hasNonAlcoholic && hasAlcoholic) {
          setAlcoholicMode('ALCOHOLIC');
        } else if (alcoholicMode === 'ALCOHOLIC' && !hasAlcoholic && hasNonAlcoholic) {
          setAlcoholicMode('NON-ALCOHOLIC');
        }
      }
    }
  }, [searchQuery]);

  // Calculate which tabs actually have items based on the current alcoholic mode and search
  const DRINK_TABS = ALL_DRINK_TABS.filter((catName: string) => {
    const isCatNonAlcoholic = NON_ALCOHOLIC_CATEGORIES.includes(catName);
    const modeMatch = alcoholicMode === "NON-ALCOHOLIC" ? isCatNonAlcoholic : !isCatNonAlcoholic;
    if (!modeMatch) return false;

    return drinks.some(drink => drink.category === catName);
  });

  // If current activeTab is hidden, switch to first available
  useEffect(() => {
    if (DRINK_TABS.length > 0 && !DRINK_TABS.includes(activeTab)) {
      setActiveTab(DRINK_TABS[0]);
    }
  }, [DRINK_TABS, activeTab]);

  // Filter drinks based on tab, alcoholic mode and search query
  const filteredDrinks = drinks.filter((drink) => {
    // Basic tab match
    if (drink.category !== activeTab) return false;

    // Search match
    const searchMatch = !searchQuery ||
      drink.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drink.category?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!searchMatch) return false;

    // Alcoholic mode match
    const isNonAlcoholic = NON_ALCOHOLIC_CATEGORIES.includes(
      drink.category || "",
    );

    if (alcoholicMode === "NON-ALCOHOLIC") {
      return isNonAlcoholic;
    } else {
      return !isNonAlcoholic;
    }
  });

  // Group drinks into pairs for the staggered grid
  const drinkPairs: Drink[][] = [];
  for (let i = 0; i < filteredDrinks.length; i += 2) {
    drinkPairs.push(filteredDrinks.slice(i, i + 2));
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown pb-[100px] relative">
      <SearchOverlay
        isOpen={isSearchActive}
        onClose={() => setIsSearchActive(false)}
        onSearch={(text) => setSearchQuery(text)}
        initialQuery={searchQuery}
        items={drinks}
      />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(count) => setActiveFilters(count)}
        type="drinks"
      />
      <MenuCategoriesModal
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        onCategorySelect={(cat) => {
          setActiveTab(cat);
          setIsCategoriesModalOpen(false);
        }}
        type="drinks"
        availableCategories={DRINK_TABS}
      />
      {selectedDrink && (
        <DishDetailModal
          isOpen={!!selectedDrink}
          onClose={() => setSelectedDrink(null)}
          dish={selectedDrink}
          type="drink"
        />
      )}

      {/* Header */}
      <div className="max-w-[393px] mx-auto relative px-[15px] box-border">
        {/* Logo */}
        <div className="flex justify-center pt-[29px] pb-[10px]">
          <img
            src="/logo.png"
            alt="CSAT"
            className="w-[100px] h-[35px] object-contain"
          />
        </div>

        {/* Category cards */}
        <div className="flex flex-row items-center gap-[25px] w-[290px] h-[100px] mx-auto mb-5">
          <CategoryCard
            label="Food"
            img="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200"
            onClick={onNavigateToFood}
          />
          <CategoryCard
            label="Drinks"
            img="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=200"
            active
          />
          <CategoryCard
            label="Tobacco"
            img="https://images.pexels.com/photos/4969832/pexels-photo-4969832.jpeg?auto=compress&cs=tinysrgb&w=200"
            onClick={onNavigateToTobacco}
          />
        </div>

        {/* Alcoholic / Non-alcoholic toggle */}
        <div className="box-border w-full h-[36px] bg-white border-[0.6px] border-brand-border shadow-[0px_2.3px_2px_rgba(124,63,32,0.25)] rounded-[50px] flex flex-row items-center p-[3px_11px_3px_3px] gap-[10px] mx-auto">
          {/* ALCOHOLIC pill */}
          <button
            onClick={() => setAlcoholicMode("ALCOHOLIC")}
            className={[
              "flex-1 h-[30px] rounded-[50px] flex justify-center items-center cursor-pointer font-inter font-semibold text-[14px] leading-[17px] transition-colors duration-200 border-0",
              alcoholicMode === "ALCOHOLIC"
                ? "bg-brand-brown/80 text-white"
                : "bg-white text-brand-brown/80",
            ].join(" ")}
          >
            ALCOHOLIC
          </button>
          {/* NON-ALCOHOLIC pill */}
          <button
            onClick={() => setAlcoholicMode("NON-ALCOHOLIC")}
            className={[
              "flex-1 h-[30px] rounded-[50px] flex justify-center items-center cursor-pointer font-inter font-semibold text-[14px] leading-[17px] transition-colors duration-200 border-0",
              alcoholicMode === "NON-ALCOHOLIC"
                ? "bg-brand-brown/80 text-white"
                : "bg-white text-brand-brown/80",
            ].join(" ")}
          >
            NON-ALCOHOLIC
          </button>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="max-w-[393px] mx-auto mt-3">
        <div className={[
          "flex flex-row items-start gap-[30px] overflow-x-auto [scrollbar-width:none] w-full box-border",
          DRINK_TABS.length <= 4 ? "justify-center" : "px-[15px]"
        ].join(" ")}>
          {DRINK_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <div
                key={tab}
                className="flex flex-col items-center gap-[2px] shrink-0"
              >
                <button
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "bg-transparent border-0 cursor-pointer p-0 font-inter font-medium text-[16px] leading-[19px] whitespace-nowrap",
                    isActive ? "text-brand-accent" : "text-brand-border",
                  ].join(" ")}
                >
                  {tab}
                </button>
                {isActive && (
                  <div className="w-full h-0 border-t-[3px] border-brand-accent rounded-[2px]" />
                )}
              </div>
            );
          })}
        </div>
        <div className="h-px bg-brand-divider mt-[2px]" />
      </div>

      {/* Scrollable content */}
      <div className="max-w-[393px] mx-auto px-[15px] box-border pt-4">
        {/* Search bar */}
        <div className="box-border w-full h-[35px] bg-brand-white border-[0.6px] border-brand-border shadow-[1px_2px_2px_rgba(255,255,255,0.3)] rounded-[50px] mb-5 flex flex-row justify-between items-center py-[7px] px-[14px] transition-all duration-200">
          <div className="flex flex-row justify-between items-center w-full">
            <div
              className="flex flex-row items-center gap-[10px] cursor-pointer flex-1 transition-opacity duration-150 active:opacity-70"
              onClick={() => setIsSearchActive(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="5"
                  stroke="rgba(124, 63, 32, 0.8)"
                  strokeWidth="1.5"
                />
                <line
                  x1="11"
                  y1="11"
                  x2="15"
                  y2="15"
                  stroke="rgba(124, 63, 32, 0.8)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {searchQuery ? (
                <span className="font-roboto font-normal text-[12px] text-brand-brown">{searchQuery}</span>
              ) : (
                <span className="font-roboto font-normal text-[12px] text-brand-brown opacity-60">
                  Search drinks, brands, flavors...
                </span>
              )}
            </div>
            {searchQuery && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery('');
                }}
                className="w-[16px] h-[16px] bg-transparent border-none p-0 cursor-pointer flex items-center justify-center shrink-0 transition-transform duration-150 hover:scale-110 active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" fill="#7C3F20" />
                  <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            )}
            {/* Filter icon + badge - Disabled for now */}
            {/* <div
              className="relative w-[23px] h-[19.5px] cursor-pointer shrink-0"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="absolute left-0 top-[6.5px]">
                <line x1="1" y1="2.5" x2="12" y2="2.5" stroke="rgba(124, 63, 32, 0.8)" strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="4" cy="2.5" r="1.5" fill="rgba(124, 63, 32, 0.8)" />
                <line x1="1" y1="6.5" x2="12" y2="6.5" stroke="rgba(124, 63, 32, 0.8)" strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="9" cy="6.5" r="1.5" fill="rgba(124, 63, 32, 0.8)" />
                <line x1="1" y1="10.5" x2="12" y2="10.5" stroke="rgba(124, 63, 32, 0.8)" strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="6" cy="10.5" r="1.5" fill="rgba(124, 63, 32, 0.8)" />
              </svg>
              {activeFilters > 0 && (
                <div className="absolute left-[9px] top-0 w-[14px] h-[15px]">
                  <div className="absolute left-0 top-[1px] w-[14px] h-[14px] rounded-full bg-brand-accent flex items-center justify-center">
                    <span className="font-roboto font-normal text-[9px] leading-[10px] text-white">
                      {activeFilters}
                    </span>
                  </div>
                </div>
              )}
            </div> */}
          </div>
        </div>

        {/* Drink grid - Staggered 2-column layout per Figma */}
        <div className="flex flex-col gap-[34px] w-full">
          {filteredDrinks.length === 0 ? (
            <div className="text-center text-brand-muted py-10 font-inter text-[14px]">
              No drinks available
            </div>
          ) : (
            drinkPairs.map((pair, rowIdx) => (
              <div key={rowIdx} className="relative w-[351px] mx-auto" style={{ minHeight: '260px' }}>
                {pair.map((drink, colIdx) => (
                  <DrinkCard
                    key={drink.name}
                    drink={drink}
                    colIdx={colIdx}
                    onClick={() => setSelectedDrink(drink)}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      <MenuFab onClick={() => setIsCategoriesModalOpen(true)} />
    </div>
  );
}

// ── Shared drink card sub-component ──────────────────────────────────────────
function DrinkCard({
  drink,
  colIdx,
  onClick,
}: {
  drink: Drink;
  colIdx: number;
  onClick: () => void;
}) {
  const badgeWidth = drink.badge === "Chef's special" || drink.badge === 'Signature' ? '91px' : '125px';
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start gap-[2px] absolute w-[138px] cursor-pointer"
      style={{
        left: colIdx === 0 ? '12px' : '200px',
        top: colIdx === 0 ? '0px' : '14px',
      }}
    >
      {/* Image container */}
      <div className="relative shrink-0 w-full h-[123px]">
        <div
          className="absolute top-0 w-[109px] h-[109px] border-[0.4px] border-[rgba(125,121,121,0.7)] rounded-[3px] overflow-hidden box-border"
          style={{ left: '13px' }}
        >
          {!imageLoaded && (
            <div className="w-full h-full bg-brand-cream animate-pulse" />
          )}
          <img
            src={drink.image}
            alt={drink.name}
            className={`w-full h-full object-cover block transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="eager"
          />
        </div>
        {/* Badge */}
        {drink.badge && (
          <div
            className="absolute left-0 top-[103px] h-[20px] bg-brand-accent rounded-[2px] flex justify-center items-center px-[3px]"
            style={{ width: badgeWidth }}
          >
            <span className="font-playfair font-semibold text-[12px] leading-[14px] text-white whitespace-nowrap">
              {drink.badge}
            </span>
          </div>
        )}
      </div>
      {/* Text block */}
      <div className="flex flex-col items-start gap-[3px] w-[138px]">
        <div className="flex flex-col items-start gap-[1px] w-full">
          <span className="font-playfair font-medium text-[17px] leading-[21px] text-brand-brown block line-clamp-2">
            {drink.name}
          </span>
          <div className="flex flex-row items-center gap-[20px] w-[123px] h-[15px]">
            <span className="font-roboto font-normal text-[13px] leading-[15px] text-brand-brown">
              ₹{drink.price}
            </span>
          </div>
        </div>
        <p className="font-inter font-normal text-[12px] leading-[18px] tracking-[0.02em] text-brand-muted m-0 w-[127px] line-clamp-2">
          {drink.description}
        </p>
      </div>
    </div>
  );
}
