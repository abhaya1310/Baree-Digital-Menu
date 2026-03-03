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
function DishCard({ dish, onClick }: { dish: Dish; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start gap-1 cursor-pointer w-full py-4 border-b border-brand-divider"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <VegDot isVeg={!!dish.isVeg} size={15} />
              <span className="font-playfair font-semibold text-[20px] leading-tight text-brand-brown">
                {dish.name}
              </span>
            </div>
            {dish.badge && (
              <div className="flex">
                <span className="font-inter font-semibold text-[10px] uppercase tracking-wide text-white px-2 py-0.5 bg-brand-accent rounded">
                  {dish.badge}
                </span>
              </div>
            )}
          </div>
          <span className="font-roboto font-medium text-[16px] text-brand-brown shrink-0 ml-4 pt-1">
            ₹{dish.price}
          </span>
        </div>

        {dish.description && (
          <p className="font-inter font-normal text-[13px] leading-relaxed text-brand-muted line-clamp-3 mt-1">
            {dish.description}
          </p>
        )}
        
        {dish.time && (
          <div className="flex items-center gap-1 mt-1 opacity-60">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#C76A3A" strokeWidth="1" />
              <line x1="6" y1="3" x2="6" y2="6.5" stroke="#C76A3A" strokeWidth="1" strokeLinecap="round" />
              <line x1="6" y1="6.5" x2="8" y2="6.5" stroke="#C76A3A" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-roboto font-light text-[11px] text-brand-accent">
              {dish.time}
            </span>
          </div>
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

  // Auto-switch filter based on search results
  useEffect(() => {
    if (searchQuery) {
      const searchedDishes = dishes.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (searchedDishes.length > 0) {
        const hasVeg = searchedDishes.some(d => d.isVeg === true);
        const hasNonVeg = searchedDishes.some(d => d.isVeg === false);

        // If current filter shows no results but opposite filter has results, switch
        if (filterType === 'VEG' && !hasVeg && hasNonVeg) {
          setFilterType('NON-VEG');
        } else if (filterType === 'NON-VEG' && !hasNonVeg && hasVeg) {
          setFilterType('VEG');
        } else if (filterType === 'ALL' && searchedDishes.length > 0) {
          // Keep ALL if it has results
        }
      }
    }
  }, [searchQuery]);

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
        <div className="box-border w-full h-[35px] bg-brand-white border-[0.6px] border-brand-border shadow-[1px_2px_2px_rgba(255,255,255,0.3)] rounded-[50px] mb-5 flex flex-row justify-between items-center px-[14px] transition-all duration-200">
          <div
            className="flex flex-row items-center gap-[10px] cursor-pointer flex-1 transition-opacity duration-150 active:opacity-70"
            onClick={() => setIsSearchActive(true)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="rgba(124, 63, 32, 0.8)" strokeWidth="1.5" />
              <line x1="11" y1="11" x2="15" y2="15" stroke="rgba(124, 63, 32, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {searchQuery ? (
              <span className="font-roboto font-normal text-[12px] text-brand-brown">{searchQuery}</span>
            ) : (
              <span className="font-roboto font-normal text-[12px] text-brand-brown opacity-60">Search items...</span>
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
        </div>

        {/* Dish list - Full width rows */}
        <div className="flex flex-col w-full">
          {filteredDishes.length === 0 ? (
            <div className="text-center text-brand-muted py-10 font-inter text-[14px]">
              No {filterType.toLowerCase()} items available
            </div>
          ) : (
            <>
              {filteredDishes.map((dish) => (
                <DishCard key={dish.name} dish={dish} onClick={() => setSelectedDish(dish)} />
              ))}

              {/* Clear filters pill */}
              {activeFilterCount > 0 && (
                <div className="flex justify-center mt-6">
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
            </>
          )}
        </div>
      </div>

      <MenuFab onClick={() => setIsMenuModalOpen(true)} />
    </div>
  );
}
