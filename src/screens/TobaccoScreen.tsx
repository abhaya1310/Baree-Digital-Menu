import React, { useState, useEffect } from 'react';
import SearchOverlay from '../SearchOverlay';
import FilterModal from '../FilterModal';
import MenuCategoriesModal from '../MenuCategoriesModal';
import DishDetailModal from '../DishDetailModal';
import { hookahItems, type HookahItem } from '../data/hookah';
import CategoryCard from '../components/ui/CategoryCard';
import MenuFab from '../components/ui/MenuFab';

interface TobaccoScreenProps {
  onNavigateToSpecials: () => void;
  onNavigateToFood: () => void;
  onNavigateToDrinks: () => void;
}

const ALL_TOBACCO_TABS = ['Classic', 'Mix', 'Special'];

export default function TobaccoScreen({ onNavigateToSpecials, onNavigateToFood, onNavigateToDrinks }: TobaccoScreenProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [selectedHookah, setSelectedHookah] = useState<HookahItem | null>(null);
  const [activeFilters, setActiveFilters] = useState(0);
  const [activeTab, setActiveTab] = useState('classic');
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate which tabs actually have items based on search
  const TOBACCO_TABS = ALL_TOBACCO_TABS.filter(catName => 
    hookahItems.some(h => {
      const catMatch = h.category?.toLowerCase() === catName.toLowerCase();
      if (!catMatch) return false;
      const searchMatch = !searchQuery || 
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return searchMatch;
    })
  );

  useEffect(() => {
    if (TOBACCO_TABS.length > 0 && !TOBACCO_TABS.some(t => t.toLowerCase() === activeTab)) {
      setActiveTab(TOBACCO_TABS[0].toLowerCase());
    }
  }, [TOBACCO_TABS, activeTab]);

  // Filter items based on tab and search
  const filteredHookah = hookahItems.filter(h => {
    const tabMatch = h.category?.toLowerCase() === activeTab;
    if (!tabMatch) return false;
    const searchMatch = !searchQuery || 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return searchMatch;
  });

  // Group items into pairs for the grid
  const hookahPairs: HookahItem[][] = [];
  for (let i = 0; i < filteredHookah.length; i += 2) {
    hookahPairs.push(filteredHookah.slice(i, i + 2));
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown pb-[100px] relative">
      <SearchOverlay
        isOpen={isSearchActive}
        onClose={() => setIsSearchActive(false)}
        onSearch={(text) => setSearchQuery(text)}
        initialQuery={searchQuery}
        items={hookahItems}
      />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(count) => setActiveFilters(count)}
        type="tobacco"
      />
      <MenuCategoriesModal
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        onCategorySelect={(cat) => {
          setIsCategoriesModalOpen(false);
          setActiveTab(cat.toLowerCase().replace(/ /g, ''));
        }}
        type="tobacco"
        availableCategories={TOBACCO_TABS}
      />
      {selectedHookah && (
        <DishDetailModal
          isOpen={!!selectedHookah}
          onClose={() => setSelectedHookah(null)}
          dish={selectedHookah as any} // Reusing DishDetailModal for HookahItem
          type="drink" // Using 'drink' layout (no veg dot)
        />
      )}

      {/* Header */}
      <div className="max-w-[393px] mx-auto relative px-[15px] box-border">
        {/* Logo */}
        <div className="flex justify-center pt-[29px] pb-[10px]">
          <img src="/logo.png" alt="CSAT" className="w-[100px] h-[35px] object-contain" />
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
            onClick={onNavigateToDrinks}
          />
          <CategoryCard
            label="Tobacco"
            img="https://images.pexels.com/photos/4969832/pexels-photo-4969832.jpeg?auto=compress&cs=tinysrgb&w=200"
            active
          />
        </div>
      </div>

      {/* Nav tabs */}
      <div className="max-w-[393px] mx-auto mt-3">
        <div className="flex flex-row items-start justify-between overflow-x-auto [scrollbar-width:none] w-full box-border">
          {TOBACCO_TABS.map((tab) => {
            const tabKey = tab.toLowerCase().replace(/ /g, '');
            const isActive = activeTab === tabKey;
            return (
              <div key={tab} className="flex flex-col items-center gap-[2px] shrink-0">
                <button
                  onClick={() => setActiveTab(tabKey)}
                  className={[
                    'bg-transparent border-0 cursor-pointer p-0 font-inter font-medium text-[16px] leading-[19px] whitespace-nowrap',
                    isActive ? 'text-brand-accent' : 'text-brand-border',
                  ].join(' ')}
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
        <div className="box-border w-full h-[35px] bg-brand-white border-[0.6px] border-brand-border shadow-[1px_2px_2px_rgba(255,255,255,0.3)] rounded-[50px] mb-5 flex flex-row justify-between items-center py-[7px] px-[14px]">
          <div className="flex flex-row justify-between items-center w-full">
            <div
              className="flex flex-row items-center gap-[10px] cursor-pointer flex-1"
              onClick={() => setIsSearchActive(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="rgba(124, 63, 32, 0.8)" strokeWidth="1.5" />
                <line x1="11" y1="11" x2="15" y2="15" stroke="rgba(124, 63, 32, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-roboto font-normal text-[12px] text-brand-brown opacity-60">Search items...</span>
            </div>
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

        {/* Hookah grid */}
        <div className="flex flex-col items-center gap-5 w-full">
          {hookahPairs.map((pair, rowIdx) => (
            <div
              key={rowIdx}
              className="relative w-[363px] h-[232px] shrink-0"
            >
              {pair.map((hookah, colIdx) => (
                <HookahCard
                  key={hookah.name}
                  hookah={hookah}
                  colIdx={colIdx}
                  onClick={() => setSelectedHookah(hookah)}
                  row2={rowIdx % 2 !== 0}
                />
              ))}
            </div>
          ))}

          {/* Clear filters pill - Disabled for now */}
          {/* {activeFilters > 0 && (
            <div className="flex justify-center w-full mt-4">
              <button
                onClick={() => setActiveFilters(0)}
                className="w-[146px] h-[33px] bg-brand-accent rounded-[80px] border-0 cursor-pointer flex justify-center items-center px-[10px]"
              >
                <span className="font-inter font-semibold text-[13px] leading-[16px] text-white">
                  Clear filters
                </span>
              </button>
            </div>
          )} */}
        </div>
      </div>

      <MenuFab onClick={() => setIsCategoriesModalOpen(true)} />
    </div>
  );
}

// ── Shared hookah card sub-component ──────────────────────────────────────────
function HookahCard({
  hookah,
  colIdx,
  onClick,
  row2 = false,
}: {
  hookah: HookahItem;
  colIdx: number;
  onClick: () => void;
  row2?: boolean;
}) {

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start gap-[2px] absolute w-[138px] h-[210px] cursor-pointer"
      style={{
        left: colIdx === 0 ? "0px" : "225px",
        top: "0px",
      }}
    >
      {/* Image container */}
      <div
        className="relative shrink-0 w-full h-[123px]"
      >
        <div
          className="box-border absolute w-[109px] h-[109px] top-0 border-[0.4px] border-[rgba(125,121,121,0.7)] rounded-[3px] overflow-hidden"
          style={{ left: '13px' }}
        >
          <img
            src={hookah.image}
            alt={hookah.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Text block */}
      <div className="flex flex-col items-start gap-[3px] w-[138px]">
        <div className="flex flex-col items-start gap-[1px] w-full">
          <span className="font-playfair font-medium text-[17px] leading-[21px] text-brand-brown block line-clamp-2">
            {hookah.name}
          </span>
          <div className="flex flex-row items-center gap-[20px] w-[123px] h-[15px]">
            <span className="font-roboto font-normal text-[13px] leading-[15px] text-brand-brown">
              ₹{hookah.price}
            </span>
          </div>
        </div>
        {hookah.description && (
          <p className="font-inter font-normal text-[12px] leading-[18px] tracking-[0.02em] text-brand-muted m-0 w-[127px] line-clamp-2">
            {hookah.description}
          </p>
        )}
      </div>
    </div>
  );
}
