import React from 'react';
import { useMenu } from '../context/MenuContext';
import { ChevronRight } from 'lucide-react';
import CategoryCard from '../components/ui/CategoryCard';

interface TobaccoScreenProps {
  onNavigateToSpecials: () => void;
  onNavigateToFood: () => void;
  onNavigateToDrinks: () => void;
}

export default function TobaccoScreen({ onNavigateToSpecials, onNavigateToFood, onNavigateToDrinks }: TobaccoScreenProps) {
  const { menu } = useMenu();
  const logoUrl = menu?.outlet?.brand?.logo;

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown pb-[100px] relative max-w-[393px] mx-auto">
      {/* Header */}
      <div className="max-w-[393px] mx-auto relative px-[15px] box-border">
        {/* Logo */}
        <div className="flex justify-center pt-[29px] pb-[10px]">
          {logoUrl ? (
            <img src={logoUrl} alt={menu?.outlet?.brand?.name || 'Menu'} className="w-[100px] h-[35px] object-contain" />
          ) : (
            <span className="font-playfair font-semibold text-brand-brown text-[22px]">{menu?.outlet?.brand?.name || 'Menu'}</span>
          )}
        </div>

        {/* Category cards */}
        <div className="flex flex-row items-center gap-[25px] w-[290px] h-[100px] mx-auto mb-5">
          <CategoryCard
            label="Food"
            onClick={onNavigateToFood}
          />
          <CategoryCard
            label="Drinks"
            onClick={onNavigateToDrinks}
          />
          <CategoryCard
            label="Tobacco"
            active
          />
        </div>

        {/* Coming soon message */}
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <h2 className="font-playfair font-semibold text-[28px] text-brand-brown text-center">
            Tobacco Menu
          </h2>
          <p className="font-inter font-normal text-[14px] text-brand-muted text-center leading-relaxed max-w-[280px]">
            Coming soon. Please check the food menu for now.
          </p>
          <button
            onClick={onNavigateToFood}
            className="mt-4 px-8 py-3 bg-brand-accent text-white rounded-full font-inter font-medium text-[14px] cursor-pointer border-0 shadow-[0_4px_16px_rgba(199,106,58,0.35)] flex items-center gap-2"
          >
            View Food Menu
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
