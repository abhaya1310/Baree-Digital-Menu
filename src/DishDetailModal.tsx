import { useEffect } from 'react';
import VegDot from './components/ui/VegDot';
import type { ApiMenuItem } from './types/api';

interface DishDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dish: ApiMenuItem | null;
  type?: 'food' | 'drink' | 'tobacco';
}

// ── Reusable section heading row (icon + label) ──
function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-row items-center gap-[5px]">
      {icon}
      <span className="font-playfair font-medium text-[20px] leading-[24px] text-brand-brown">
        {label}
      </span>
    </div>
  );
}

const DishDetailModal = ({ isOpen, onClose, dish, type = 'food' }: DishDetailModalProps) => {
  const isDrink = type === 'drink';

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !dish) return null;

  const description = dish.description || 'No description available.';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80] bg-[rgba(22,43,57,0.7)] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Right-side panel — 270px, rounded left corners */}
      <div className="fixed top-0 right-0 bottom-0 w-[270px] bg-brand-cream rounded-l-[30px] z-[90] overflow-y-auto overflow-x-hidden [scrollbar-width:none]">

        <div className="flex flex-row justify-between items-center w-[230px] h-[32px] mt-[35px] ml-[23px]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.25)] rounded-full border-none cursor-pointer flex items-center justify-center shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="2" y1="2" x2="12" y2="12" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="2" x2="2" y2="12" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Name + price/time block ── */}
        <div className="flex flex-col items-start gap-4 w-full mt-8 ml-[23px] pr-[23px]">

          {/* Name + veg dot (veg dot hidden for drinks) */}
          <div className="flex items-center gap-3 w-full">
            {!isDrink && <VegDot isVeg={dish.veg} size={18} />}
            <span className="font-playfair font-bold text-[32px] leading-tight text-brand-brown">
              {dish.name.replace(/\b\w/g, c => c.toUpperCase())}
            </span>
          </div>

          {/* Out of stock indicator */}
          {!dish.inStock && (
            <span className="font-inter font-medium text-[12px] text-brand-nonVeg">
              Currently out of stock
            </span>
          )}

          {/* Recommended badge */}
          {dish.recommended && (
            <span className="font-inter font-semibold text-[10px] uppercase tracking-wide text-white px-2 py-0.5 bg-brand-accent rounded">
              Recommended
            </span>
          )}

          {/* Price + time (time hidden for drinks) */}
          <div className="flex flex-row items-center gap-6 h-[19px]">
            <span className="font-roboto font-semibold text-[20px] leading-[19px] text-brand-accent">
              ₹{dish.price}
            </span>
            {!isDrink && dish.prepTime && (
              <div className="flex flex-row items-center gap-[6px]">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#C76A3A" strokeWidth="1.4" />
                  <path d="M8 5V8.5L10.5 10" stroke="#C76A3A" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <span className="font-roboto font-normal text-[18px] leading-[19px] text-brand-accent">
                  {dish.prepTime} mins
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Scrollable content sections ── */}
        <div className="flex flex-col items-start gap-[35px] w-[213px] mt-[35px] mb-[40px] ml-[23px]">

          {/* Description */}
          <div className="flex flex-col items-start gap-[12px] w-[213px]">
            <SectionHeading
              label="Description"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 4.5C4 3.4 4.9 2.5 6 2.5H17V17.5H6C4.9 17.5 4 18.4 4 19.5V4.5Z" stroke="#7C3F20" strokeWidth="1.3" />
                  <path d="M4 19.5C4 18.4 4.9 17.5 6 17.5H17" stroke="#7C3F20" strokeWidth="1.3" />
                  <line x1="7.5" y1="7" x2="14" y2="7" stroke="#7C3F20" strokeWidth="1.1" strokeLinecap="round" />
                  <line x1="7.5" y1="10" x2="14" y2="10" stroke="#7C3F20" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              }
            />
            <p
              className={[
                'font-normal text-[12px] leading-[18px] text-justify text-brand-muted m-0 w-[213px]',
                isDrink ? 'font-roboto' : 'font-inter',
              ].join(' ')}
            >
              {description}
            </p>
          </div>

          {/* Variant Groups */}
          {dish.variantGroups && dish.variantGroups.length > 0 && (
            <div className="flex flex-col items-start gap-[12px] w-[213px]">
              <SectionHeading
                label="Variants"
                icon={
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#7C3F20" strokeWidth="1.3" />
                    <circle cx="11" cy="11" r="3" stroke="#7C3F20" strokeWidth="1.3" />
                  </svg>
                }
              />
              {dish.variantGroups.map(group => (
                <div key={group.id} className="w-full">
                  <p className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-wide mb-1">{group.name}</p>
                  {group.variants.map(variant => (
                    <div key={variant.id} className="flex justify-between items-center py-1">
                      <span className="font-inter font-normal text-[12px] text-brand-brown">{variant.name}</span>
                      {variant.priceOffset !== 0 && (
                        <span className="font-roboto font-normal text-[12px] text-brand-accent">
                          {variant.priceOffset > 0 ? '+' : ''}₹{variant.priceOffset}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Addon Groups */}
          {dish.addonGroups && dish.addonGroups.length > 0 && (
            <div className="flex flex-col items-start gap-[12px] w-[213px]">
              <SectionHeading
                label="Add-ons"
                icon={
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#7C3F20" strokeWidth="1.3" />
                    <line x1="11" y1="7" x2="11" y2="15" stroke="#7C3F20" strokeWidth="1.3" strokeLinecap="round" />
                    <line x1="7" y1="11" x2="15" y2="11" stroke="#7C3F20" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                }
              />
              {dish.addonGroups.map(group => (
                <div key={group.id} className="w-full">
                  <p className="font-inter font-medium text-[11px] text-brand-muted uppercase tracking-wide mb-1">
                    {group.name}
                    {group.freeLimit > 0 && <span className="text-brand-accent"> ({group.freeLimit} free)</span>}
                  </p>
                  {group.addons.map(addon => (
                    <div key={addon.id} className="flex justify-between items-center py-1">
                      <div className="flex items-center gap-1.5">
                        <VegDot isVeg={addon.isVeg} size={10} />
                        <span className="font-inter font-normal text-[12px] text-brand-brown">{addon.name}</span>
                      </div>
                      {addon.price > 0 && (
                        <span className="font-roboto font-normal text-[12px] text-brand-accent">
                          +₹{addon.price}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DishDetailModal;
