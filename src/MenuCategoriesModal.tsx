import { useEffect } from 'react';
import { useMenu } from './context/MenuContext';

interface MenuCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (category: string) => void;
  type?: 'food' | 'drinks' | 'tobacco';
  availableCategories?: string[];
}

function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

export default function MenuCategoriesModal({ isOpen, onClose, onCategorySelect, type = 'food', availableCategories }: MenuCategoriesModalProps) {
  const { categories } = useMenu();

  // Use API categories for food, fall back to availableCategories for drinks/tobacco
  const displayCategories = availableCategories
    ? availableCategories.map(name => ({ name }))
    : categories.map(cat => ({ name: cat.name }));

  const title = type === 'food' ? 'Our menu' : type === 'drinks' ? 'Drinks menu' : 'Tobacco menu';

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
        className="w-[393px] max-h-[60vh] bg-[#FAF7F2] rounded-t-[24px] flex flex-col items-center relative pb-[30px]"
        onClick={e => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="font-playfair font-semibold text-[20px] leading-[28px] text-black mt-[20px] mb-4 text-center w-full">
          {title}
        </h2>

        {/* Scrollable Categories List - 2 Columns */}
        <div className="w-full px-[40px] overflow-y-auto [scrollbar-width:none]">
          <div className="grid grid-cols-2 gap-y-3 gap-x-[10px]">
            {displayCategories.map(cat => (
              <div
                key={cat.name}
                onClick={() => onCategorySelect?.(cat.name)}
                className="cursor-pointer hover:opacity-70 transition-opacity py-3"
              >
                <span className="font-playfair font-medium text-[20px] leading-[24px] text-[#4A4A4A]">
                  {toTitleCase(cat.name)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Circular Close Button at bottom */}
        <div className="py-3 flex justify-center w-full">
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] bg-white rounded-full border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
