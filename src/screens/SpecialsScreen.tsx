import { ChevronRight } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import VegDot from '../components/ui/VegDot';
import type { ApiMenuItem } from '../types/api';

interface SpecialsScreenProps {
  onNavigateToMenu: () => void;
}

export default function SpecialsScreen({ onNavigateToMenu }: SpecialsScreenProps) {
  const { menu, allItems } = useMenu();
  const logoUrl = menu?.outlet?.brand?.logo;

  // Show recommended items as "specials"
  const recommendedItems = allItems.filter(item => item.recommended);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown pb-[100px]">
      <div className="max-w-[390px] mx-auto">

        {/* Logo */}
        <div className="flex justify-center py-6">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-12" />
          ) : (
            <img src="/logo.png" alt="Logo" className="h-12" />
          )}
        </div>

        <div className="px-4">

          {/* Dish of the Day Card — show first recommended item */}
          {recommendedItems.length > 0 && (
            <div className="bg-white text-brand-brown rounded-2xl p-6 mb-6 shadow-[0px_2.3px_2px_rgba(124,63,32,0.25)] border-l-4 border-brand-accent">
              <div className="flex-1">
                <p className="font-inter font-medium text-[12px] uppercase text-brand-accent mb-[10px]">
                  RECOMMENDED
                </p>
                <div className="flex items-center gap-3 mb-[6px]">
                  <VegDot isVeg={recommendedItems[0].veg} size={16} />
                  <h2 className="font-playfair font-bold text-[24px] text-brand-brown m-0">
                    {recommendedItems[0].name}
                  </h2>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-roboto font-medium text-[15px] text-brand-brown">₹{recommendedItems[0].price}</span>
                  {recommendedItems[0].prepTime && (
                    <span className="text-[13px] text-brand-accent">{recommendedItems[0].prepTime} mins</span>
                  )}
                </div>
                {recommendedItems[0].description && (
                  <p className="font-roboto font-normal italic text-[14px] leading-relaxed text-brand-muted m-0">
                    {recommendedItems[0].description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Section heading */}
          <h2 className="font-playfair text-[32px] italic font-normal text-brand-brown mb-6 mt-8">
            Specials &amp; Recommended
          </h2>

          <div className="flex flex-col gap-6">
            {recommendedItems.slice(1).map((item) => (
              <div key={item.id} className="flex flex-col p-5 bg-white rounded-xl shadow-sm border-b border-brand-divider">
                <div className="flex items-center gap-2 mb-2">
                  <VegDot isVeg={item.veg} size={14} />
                  <h3 className="font-playfair font-semibold text-[22px] text-brand-brown">{item.name}</h3>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-roboto font-medium text-[15px] text-brand-brown">₹{item.price}</span>
                  {item.prepTime && (
                    <span className="text-[13px] text-brand-accent">{item.prepTime} mins</span>
                  )}
                </div>
                {item.description && (
                  <p className="font-inter font-normal text-[14px] leading-relaxed text-brand-muted m-0">
                    {item.description}
                  </p>
                )}
              </div>
            ))}

            {recommendedItems.length === 0 && (
              <div className="text-center text-brand-muted py-10 font-inter text-[14px]">
                No specials available at the moment.
              </div>
            )}
          </div>
        </div>

        {/* Step Inside Button */}
        <button
          onClick={onNavigateToMenu}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[200px] h-[50px] bg-brand-accent text-white rounded-[50px] border-[0.4px] border-brand-accent flex items-center justify-center gap-[10px] font-inter font-semibold text-[16px] cursor-pointer shadow-[0_4px_16px_rgba(199,106,58,0.35)]"
        >
          Step inside
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}
