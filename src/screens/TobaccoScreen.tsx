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

  const TOBACCO_TABS = ALL_TOBACCO_TABS.filter(catName => 
    hookahItems.some(h => h.category?.toLowerCase() === catName.toLowerCase())
  );

  useEffect(() => {
    if (TOBACCO_TABS.length > 0 && !TOBACCO_TABS.some(t => t.toLowerCase() === activeTab)) {
      setActiveTab(TOBACCO_TABS[0].toLowerCase());
    }
  }, [TOBACCO_TABS, activeTab]);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown pb-[100px] relative">
      <SearchOverlay
        isOpen={isSearchActive}
        onClose={() => setIsSearchActive(false)}
        onSearch={() => setIsSearchActive(false)}
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
      <div className="max-w-[393px] mx-auto relative px-[21px] box-border">
        {/* Logo */}
        <div className="flex justify-center pt-[29px] pb-[10px]">
          <img src="/logo.png" alt="CSAT" className="w-[100px] h-[35px] object-contain" />
        </div>

        {/* Category cards */}
        <div className="flex flex-row items-center gap-[25px] w-[320px] h-[110px] mx-auto mb-5">
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
        <div className="flex flex-row items-start gap-[30px] pl-[15px] pr-[15px] overflow-x-auto [scrollbar-width:none] w-[377.96px] box-border">
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
      <div className="max-w-[393px] mx-auto px-[21px] box-border pt-4">
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
            <div
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
            </div>
          </div>
        </div>

        {/* Hookah grid */}
        <div className="flex flex-col items-center gap-5 w-[314px] mx-auto">
          {hookahItems.filter(h => h.category?.toLowerCase() === activeTab).map((hookah, idx) => (
            <div
              key={hookah.name}
              onClick={() => setSelectedHookah(hookah)}
              className="flex flex-row items-center gap-[15px] w-full p-2 bg-white rounded-[10px] shadow-sm cursor-pointer"
            >
              <img src={hookah.image} alt={hookah.name} className="w-[80px] h-[80px] rounded-[5px] object-cover" />
              <div className="flex flex-col gap-[5px]">
                <span className="font-playfair font-medium text-[18px] text-brand-brown">{hookah.name}</span>
                <span className="font-roboto text-[14px] text-brand-brown">₹{hookah.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MenuFab onClick={() => setIsCategoriesModalOpen(true)} />
    </div>
  );
}
