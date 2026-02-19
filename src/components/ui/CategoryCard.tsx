import React from 'react';

interface CategoryCardProps {
  label: string;
  img: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * "Food / Drinks / Tobacco" category pill — equal-width cards, active card gets amber gradient.
 * Inactive cards use a lighter blue-gray with a subtle border (matches image 2 design).
 */
const CategoryCard: React.FC<CategoryCardProps> = ({ label, img, active = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={[
        'flex flex-col items-center justify-center gap-[5px]',
        'w-[80px] h-[100px] rounded-[5px] box-border',
        active
          ? 'bg-brand-brown text-white'
          : 'bg-white border border-brand-border text-brand-brown',
        onClick ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
    >
      <img
        src={img}
        alt={label}
        className="w-[50px] h-[50px] rounded-full object-cover shadow-[1px_2px_4px_rgba(0,0,0,0.2)]"
      />
      <span
        className={[
          'font-inter text-[14px] leading-[17px] text-center w-full',
          active ? 'font-semibold text-white' : 'font-medium text-brand-brown',
        ].join(' ')}
      >
        {label}
      </span>
    </div>
  );
};

export default CategoryCard;
