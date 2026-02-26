import { ChevronRight } from 'lucide-react';

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
            <div className="bg-white text-brand-brown rounded-2xl p-4 flex items-start gap-[14px] mb-6 shadow-[0px_2.3px_2px_rgba(124,63,32,0.25)]">
              <div className="flex-1">
                <p className="font-inter font-medium text-[12px] uppercase text-brand-muted mb-[6px]">
                  DISH OF THE DAY
                </p>
                <h2 className="font-playfair font-semibold text-[20px] text-brand-brown inline-block mb-[6px] px-1 rounded">
                Saffron Vegetable Pulao
              </h2>
              <div className="flex items-center gap-3 mb-2">
                <span className="border border-brand-veg p-[2px] flex items-center justify-center w-4 h-4 rounded-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-veg" />
                </span>
                <span className="font-roboto text-[13px] text-brand-brown">₹250</span>
                <span className="text-[12px] text-brand-accent">🕐 20 mins</span>
              </div>
                <p className="font-roboto font-normal italic text-[12px] leading-[18px] text-brand-muted m-0">
                  Fragrant basmati rice gently cooked with saffron, seasonal vegetables, and mild aromatic spices.
                </p>
            </div>
            <div className="w-[100px] h-[100px] rounded-[12px] overflow-hidden shrink-0">
              <img
                src="https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Pulao"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Section heading */}
          <h2 className="font-playfair text-[32px] italic font-normal text-brand-brown mb-6">
            Specials &amp; Offers
          </h2>

          <div className="flex flex-col gap-8">

            {/* Special 1 */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-playfair font-medium text-[22px] text-brand-brown mb-[10px]">2-for-1 Special:</h3>
                <p className="font-inter font-normal text-[12px] leading-[18px] text-brand-muted m-0">
                  Choose any two starters and pay for only one. The perfect way to begin your feast.
                </p>
              </div>
              <img src="/food.png" alt="food" className="w-[121px] h-[125px] object-cover rounded-lg shrink-0" />
            </div>

            {/* Special 2 */}
            <div className="flex items-center gap-4">
              <img src="/drinks.png" alt="drinks" className="w-[121px] h-[125px] object-cover rounded-lg shrink-0" />
              <div className="flex-1">
                <h3 className="font-playfair font-medium text-[22px] text-brand-brown mb-[10px]">Buy 1, get 1 special</h3>
                <p className="font-inter font-normal text-[12px] leading-[18px] text-brand-muted m-0">
                  Buy a cocktail of above ₹250, and get another cocktail for absolutely free.
                </p>
              </div>
            </div>

            {/* Special 3 */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-playfair font-medium text-[22px] text-brand-brown mb-[10px]">2-for-1 Special:</h3>
                <p className="font-inter font-normal text-[12px] leading-[18px] text-brand-muted m-0">
                  Choose any two starters and pay for only one. The perfect way to begin your feast.
                </p>
              </div>
              <img src="/cake.png" alt="cake" className="w-[121px] h-[125px] object-cover rounded-lg shrink-0" />
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
