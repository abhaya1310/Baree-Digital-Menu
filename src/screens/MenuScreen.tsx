import React, { useState, useEffect } from 'react';
import DishDetailModal from '../DishDetailModal';
import MenuCategoriesModal from '../MenuCategoriesModal';
import FilterModal from '../FilterModal';
import SearchOverlay from '../SearchOverlay';
import { dishes, type Dish } from '../data/dishes';
import CategoryCard from '../components/ui/CategoryCard';
import MenuFab from '../components/ui/MenuFab';
import VegDot from '../components/ui/VegDot';

interface MenuScreenProps {
  onNavigateToSpecials: () => void;
  onNavigateToDrinks: () => void;
  onNavigateToTobacco: () => void;
}

// ── Dish card ────────────────────────────────────────────────────────────────
function DishCard({ dish, onClick, cardWidth = 138 }: { dish: Dish; onClick: () => void; cardWidth?: number }) {
  const badgeWidth = dish.badge === "Chef's special" || dish.badge === 'Signature' ? '100px' : '125px';
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start gap-[2px] cursor-pointer"
      style={{ width: `${cardWidth}px` }}
    >
      {/* image container */}
      <div className="relative shrink-0" style={{ width: `${cardWidth}px`, height: '123px' }}>
        {/* bordered image box, left offset ~13px */}
        <div
          className="absolute top-0 w-[109px] h-[109px] border-[0.4px] border-[rgba(125,121,121,0.7)] rounded-[3px] overflow-hidden box-border"
          style={{ left: '13px' }}
        >
          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover block" />
        </div>
        {/* badge */}
        {dish.badge && (
          <div
            className="absolute left-0 top-[103px] h-[20px] bg-brand-accent rounded-[2px] flex justify-center items-center px-[3px]"
            style={{ width: badgeWidth }}
          >
            <span className="font-playfair font-semibold text-[12px] leading-[14px] text-white">
              {dish.badge}
            </span>
          </div>
        )}
      </div>

      {/* text column */}
      <div className="flex flex-col gap-[3px]" style={{ width: `${cardWidth}px` }}>
        <span className="font-playfair font-medium text-[18px] leading-[22px] text-brand-brown block line-clamp-2">
          {dish.name}
        </span>
        {/* price + time row */}
        <div className="flex flex-row items-center gap-[10px]">
          <div className="flex items-center gap-[4px]">
            <VegDot isVeg={!!dish.isVeg} />
            <span className="font-roboto font-normal text-[13px] leading-[15px] text-brand-brown">₹{dish.price}</span>
          </div>
          <div className="flex items-center gap-[3px] opacity-70">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#C76A3A" strokeWidth="1" />
              <line x1="6" y1="3" x2="6" y2="6.5" stroke="#C76A3A" strokeWidth="1" strokeLinecap="round" />
              <line x1="6" y1="6.5" x2="8" y2="6.5" stroke="#C76A3A" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-roboto font-light text-[11px] leading-[17px] text-brand-accent">
              {dish.time}
            </span>
          </div>
        </div>
        {/* description */}
        {dish.description && (
          <p className="font-inter font-normal text-[12px] leading-[18px] tracking-[0.02em] text-brand-muted m-0 line-clamp-2">
            {dish.description}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function MenuScreen({ onNavigateToSpecials, onNavigateToDrinks, onNavigateToTobacco }: MenuScreenProps) {
  const [activeTab, setActiveTab] = useState('pizza');
  const [filterType, setFilterType] = useState<'ALL' | 'VEG' | 'NON-VEG'>('ALL');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const ALL_CATEGORIES = ['Pizza', 'Sushi', 'Burger', 'Dimsum', 'Pasta', 'Rice Bowl', 'Main Course (Veg)', 'Noodles', 'Fried Rice', 'Curry', 'Rice', 'Bread', 'Main Course (Non-Veg)', 'Add-on', 'Jain Food', 'Baby Food', 'Dessert', 'Breakfast', 'G Bar Nibbles', 'Veg'];

  // Calculate which tabs actually have items based on the current veg/non-veg filter and search
  const CATEGORY_TABS = ALL_CATEGORIES.filter(catName => {
    const catLower = catName.toLowerCase().replace(/ /g, '');
    return dishes.some(d => {
      const dishCat = d.category?.toLowerCase().replace(/ /g, '') || '';
      if (dishCat !== catLower) return false;

      const searchMatch = !searchQuery ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category?.toLowerCase().includes(searchQuery.toLowerCase());
      if (!searchMatch) return false;

      if (filterType === 'VEG') return d.isVeg === true;
      if (filterType === 'NON-VEG') return d.isVeg === false;
      return true;
    });
  });

  // If current activeTab is hidden, switch to first available
  useEffect(() => {
    const activeTabExists = CATEGORY_TABS.some(t => t.toLowerCase().replace(/ /g, '') === activeTab);
    if (!activeTabExists && CATEGORY_TABS.length > 0) {
      setActiveTab(CATEGORY_TABS[0].toLowerCase().replace(/ /g, ''));
    }
  }, [CATEGORY_TABS, activeTab]);

  const filteredDishes = dishes.filter((d) => {
    const dishTab = d.category?.toLowerCase().replace(/ /g, '') || '';
    if (dishTab !== activeTab) return false;

    const searchMatch = !searchQuery ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!searchMatch) return false;

    if (filterType === 'VEG') return d.isVeg === true;
    if (filterType === 'NON-VEG') return d.isVeg === false;
    return true;
  });

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown pb-[100px] relative">
      <DishDetailModal
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
        dish={selectedDish || { name: '', image: '', price: 0, time: '' }}
      />
      <MenuCategoriesModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        onCategorySelect={(category) => {
          setIsMenuModalOpen(false);
          setActiveTab(category.toLowerCase().replace(/ /g, ''));
        }}
        type="food"
        availableCategories={CATEGORY_TABS}
      />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(count) => setActiveFilterCount(count)}
        type="food"
      />
      <SearchOverlay
        isOpen={isSearchActive}
        onClose={() => setIsSearchActive(false)}
        onSearch={(text) => setSearchQuery(text)}
        initialQuery={searchQuery}
        items={dishes}
      />

      <div className="max-w-[393px] mx-auto relative px-[15px] box-border">

        {/* Logo */}
        <div className="flex justify-center pt-[30px] pb-[10px]">
          <img src="/logo.png" alt="CSAT" className="w-[100px] h-[35px] object-contain" />
        </div>

        {/* Category cards row */}
        <div className="flex flex-row items-center gap-[25px] w-[290px] h-[100px] mx-auto mb-5">
          <CategoryCard
            label="Food"
            img="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200"
            active
          />
          <CategoryCard
            label="Drinks"
            img="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=200"
            onClick={onNavigateToDrinks}
          />
          <CategoryCard
            label="Tobacco"
            img="https://images.pexels.com/photos/4969832/pexels-photo-4969832.jpeg?auto=compress&cs=tinysrgb&w=200"
            onClick={onNavigateToTobacco}
          />
        </div>

        {/* Veg / All / Non-veg pill bar */}
        <div className="w-full h-[36px] rounded-[50px] border-[0.6px] border-brand-border shadow-[0px_2.3px_2px_rgba(124,63,32,0.25)] p-[3px] bg-brand-white box-border flex items-center mx-auto mb-4">
          <div className="flex flex-row items-center gap-[10px] w-full h-[30px]">
            {(['ALL', 'VEG', 'NON-VEG'] as const).map((f) => {
              const active = filterType === f;
              const pillWidth = active && f === 'NON-VEG' ? '112px' : '104px';
              return (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={[
                    'flex-1 h-[29px] rounded-[50px] cursor-pointer font-inter font-medium text-[14px] leading-[17px] transition-[background,color] duration-200 shrink-0 border-0 flex items-center justify-center',
                    active
                      ? 'bg-brand-brown border-[0.2px] border-brand-border text-white'
                      : 'bg-white text-brand-brown opacity-80',
                  ].join(' ')}
                  style={{ width: pillWidth }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nav tabs */}
        <div className="mt-3">
          <div className="flex flex-row items-start gap-[28px] overflow-x-auto [scrollbar-width:none]">
            {CATEGORY_TABS.map((tab) => {
              const isOffers = tab === 'Offers for you';
              const tabKey = tab.toLowerCase().replace(/ /g, '');
              const isActive = activeTab === tabKey;
              return (
                <div key={tab} className="flex flex-col items-center gap-[4px] shrink-0">
                  <div className="flex flex-row items-center gap-[3px]">
                    {isOffers && (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0">
                        <path d="M10 2L11.8 7.2H17.3L12.9 10.4L14.6 15.6L10 12.4L5.4 15.6L7.1 10.4L2.7 7.2H8.2L10 2Z" fill="#C76A3A" />
                      </svg>
                    )}
                    <button
                      onClick={() => {
                        if (isOffers) { onNavigateToSpecials(); }
                        else { setActiveTab(tabKey); }
                      }}
                      className={[
                        'bg-transparent border-0 cursor-pointer p-0 font-inter font-medium text-[16px] leading-[19px] whitespace-nowrap',
                        (!isOffers && isActive) ? 'text-brand-accent' : 'text-brand-border',
                      ].join(' ')}
                    >
                      {tab}
                    </button>
                  </div>
                  {isActive && !isOffers && (
                    <div className="w-full h-0 border-t-[3px] border-brand-accent rounded-[2px]" />
                  )}
                </div>
              );
            })}
          </div>
          {/* Divider */}
          <div className="h-px bg-brand-divider mt-[2px] mb-4" />
        </div>

        {/* Search bar */}
        <div className="box-border w-full h-[35px] bg-brand-white border-[0.6px] border-brand-border shadow-[1px_2px_2px_rgba(255,255,255,0.3)] rounded-[50px] mb-5 flex flex-row justify-between items-center px-[14px]">
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
            {activeFilterCount > 0 && (
              <div className="absolute left-[9px] top-0 w-[14px] h-[15px]">
                <div className="absolute left-0 top-[1px] w-[14px] h-[14px] rounded-full bg-brand-accent flex items-center justify-center">
                  <span className="font-roboto font-normal text-[9px] leading-[10px] text-white">
                    {activeFilterCount}
                  </span>
                </div>
              </div>
            )}
          </div> */}
        </div>

        {/* Dish grid */}
        <div className="flex flex-col gap-5 w-full">
          {filteredDishes.length === 0 ? (
            <div className="text-center text-brand-muted py-10 font-inter text-[14px]">
              No {filterType.toLowerCase()} items available
            </div>
          ) : (
            <>
              {/* Row 1: first 2 dishes — staggered */}
              {filteredDishes.slice(0, 2).length > 0 && (
                <div className="relative w-[351px] h-[260px] mx-auto shrink-0">
                  {filteredDishes[0] && (
                    <div className="absolute" style={{ left: '12px', top: '0px' }}>
                      <DishCard dish={filteredDishes[0]} onClick={() => setSelectedDish(filteredDishes[0])} />
                    </div>
                  )}
                  {filteredDishes[1] && (
                    <div className="absolute" style={{ left: '200px', top: '14px' }}>
                      <DishCard dish={filteredDishes[1]} onClick={() => setSelectedDish(filteredDishes[1])} />
                    </div>
                  )}
                </div>
              )}

              {/* Clear filters pill */}
              {activeFilterCount > 0 && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setActiveFilterCount(0)}
                    className="w-[146px] h-[33px] bg-brand-accent rounded-[80px] border-0 cursor-pointer flex justify-center items-center px-[10px]"
                  >
                    <span className="font-inter font-semibold text-[13px] leading-[16px] text-white">
                      Clear filters
                    </span>
                  </button>
                </div>
              )}

              {/* Subsequent rows: index 2 onwards — staggered 2-col */}
              {(() => {
                const remaining = filteredDishes.slice(2);
                const rows = [];
                for (let i = 0; i < remaining.length; i += 2) {
                  rows.push(remaining.slice(i, i + 2));
                }
                return rows.map((rowDishes, rowIndex) => (
                  <div key={rowIndex} className="relative w-[351px] h-[260px] mx-auto shrink-0">
                    {rowDishes[0] && (
                      <div className="absolute" style={{ left: '12px', top: '0px' }}>
                        <DishCard dish={rowDishes[0]} onClick={() => setSelectedDish(rowDishes[0])} />
                      </div>
                    )}
                    {rowDishes[1] && (
                      <div className="absolute" style={{ left: '200px', top: '14px' }}>
                        <DishCard dish={rowDishes[1]} onClick={() => setSelectedDish(rowDishes[1])} />
                      </div>
                    )}
                  </div>
                ));
              })()}


            </>
          )}
        </div>
      </div>

      <MenuFab onClick={() => setIsMenuModalOpen(true)} />
    </div>
  );
}
