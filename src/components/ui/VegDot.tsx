import React from 'react';

interface VegDotProps {
  isVeg: boolean;
  size?: number;
}

/**
 * Shared Veg / Non-veg indicator.
 * Color spec: #E6423C for non-veg, #14AE5C for veg.
 */
const VegDot: React.FC<VegDotProps> = ({ isVeg, size = 13 }) => {
  const dotSize = Math.round(size * 0.54);

  return (
    <span
      className={[
        'inline-flex items-center justify-center rounded-[3px] shrink-0',
        isVeg
          ? 'border border-brand-veg'
          : 'border border-brand-nonVeg',
      ].join(' ')}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <span
        className={`rounded-full ${isVeg ? 'bg-brand-veg' : 'bg-brand-nonVeg'}`}
        style={{ width: `${dotSize}px`, height: `${dotSize}px` }}
      />
    </span>
  );
};

export default VegDot;
