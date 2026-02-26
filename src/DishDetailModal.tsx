import { useEffect } from 'react';
import VegDot from './components/ui/VegDot';

interface Addon {
  name: string;
  price: number;
  image: string;
}

interface Dish {
  name: string;
  image: string;
  price: number;
  time?: string;
  description?: string;
  isVeg?: boolean;
  calories?: string;
  ingredients?: string[];
  addons?: Addon[];
}

interface DishDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dish: Dish;
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

  if (!isOpen) return null;

  const description =
    dish.description ||
    'Traditional melt-in-mouth kebab made with finely minced meat, marinated in a secret blend of spices, and slow-cooked to perfection.';

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

        {/* ── Image + name/price block ── */}
        <div className="flex flex-col items-start gap-[5px] w-[208px] mt-[20px] ml-[20px]">

          {/* Dish image */}
          <div
            className={[
              'w-[208px] h-[180px] overflow-hidden box-border shrink-0',
              isDrink ? '' : 'border-[0.5px] border-[rgba(169,113,47,0.2)] rounded-[10px]',
            ].join(' ')}
          >
            <img
              src={dish.image} alt={dish.name}
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Name + price/time */}
          <div className="flex flex-col items-start gap-[13px] w-[216px]">

            {/* Name + veg dot (veg dot hidden for drinks) */}
            <div className="flex flex-row items-end gap-[5px] w-[216px]">
              <span className="font-playfair font-medium text-[30px] leading-[36px] text-brand-brown">
                {dish.name.replace(/\b\w/g, c => c.toUpperCase())}
              </span>
              {!isDrink && <VegDot isVeg={!!dish.isVeg} />}
            </div>

            {/* Price + time (time hidden for drinks) */}
            <div className="flex flex-row items-center gap-[25px] w-[141px] h-[19px]">
              <span className="font-roboto font-normal text-[16px] leading-[19px] text-brand-accent">
                ₹{dish.price}
              </span>
              {!isDrink && (
                <div className="flex flex-row items-center gap-[3px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="#C76A3A" strokeWidth="1.4" />
                    <path d="M8 5V8.5L10.5 10" stroke="#C76A3A" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span className="font-roboto font-normal text-[16px] leading-[19px] text-brand-accent">
                    {dish.time}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Scrollable content sections ── */}
        <div className="flex flex-col items-start gap-[35px] w-[213px] mt-[28px] mb-[40px] ml-[23px]">

          {/* Description */}
          <div className="flex flex-col items-start gap-[10px] w-[213px]">
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
        </div>
      </div>
    </>
  );
};

export default DishDetailModal;
