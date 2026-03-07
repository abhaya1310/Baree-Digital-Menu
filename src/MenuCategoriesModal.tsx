import { useEffect } from 'react';
import { 
  Pizza, Fish, Sandwich, Cookie, Coffee, Utensils, Wheat, 
  Wine, Beer, GlassWater, Flame, Wind, 
  Soup, Star, Beef, UtensilsCrossed, Cherry,
  Waves, PartyPopper, CakeSlice, CupSoda
} from 'lucide-react';

interface MenuCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (category: string) => void;
  availableCategories?: string[];
}

// Icon mapping helper
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  
  // Food
  if (name.includes('pizza')) return <Pizza size={18} className="text-[#6D4C41]" />;
  if (name.includes('sushi') || name.includes('fish')) return <Fish size={18} className="text-[#6D4C41]" />;
  if (name.includes('burger') || name.includes('sandwich')) return <Sandwich size={18} className="text-[#6D4C41]" />;
  if (name.includes('dessert') || name.includes('sweet')) return <CakeSlice size={18} className="text-[#6D4C41]" />;
  if (name.includes('pasta') || name.includes('noodle')) return <UtensilsCrossed size={18} className="text-[#6D4C41]" />;
  if (name.includes('rice') || name.includes('bowl')) return <Soup size={18} className="text-[#6D4C41]" />;
  if (name.includes('bread') || name.includes('nibbles')) return <Wheat size={18} className="text-[#6D4C41]" />;
  if (name.includes('starter') || name.includes('dimsum')) return <Cookie size={18} className="text-[#6D4C41]" />;
  if (name.includes('breakfast')) return <Coffee size={18} className="text-[#6D4C41]" />;
  if (name.includes('main') || name.includes('course')) return <Beef size={18} className="text-[#6D4C41]" />;
  if (name.includes('veg')) return <Cherry size={18} className="text-[#6D4C41]" />;

  // Drinks
  if (name.includes('beer')) return <Beer size={18} className="text-[#6D4C41]" />;
  if (name.includes('wine')) return <Wine size={18} className="text-[#6D4C41]" />;
  if (name.includes('cocktail') || name.includes('mocktail')) return <Wine size={18} className="text-[#6D4C41]" />;
  if (name.includes('drink') || name.includes('shake') || name.includes('juice')) return <CupSoda size={18} className="text-[#6D4C41]" />;
  if (name.includes('whiskey') || name.includes('liquor') || name.includes('rum') || name.includes('vodka') || name.includes('gin') || name.includes('tequila')) return <GlassWater size={18} className="text-[#6D4C41]" />;
  
  // Tobacco
  if (name.includes('classic')) return <Flame size={18} className="text-[#6D4C41]" />;
  if (name.includes('mix')) return <Wind size={18} className="text-[#6D4C41]" />;
  if (name.includes('special')) return <PartyPopper size={18} className="text-[#6D4C41]" />;

  // Fallback
  return <Utensils size={18} className="text-[#6D4C41]" />;
};

export default function MenuCategoriesModal({ isOpen, onClose, onCategorySelect, availableCategories = [] }: MenuCategoriesModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(22,43,57,0.7)]"
      onClick={onClose}
    >
      {/* Bottom sheet */}
      <div
        className="w-[393px] max-h-[80vh] bg-white rounded-t-[40px] flex flex-col items-center relative pb-[30px]"
        onClick={e => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="font-playfair font-semibold text-[32px] leading-[40px] text-black mt-[45px] mb-[35px] text-center w-full">
          Our menu
        </h2>

        {/* Scrollable Categories List - 2 Columns */}
        <div className="w-full px-[40px] overflow-y-auto [scrollbar-width:none]">
          <div className="grid grid-cols-2 gap-y-[35px] gap-x-[10px]">
            {availableCategories.map(catName => (
              <div
                key={catName}
                onClick={() => onCategorySelect?.(catName)}
                className="flex flex-row items-center gap-[12px] cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-center w-[20px] h-[20px]">
                  {getCategoryIcon(catName)}
                </div>
                <span className="font-playfair font-medium text-[20px] leading-[24px] text-[#4A4A4A]">
                  {catName}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Circular Close Button at bottom */}
        <div className="mt-[40px] flex justify-center w-full">
          <button
            onClick={onClose}
            className="w-[60px] h-[60px] bg-white rounded-full border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
      </div>
    </div>
  );
}
