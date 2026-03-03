import { ChevronRight } from 'lucide-react';
import VegDot from '../components/ui/VegDot';

interface SpecialsScreenProps {
  onNavigateToMenu: () => void;
}

export default function SpecialsScreen({ onNavigateToMenu }: SpecialsScreenProps) {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown pb-[100px]">
      <div className="max-w-[390px] mx-auto">

        {/* Logo */}
        <div className="flex justify-center py-6">
          <img src="/logo.png" alt="CSAT" className="h-12" />
        </div>

        <div className="px-4">

          {/* Dish of the Day Card */}
            <div className="bg-white text-brand-brown rounded-2xl p-6 mb-6 shadow-[0px_2.3px_2px_rgba(124,63,32,0.25)] border-l-4 border-brand-accent">
              <div className="flex-1">
                <p className="font-inter font-medium text-[12px] uppercase text-brand-accent mb-[10px]">
                  DISH OF THE DAY
                </p>
                <div className="flex items-center gap-3 mb-[6px]">
                  <VegDot isVeg={true} size={16} />
                  <h2 className="font-playfair font-bold text-[24px] text-brand-brown m-0">
                    Saffron Vegetable Pulao
                  </h2>
                </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-roboto font-medium text-[15px] text-brand-brown">₹250</span>
                <span className="text-[13px] text-brand-accent">🕐 20 mins</span>
              </div>
                <p className="font-roboto font-normal italic text-[14px] leading-relaxed text-brand-muted m-0">
                  Fragrant basmati rice gently cooked with saffron, seasonal vegetables, and mild aromatic spices.
                </p>
            </div>
          </div>

          {/* Section heading */}
          <h2 className="font-playfair text-[32px] italic font-normal text-brand-brown mb-6 mt-8">
            Specials &amp; Offers
          </h2>

          <div className="flex flex-col gap-6">

            {/* Special 1 */}
            <div className="flex flex-col p-5 bg-white rounded-xl shadow-sm border-b border-brand-divider">
                <h3 className="font-playfair font-semibold text-[22px] text-brand-brown mb-2">2-for-1 Special:</h3>
                <p className="font-inter font-normal text-[14px] leading-relaxed text-brand-muted m-0">
                  Choose any two starters and pay for only one. The perfect way to begin your feast.
                </p>
            </div>

            {/* Special 2 */}
            <div className="flex flex-col p-5 bg-white rounded-xl shadow-sm border-b border-brand-divider">
                <h3 className="font-playfair font-semibold text-[22px] text-brand-brown mb-2">Buy 1, get 1 special</h3>
                <p className="font-inter font-normal text-[14px] leading-relaxed text-brand-muted m-0">
                  Buy a cocktail of above ₹250, and get another cocktail for absolutely free.
                </p>
            </div>

            {/* Special 3 */}
            <div className="flex flex-col p-5 bg-white rounded-xl shadow-sm border-b border-brand-divider">
                <h3 className="font-playfair font-semibold text-[22px] text-brand-brown mb-2">2-for-1 Special:</h3>
                <p className="font-inter font-normal text-[14px] leading-relaxed text-brand-muted m-0">
                  Choose any two starters and pay for only one. The perfect way to begin your feast.
                </p>
            </div>

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
