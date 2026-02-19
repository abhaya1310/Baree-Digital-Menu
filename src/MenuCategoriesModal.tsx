import { useEffect } from 'react';
import { drinkCategories, foodCategories } from './data/categories';

interface MenuCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (category: string) => void;
  type?: 'food' | 'drinks';
}

export default function MenuCategoriesModal({ isOpen, onClose, onCategorySelect, type = 'food' }: MenuCategoriesModalProps) {
  const displayCategories = type === 'food' ? foodCategories : drinkCategories;
  const title = type === 'food' ? 'Menu categories' : 'Drink categories';

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
      {/* Bottom sheet — 393px, #FAF7F2, rounded top corners */}
      <div
        className="w-[393px] max-h-[600px] bg-[#FAF7F2] rounded-t-[40px] overflow-y-auto relative pb-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header row */}
        <div className="flex flex-row justify-between items-center w-[340px] mx-auto mt-[26px]">
          <span className="font-playfair font-medium text-[18px] leading-[24px] text-black">
            {title}
          </span>
          <button
            onClick={onClose}
            className="w-[24px] h-[24px] bg-[#F8F1ED] rounded-full border-none cursor-pointer flex items-center justify-center p-0 shrink-0"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <line x1="1" y1="1" x2="9" y2="9" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="1" x2="1" y2="9" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Categories grid — 2 columns, gap 15 between rows */}
        <div className="flex flex-col gap-[15px] w-[305px] mx-auto mt-[30px]">
          {Array.from({ length: Math.ceil(displayCategories.length / 2) }, (_, rowIdx) => {
            const pair = displayCategories.slice(rowIdx * 2, rowIdx * 2 + 2);
            return (
              <div key={rowIdx} className="flex flex-row items-center gap-[25px] w-[305px] h-[100px]">
                {pair.map(cat => (
                  <div
                    key={cat.name}
                    onClick={() => onCategorySelect?.(cat.name)}
                    className="relative w-[140px] h-[100px] rounded-[15px] overflow-hidden cursor-pointer shrink-0"
                  >
                    {/* Background image */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/35" />
                    {/* Category label */}
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-inter font-semibold text-[18px] leading-[22px] text-center text-[#FAF7F2] w-[90%]">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
