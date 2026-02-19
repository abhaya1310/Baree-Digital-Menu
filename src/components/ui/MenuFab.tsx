import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface MenuFabProps {
  onClick: () => void;
}

/**
 * Floating circular "Menu" button used on Menu & Drinks screens (70×70 variant).
 */
const MenuFab: React.FC<MenuFabProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={[
        'fixed bottom-6 right-4 z-50',
        'w-[85px] h-[85px] rounded-full',
        'bg-grad-fab border border-brand-accent',
        'shadow-[2px_2px_4px_rgba(199,106,58,0.4)]',
        'filter drop-shadow-[1px_3.5px_3.5px_rgba(83,43,22,0.2)]',
        'flex flex-col items-center justify-center cursor-pointer p-0',
      ].join(' ')}
    >
      <div className="flex flex-col items-center justify-center w-[45px] h-[48px]">
        <UtensilsCrossed className="w-[30px] h-[30px] text-white" />
        <span className="font-inter font-medium text-[15px] leading-[18px] text-center text-white w-[45px]">
          Menu
        </span>
      </div>
    </button>
  );
};

export default MenuFab;
