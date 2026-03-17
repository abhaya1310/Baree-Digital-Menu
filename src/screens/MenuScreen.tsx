import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import DishDetailModal from '../DishDetailModal';
import MenuCategoriesModal from '../MenuCategoriesModal';
import FilterModal, { type FilterCriteria } from '../FilterModal';
import SearchOverlay from '../SearchOverlay';
import { useMenu } from '../context/MenuContext';
import type { ApiMenuItem, ApiCategory } from '../types/api';
import CategoryCard from '../components/ui/CategoryCard';
import MenuFab from '../components/ui/MenuFab';
import VegDot from '../components/ui/VegDot';

interface MenuScreenProps {
  onNavigateToSpecials?: () => void;
  activeGroup: string | null;
  onGroupChange: (group: string | null) => void;
  uniqueGroups: string[];
}

const GROUP_IMAGES: Record<string, string> = {
  Food: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200',
  Drinks: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=200',
  Tobacco: 'https://images.pexels.com/photos/4969832/pexels-photo-4969832.jpeg?auto=compress&cs=tinysrgb&w=200',
  Desserts: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=200',
};
const DEFAULT_GROUP_IMAGE = 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=200';

// ── Filter matching helper ───────────────────────────────────────────────────
function isItemFilteredOut(item: ApiMenuItem, criteria: FilterCriteria | null): boolean {
  if (!criteria) return false;

  if (criteria.allergies.length > 0 && item.allergies?.length) {
    const hasMatchingAllergy = item.allergies.some(a =>
      criteria.allergies.some(selected => a.toLowerCase().includes(selected.toLowerCase()))
    );
    if (hasMatchingAllergy) return true;
  }

  if (criteria.prepTime && item.prepTime) {
    if (criteria.prepTime === 'Quick bites' && item.prepTime > 5) return true;
    if (criteria.prepTime === '5-10 mins' && (item.prepTime < 5 || item.prepTime > 10)) return true;
    if (criteria.prepTime === '10-15 mins' && (item.prepTime < 10 || item.prepTime > 15)) return true;
    if (criteria.prepTime === '15+ mins' && item.prepTime < 15) return true;
  }

  if (criteria.priceMax > 0 && criteria.priceMax < 2000 && item.price > criteria.priceMax) return true;

  if (criteria.dietTypes.length > 0) {
    const itemFilters = (item.filters || []).map(f => f.value.toLowerCase());
    const itemLabel = (item.label || '').toLowerCase();
    const hasMatchingDiet = criteria.dietTypes.some(diet => {
      const d = diet.toLowerCase();
      return itemFilters.some(f => f.includes(d)) || itemLabel.includes(d);
    });
    if (!hasMatchingDiet) return true;
  }

  if (criteria.preferences.length > 0) {
    const itemFilters = (item.filters || []).map(f => f.value.toLowerCase());
    const hasMatchingPref = criteria.preferences.some(pref => {
      const p = pref.toLowerCase();
      return itemFilters.some(f => f.includes(p));
    });
    if (!hasMatchingPref) return true;
  }

  return false;
}

// ── Dish card ─────────────────────────────────────────────────────────────────
function DishCard({ dish, onClick, dimmed = false }: { dish: ApiMenuItem; onClick: () => void; dimmed?: boolean }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgSrc = dish.thumbnail || dish.image;

  return (
    <div
      onClick={dish.inStock ? onClick : undefined}
      className={[
        'flex flex-row items-start gap-3 w-full py-4 border-b border-brand-divider',
        !dish.inStock ? 'opacity-50' : dimmed ? 'opacity-40' : '',
        dish.inStock ? 'cursor-pointer' : '',
      ].join(' ')}
    >
      {/* Left: text content */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <VegDot isVeg={dish.veg} size={15} />
          <span className="font-playfair font-semibold text-[19px] leading-tight text-brand-brown truncate">
            {dish.name}
          </span>
        </div>

        {dish.recommended && (
          <div className="flex">
            <span className="font-inter font-semibold text-[10px] uppercase tracking-wide text-white px-2 py-0.5 bg-brand-accent rounded">
              Recommended
            </span>
          </div>
        )}

        <span className="font-roboto font-medium text-[15px] text-brand-brown">
          {'\u20B9'}{dish.price}
        </span>

        {dish.description && (
          <p className="font-inter font-normal text-[12px] leading-relaxed text-brand-muted line-clamp-2">
            {dish.description}
          </p>
        )}

        {!dish.inStock && (
          <span className="font-inter font-medium text-[11px] text-brand-nonVeg">
            Out of stock
          </span>
        )}

        {dish.prepTime && (
          <div className="flex items-center gap-1 opacity-60">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#C76A3A" strokeWidth="1" />
              <line x1="6" y1="3" x2="6" y2="6.5" stroke="#C76A3A" strokeWidth="1" strokeLinecap="round" />
              <line x1="6" y1="6.5" x2="8" y2="6.5" stroke="#C76A3A" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-roboto font-light text-[11px] text-brand-accent">
              {dish.prepTime} mins
            </span>
          </div>
        )}
      </div>

      {/* Right: dish image */}
      {imgSrc && !imgError ? (
        <div className="shrink-0 w-[90px] h-[90px] rounded-[8px] overflow-hidden bg-brand-divider">
          <img
            src={imgSrc}
            alt={dish.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      ) : (
        <div className="shrink-0 w-[90px] h-[90px]" />
      )}
    </div>
  );
}

// ── Child category section ───────────────────────────────────────────────────
function ChildCategorySection({
  category,
  filterType,
  searchQuery,
  filterCriteria,
  onItemClick,
  sectionRef,
}: {
  category: ApiCategory;
  filterType: 'ALL' | 'VEG' | 'NON-VEG';
  searchQuery: string;
  filterCriteria: FilterCriteria | null;
  onItemClick: (item: ApiMenuItem) => void;
  sectionRef?: (el: HTMLDivElement | null) => void;
}) {
  const items = useMemo(() => {
    let filtered = category.items;
    if (filterType === 'VEG') filtered = filtered.filter(i => i.veg);
    if (filterType === 'NON-VEG') filtered = filtered.filter(i => !i.veg);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q) ||
        category.name.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [category.items, category.name, filterType, searchQuery]);

  if (items.length === 0) return null;

  return (
    <div ref={sectionRef} data-category-id={category.id} className="mb-2">
      {/* Section header */}
      <div className="flex items-center gap-[8px] px-1 py-[10px] mb-1">
        <span className="font-playfair font-semibold text-[16px] leading-[20px] text-brand-brown">
          {category.name}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-40 mt-[1px]">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="#7C3F20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-inter font-normal text-[12px] text-brand-muted ml-auto">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Items list */}
      <div className="flex flex-col w-full">
        {items.map((dish) => (
          <DishCard key={dish.id} dish={dish} onClick={() => onItemClick(dish)} dimmed={isItemFilteredOut(dish, filterCriteria)} />
        ))}
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function MenuScreen({ onNavigateToSpecials, activeGroup, onGroupChange, uniqueGroups }: MenuScreenProps) {
  const { menu, categories, allItems, parentCategories, getChildCategories } = useMenu();

  const [filterType, setFilterType] = useState<'ALL' | 'VEG' | 'NON-VEG'>('ALL');
  const [selectedDish, setSelectedDish] = useState<ApiMenuItem | null>(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Parent category tab state: null = "Offers for you"
  const [activeParentId, setActiveParentId] = useState<string | null>(null);

  // Refs for scroll-based category highlighting
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isUserTabClick = useRef(false);

  const showGroupCards = uniqueGroups.length > 1;
  const showLargerLogo = uniqueGroups.length <= 1;

  const logoUrl = menu?.outlet?.brand?.logo;

  // Initialize activeGroup to first group if not set
  useEffect(() => {
    if (activeGroup === null && uniqueGroups.length > 0) {
      onGroupChange(uniqueGroups[0]);
    }
  }, [activeGroup, uniqueGroups, onGroupChange]);

  // Filter parent categories by active group
  const groupFilteredParentCategories = useMemo(() => {
    if (!activeGroup) return parentCategories;
    return parentCategories.filter(cat => (cat.group || 'Food') === activeGroup);
  }, [parentCategories, activeGroup]);

  // All categories filtered by group
  const groupFilteredCategories = useMemo(() => {
    if (!activeGroup) return categories;
    return categories.filter(cat => (cat.group || 'Food') === activeGroup);
  }, [categories, activeGroup]);

  // Recommended items across all group-filtered categories
  const recommendedItems = useMemo(() => {
    return groupFilteredCategories
      .flatMap(cat => cat.items)
      .filter(item => item.recommended);
  }, [groupFilteredCategories]);

  const hasRecommended = recommendedItems.length > 0;

  // Initialize activeParentId when parent categories load
  useEffect(() => {
    if (groupFilteredParentCategories.length > 0 && activeParentId === null && !hasRecommended) {
      setActiveParentId(groupFilteredParentCategories[0].id);
    }
  }, [groupFilteredParentCategories, activeParentId, hasRecommended]);

  const handleParentTabChange = useCallback((parentId: string | null) => {
    isUserTabClick.current = true;
    setActiveParentId(parentId);
    setTimeout(() => { isUserTabClick.current = false; }, 500);
  }, []);

  // Reset parent tab when group changes
  useEffect(() => {
    if (hasRecommended) {
      setActiveParentId(null);
    } else if (groupFilteredParentCategories.length > 0) {
      setActiveParentId(groupFilteredParentCategories[0].id);
    }
  }, [activeGroup]);

  // Auto-switch filter based on search results
  useEffect(() => {
    if (searchQuery) {
      const searchedItems = allItems.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (searchedItems.length > 0) {
        const hasVeg = searchedItems.some(d => d.veg === true);
        const hasNonVeg = searchedItems.some(d => d.veg === false);

        if (filterType === 'VEG' && !hasVeg && hasNonVeg) {
          setFilterType('NON-VEG');
        } else if (filterType === 'NON-VEG' && !hasNonVeg && hasVeg) {
          setFilterType('VEG');
        }
      }
    }
  }, [searchQuery]);

  // Get child categories for the active parent
  const activeChildCategories = useMemo(() => {
    if (!activeParentId) return [];
    const children = getChildCategories(activeParentId);
    return children.filter(cat => {
      let items = cat.items;
      if (filterType === 'VEG') items = items.filter(i => i.veg);
      if (filterType === 'NON-VEG') items = items.filter(i => !i.veg);
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        items = items.filter(i =>
          i.name.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q) ||
          cat.name.toLowerCase().includes(q)
        );
      }
      return items.length > 0;
    });
  }, [activeParentId, getChildCategories, filterType, searchQuery]);

  // IntersectionObserver to track which section is visible and update parent tab
  useEffect(() => {
    if (!activeParentId) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isUserTabClick.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const categoryId = entry.target.getAttribute('data-category-id');
            if (categoryId) {
              const cat = categories.find(c => c.id === categoryId);
              if (cat) {
                const parentId = cat.parentId || cat.id;
                if (parentId !== activeParentId) {
                  setActiveParentId(parentId);
                }
              }
            }
            break;
          }
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeChildCategories, activeParentId, categories]);

  // Auto-scroll the parent tab bar to keep the active tab visible
  useEffect(() => {
    const activeTab = tabRefs.current.get(activeParentId || 'offers');
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeParentId]);

  // If the parent has no children but has items directly
  const parentDirectItems = useMemo(() => {
    if (!activeParentId) return [];
    const children = getChildCategories(activeParentId);
    if (children.length > 0) return [];
    const parentCat = groupFilteredCategories.find(c => c.id === activeParentId);
    if (!parentCat) return [];
    let items = parentCat.items;
    if (filterType === 'VEG') items = items.filter(i => i.veg);
    if (filterType === 'NON-VEG') items = items.filter(i => !i.veg);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q) ||
        parentCat.name.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeParentId, getChildCategories, groupFilteredCategories, filterType, searchQuery]);

  // Filtered recommended items for "Offers for you" tab
  const filteredRecommended = useMemo(() => {
    let items = recommendedItems;
    if (filterType === 'VEG') items = items.filter(i => i.veg);
    if (filterType === 'NON-VEG') items = items.filter(i => !i.veg);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q)
      );
    }
    return items;
  }, [recommendedItems, filterType, searchQuery]);

  // Build search items for SearchOverlay — use allItems (across all groups)
  const searchItems = allItems.map(item => ({ name: item.name, category: categories.find(c => c.items.some(i => i.id === item.id))?.name }));

  // Build parent tab names for MenuCategoriesModal
  const parentTabNames = useMemo(() => {
    const names: string[] = [];
    if (hasRecommended) names.push('Offers for you');
    groupFilteredParentCategories.forEach(cat => {
      const children = getChildCategories(cat.id);
      const hasVisibleItems = children.length > 0
        ? children.some(child => {
            if (filterType === 'ALL') return child.items.length > 0;
            if (filterType === 'VEG') return child.items.some(i => i.veg);
            return child.items.some(i => !i.veg);
          })
        : (filterType === 'ALL'
            ? cat.items.length > 0
            : filterType === 'VEG'
              ? cat.items.some(i => i.veg)
              : cat.items.some(i => !i.veg));
      if (hasVisibleItems) names.push(cat.name);
    });
    return names;
  }, [groupFilteredParentCategories, getChildCategories, filterType, hasRecommended]);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown pb-[100px] relative">
      <DishDetailModal
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
        dish={selectedDish}
      />
      <MenuCategoriesModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        onCategorySelect={(category) => {
          setIsMenuModalOpen(false);
          const found = groupFilteredParentCategories.find(
            (c) => c.name.toLowerCase() === category.toLowerCase()
          );
          if (found) handleParentTabChange(found.id);
          else if (category.toLowerCase() === 'offers for you') handleParentTabChange(null);
        }}
        type="food"
        availableCategories={parentTabNames}
      />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(criteria, count) => {
          setFilterCriteria(count > 0 ? criteria : null);
          setActiveFilterCount(count);
        }}
        type="food"
      />
      <SearchOverlay
        isOpen={isSearchActive}
        onClose={() => setIsSearchActive(false)}
        onSearch={(text) => {
          // Find the item's category and switch to its parent tab
          const lowerTerm = text.toLowerCase();
          for (const cat of categories) {
            const foundItem = cat.items.find(i => i.name.toLowerCase() === lowerTerm);
            if (foundItem) {
              const parentId = cat.parentId || cat.id;
              setActiveParentId(parentId);
              setFilterType('ALL');
              setSearchQuery('');
              setSelectedDish(foundItem);
              setIsSearchActive(false);
              return;
            }
          }
          // Fallback: just set search query
          setSearchQuery(text);
        }}
        initialQuery={searchQuery}
        items={allItems}
      />

      <div className="max-w-[393px] mx-auto relative px-[15px] box-border">

        {/* Logo */}
        <div className="flex justify-center pt-[30px] pb-[10px]">
          {logoUrl ? (
            <img src={logoUrl} alt={menu?.outlet?.brand?.name || 'Menu'} className={showLargerLogo ? 'w-[140px] h-[50px] object-contain' : 'w-[100px] h-[35px] object-contain'} />
          ) : (
            <span className="font-playfair font-semibold text-brand-brown text-[22px]">{menu?.outlet?.brand?.name || 'Menu'}</span>
          )}
        </div>

        {/* Dynamic group cards row */}
        {showGroupCards && (
          <div className="flex flex-row items-center gap-[25px] justify-center h-[100px] mx-auto mb-5">
            {uniqueGroups.map((group) => (
              <CategoryCard
                key={group}
                label={group}
                img={GROUP_IMAGES[group] || DEFAULT_GROUP_IMAGE}
                active={activeGroup === group}
                onClick={() => onGroupChange(group)}
              />
            ))}
          </div>
        )}

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

        {/* Parent category tabs */}
        <div className="mt-3">
          <div className="flex flex-row items-start gap-[28px] overflow-x-auto [scrollbar-width:none]">
            {/* Offers for you tab — only if there are recommended items */}
            {hasRecommended && (
              <div className="flex flex-col items-center gap-[4px] shrink-0">
                <div className="flex flex-row items-center gap-[3px]">
                  <button
                    ref={(el) => { if (el) tabRefs.current.set('offers', el); else tabRefs.current.delete('offers'); }}
                    onClick={() => handleParentTabChange(null)}
                    className={[
                      'bg-transparent border-0 cursor-pointer p-0 font-inter font-medium text-[16px] leading-[19px] whitespace-nowrap',
                      activeParentId === null ? 'text-brand-accent' : 'text-brand-border',
                    ].join(' ')}
                  >
                    Offers for you
                  </button>
                </div>
                {activeParentId === null && (
                  <div className="w-full h-0 border-t-[3px] border-brand-accent rounded-[2px]" />
                )}
              </div>
            )}

            {/* Parent category tabs */}
            {groupFilteredParentCategories.map((cat) => {
              const isActive = activeParentId === cat.id;
              const children = getChildCategories(cat.id);
              const hasVisibleItems = children.length > 0
                ? children.some(child => {
                    if (filterType === 'ALL') return child.items.length > 0;
                    if (filterType === 'VEG') return child.items.some(i => i.veg);
                    return child.items.some(i => !i.veg);
                  })
                : (filterType === 'ALL'
                    ? cat.items.length > 0
                    : filterType === 'VEG'
                      ? cat.items.some(i => i.veg)
                      : cat.items.some(i => !i.veg));

              if (!hasVisibleItems) return null;

              return (
                <div key={cat.id} className="flex flex-col items-center gap-[4px] shrink-0">
                  <button
                    ref={(el) => { if (el) tabRefs.current.set(cat.id, el); else tabRefs.current.delete(cat.id); }}
                    onClick={() => handleParentTabChange(cat.id)}
                    className={[
                      'bg-transparent border-0 cursor-pointer p-0 font-inter font-medium text-[16px] leading-[19px] whitespace-nowrap',
                      isActive ? 'text-brand-accent' : 'text-brand-border',
                    ].join(' ')}
                  >
                    {cat.name}
                  </button>
                  {isActive && (
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

        {/* ═══════ Content Area ═══════ */}

        {/* "Offers for you" tab content */}
        {activeParentId === null && hasRecommended && (
          <div className="flex flex-col w-full">
            {filteredRecommended.length === 0 ? (
              <div className="text-center text-brand-muted py-10 font-inter text-[14px]">
                No {filterType.toLowerCase()} recommended items available
              </div>
            ) : (
              filteredRecommended.map((dish) => (
                <DishCard key={dish.id} dish={dish} onClick={() => setSelectedDish(dish)} dimmed={isItemFilteredOut(dish, filterCriteria)} />
              ))
            )}
          </div>
        )}

        {/* Parent category content — child sections with continuous scroll */}
        {activeParentId !== null && activeChildCategories.length > 0 && (
          <div className="flex flex-col gap-1 w-full">
            {activeChildCategories.map((child) => (
              <ChildCategorySection
                key={child.id}
                category={child}
                filterType={filterType}
                searchQuery={searchQuery}
                filterCriteria={filterCriteria}
                onItemClick={setSelectedDish}
                sectionRef={(el) => {
                  if (el) sectionRefs.current.set(child.id, el);
                  else sectionRefs.current.delete(child.id);
                }}
              />
            ))}
          </div>
        )}

        {/* Parent has direct items (no children) */}
        {activeParentId !== null && activeChildCategories.length === 0 && parentDirectItems.length > 0 && (
          <div className="flex flex-col w-full">
            {parentDirectItems.map((dish) => (
              <DishCard key={dish.id} dish={dish} onClick={() => setSelectedDish(dish)} dimmed={isItemFilteredOut(dish, filterCriteria)} />
            ))}
          </div>
        )}

        {/* Empty state when parent selected but no items */}
        {activeParentId !== null && activeChildCategories.length === 0 && parentDirectItems.length === 0 && (
          <div className="text-center text-brand-muted py-10 font-inter text-[14px]">
            No {filterType.toLowerCase()} items available in this category
          </div>
        )}

        {/* Clear filters pill */}
        {activeFilterCount > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => { setActiveFilterCount(0); setFilterCriteria(null); }}
              className="w-[146px] h-[33px] bg-brand-accent rounded-[80px] border-0 cursor-pointer flex justify-center items-center px-[10px]"
            >
              <span className="font-inter font-semibold text-[13px] leading-[16px] text-white">
                Clear filters
              </span>
            </button>
          </div>
        )}
      </div>

      <MenuFab onClick={() => setIsMenuModalOpen(true)} />
    </div>
  );
}
