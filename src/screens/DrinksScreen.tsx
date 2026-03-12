import React from "react";
import { useMenu } from "../context/MenuContext";
import { ChevronRight } from "lucide-react";
import CategoryCard from "../components/ui/CategoryCard";

interface DrinksScreenProps {
  onNavigateToSpecials: () => void;
  onNavigateToFood: () => void;
  onNavigateToTobacco: () => void;
}

export default function DrinksScreen({
  onNavigateToSpecials,
  onNavigateToFood,
  onNavigateToTobacco,
}: DrinksScreenProps) {
  const { menu } = useMenu();
  const logoUrl = menu?.outlet?.brand?.logo;

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown pb-[100px] relative">
      {/* Header */}
      <div className="max-w-[393px] mx-auto relative px-[15px] box-border">
        {/* Logo */}
        <div className="flex justify-center pt-[29px] pb-[10px]">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-[100px] h-[35px] object-contain" />
          ) : (
            <img src="/logo.png" alt="Logo" className="w-[100px] h-[35px] object-contain" />
          )}
        </div>

        {/* Category cards */}
        <div className="flex flex-row items-center gap-[25px] w-[290px] h-[100px] mx-auto mb-5">
          <CategoryCard
            label="Food"
            img="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=200"
            onClick={onNavigateToFood}
          />
          <CategoryCard
            label="Drinks"
            img="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=200"
            active
          />
          <CategoryCard
            label="Tobacco"
            img="https://images.pexels.com/photos/4969832/pexels-photo-4969832.jpeg?auto=compress&cs=tinysrgb&w=200"
            onClick={onNavigateToTobacco}
          />
        </div>

        {/* Coming soon message */}
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <h2 className="font-playfair font-semibold text-[28px] text-brand-brown text-center">
            Drinks Menu
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
