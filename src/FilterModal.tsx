import { useState, useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (count: number) => void;
  type?: 'food' | 'drinks';
}

// ── Custom radio button (13×13 circle, #A9712F fill when selected) ──
function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span className="inline-flex items-center justify-center w-[13px] h-[13px] rounded-full bg-brand-white border border-brand-muted box-border shrink-0">
      {selected && <span className="w-[9px] h-[9px] rounded-full bg-brand-accent" />}
    </span>
  );
}

// ── Custom checkbox (square, #A9712F fill when selected) ──
function CheckBox({ selected }: { selected: boolean }) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center w-[13px] h-[13px] rounded-[2px] border border-brand-muted box-border shrink-0',
        selected ? 'bg-brand-accent border-brand-accent' : 'bg-brand-white',
      ].join(' ')}
    >
      {selected && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3L3.5 5.5L8 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

// ── Reusable option row (label + radio/checkbox) ──
function OptionRow({
  label, onClick, children,
}: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <div
      className="flex flex-row justify-between items-center w-[230px] min-h-[16px] mb-[14px] cursor-pointer"
      onClick={onClick}
    >
      <span className="font-inter font-normal text-[13px] leading-[16px] text-[#555555]">{label}</span>
      {children}
    </div>
  );
}

const FilterModal = ({ isOpen, onClose, onApply, type = 'food' }: FilterModalProps) => {
  const [activeTab, setActiveTab] = useState(type === 'drinks' ? 'Price range' : 'Price');
  const [priceMax, setPriceMax] = useState(2000);
  const [sortOrder, setSortOrder] = useState<'lowToHigh' | 'highToLow' | null>('lowToHigh');
  const [selectedPrepTime, setSelectedPrepTime] = useState<string | null>(null);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>('Mid range');

  const categories = type === 'food'
    ? ['Price', 'Prep time', 'Allergies', 'Diet & preparation']
    : ['Price range', 'Serving type', 'Occasion'];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    let count = 0;
    if (type === 'food') {
      if (priceMax !== 2000) count++;
      if (sortOrder) count++;
      if (selectedPrepTime) count++;
      count += selectedAllergies.length + selectedDiet.length + selectedPreferences.length;
    } else {
      if (selectedPriceRange) count++;
      if (selectedPrepTime) count++;
      if (selectedOccasion) count++;
    }
    onApply(count);
    onClose();
  };

  const handleClear = () => {
    setPriceMax(2000);
    setSortOrder(null);
    setSelectedPrepTime(null);
    setSelectedOccasion(null);
    setSelectedAllergies([]);
    setSelectedDiet([]);
    setSelectedPreferences([]);
    setSelectedPriceRange(null);
  };

  const toggleList = (list: string[], item: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(83,43,22,0.4)] backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Bottom sheet — 393×435, #FAF7F2, rounded top corners */}
      <div
        className="relative w-[393px] h-[435px] bg-brand-cream rounded-t-[15px] overflow-hidden shrink-0"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="absolute w-[350px] h-[24px] top-[24px] left-[calc(50%-175px-6.5px)] flex flex-row justify-between items-center">
          <span className="font-inter font-semibold text-[20px] leading-[24px] text-brand-brown">Filters</span>
          <button
            onClick={onClose}
            className="w-[24px] h-[24px] bg-brand-white rounded-full border-none cursor-pointer flex items-center justify-center shrink-0 shadow-[0px_1px_2px_rgba(0,0,0,0.1)]"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <line x1="1.5" y1="1.5" x2="9.5" y2="9.5" stroke="#7C3F20" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9.5" y1="1.5" x2="1.5" y2="9.5" stroke="#7C3F20" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Horizontal divider at top:64 ── */}
        <div className="absolute left-0 top-[64px] w-[393px] border-t border-[#B6B4B1]" />

        {/* ── Vertical divider at left:107 ── */}
        <div className="absolute left-[107px] top-[64px] w-px h-[284px] bg-[#B6B4B1]" />

        {/* ── Left sidebar ── */}
        <div className="absolute left-0 top-[64px] w-[106px] flex flex-col">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={[
                  'box-border w-[106px] h-[50px] flex items-center px-[15px] py-[10px] cursor-pointer text-left',
                  isActive
                    ? 'bg-brand-brown border-none'
                    : 'bg-brand-cream border border-[#B6B4B1]/50',
                ].join(' ')}
              >
                <span className={[
                  'font-inter font-normal text-[14px] leading-[17px]',
                  isActive ? 'text-brand-cream' : 'text-brand-muted',
                ].join(' ')}>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* ── Right content area ── */}
        <div className="absolute left-[118px] top-[64px] w-[258px] h-[284px] overflow-y-auto [scrollbar-width:none]">

          {/* PRICE RANGE TAB (drinks) */}
          {activeTab === 'Price range' && (
            <div className="mt-[11px]">
              {['Mid range', 'Premium', 'Luxury'].map(item => (
                <div
                  key={item}
                  className="flex flex-row justify-between items-center w-[238px] h-[16px] mb-[15px] cursor-pointer"
                  onClick={() => setSelectedPriceRange(item)}
                >
                  <span className="font-inter font-normal text-[13px] leading-[16px] text-[#555555]">{item}</span>
                  <RadioDot selected={selectedPriceRange === item} />
                </div>
              ))}
            </div>
          )}

          {/* PRICE TAB (food only) */}
          {activeTab === 'Price' && (
            <div>
              <span className="block font-inter font-medium text-[15px] leading-[18px] text-[#555555] mt-[11px]">
                Select your price range
              </span>
              <span className="block text-center font-inter font-medium text-[14px] leading-[17px] text-brand-accent mt-[11px]">
                ₹0 - ₹{priceMax}
              </span>

              {/* Custom slider */}
              <div className="relative w-[243px] mt-[8px]">
                <div className="relative h-[15px] w-[229px] ml-[7px]">
                  {/* Track */}
                  <div className="absolute left-0 top-[7px] w-[229px] border-t-2 border-brand-accent/50" />
                  {/* Active fill */}
                  <div
                    className="absolute top-[7px] border-t-2 border-brand-accent"
                    style={{ width: `${(priceMax / 2000) * 229}px` }}
                  />
                  {/* Thumb */}
                  <div
                    className="absolute top-0 w-[15px] h-[15px] rounded-full bg-brand-accent"
                    style={{ left: `${(priceMax / 2000) * 214}px` }}
                  />
                  {/* Invisible real range input */}
                  <input
                    type="range" min={0} max={2000} step={50}
                    value={priceMax}
                    onChange={e => setPriceMax(parseInt(e.target.value))}
                    className="absolute left-0 top-0 w-[229px] h-[15px] opacity-0 cursor-pointer m-0 p-0"
                  />
                </div>
                {/* Min / Max labels */}
                <div className="flex flex-row justify-between items-center w-[241px] mt-[4px]">
                  <span className="font-roboto font-normal text-[12px] leading-[14px] text-brand-accent">₹0</span>
                  <span className="font-roboto font-normal text-[12px] leading-[14px] text-brand-accent">₹2000</span>
                </div>
              </div>

              {/* Sort: Low to high */}
              <div
                className="flex flex-row justify-between items-center w-[230px] h-[16px] mt-[26px] cursor-pointer"
                onClick={() => setSortOrder('lowToHigh')}
              >
                <span className="font-inter font-normal text-[13px] leading-[16px] text-[#555555]">Low to high</span>
                <RadioDot selected={sortOrder === 'lowToHigh'} />
              </div>

              {/* Sort: High to low */}
              <div
                className="flex flex-row justify-between items-center w-[230px] h-[16px] mt-[10px] cursor-pointer"
                onClick={() => setSortOrder('highToLow')}
              >
                <span className="font-inter font-normal text-[13px] leading-[16px] text-[#555555]">High to low</span>
                <RadioDot selected={sortOrder === 'highToLow'} />
              </div>
            </div>
          )}

          {/* PREP TIME (food) / SERVING TYPE (drinks) */}
          {(activeTab === 'Prep time' || activeTab === 'Serving type') && (
            <div className="mt-[11px]">
              {(type === 'food'
                ? ['Quick bites', '5-10 mins', '10-15 mins', '15+ mins']
                : ['By glass', 'By bottle', 'Pitcher']
              ).map(item => (
                <OptionRow key={item} label={item} onClick={() => setSelectedPrepTime(item)}>
                  <RadioDot selected={selectedPrepTime === item} />
                </OptionRow>
              ))}
            </div>
          )}

          {/* ALLERGIES TAB */}
          {activeTab === 'Allergies' && (
            <div className="mt-[11px]">
              {['Milk/dairy', 'Peanuts', 'Eggs', 'Soy', 'Shellfish(prawns, crabs, lobster)', 'Fish', 'Sesame'].map(item => (
                <OptionRow key={item} label={item} onClick={() => toggleList(selectedAllergies, item, setSelectedAllergies)}>
                  <CheckBox selected={selectedAllergies.includes(item)} />
                </OptionRow>
              ))}
            </div>
          )}

          {/* DIET & PREPARATION TAB */}
          {activeTab === 'Diet & preparation' && (
            <div className="mt-[11px]">
              <span className="block font-inter font-medium text-[13px] text-[#555555] mb-[10px]">Diet type</span>
              {['Eggetarian', 'Vegan', 'Gluten-free'].map(item => (
                <OptionRow key={item} label={item} onClick={() => toggleList(selectedDiet, item, setSelectedDiet)}>
                  <CheckBox selected={selectedDiet.includes(item)} />
                </OptionRow>
              ))}
              <span className="block font-inter font-medium text-[13px] text-[#555555] mt-[6px] mb-[10px]">Preparation</span>
              {['Less oil', 'No onion, no garlic', 'Baked'].map(item => (
                <OptionRow key={item} label={item} onClick={() => toggleList(selectedPreferences, item, setSelectedPreferences)}>
                  <CheckBox selected={selectedPreferences.includes(item)} />
                </OptionRow>
              ))}
            </div>
          )}

          {/* OCCASION TAB (drinks) */}
          {activeTab === 'Occasion' && (
            <div className="mt-[11px]">
              {['Party picks', 'Casual', 'Celebrations'].map(item => (
                <OptionRow key={item} label={item} onClick={() => setSelectedOccasion(item)}>
                  <RadioDot selected={selectedOccasion === item} />
                </OptionRow>
              ))}
            </div>
          )}
        </div>

        {/* ── Divider above buttons ── */}
        <div className="absolute left-0 top-[348px] w-[393px] border-t border-[#B6B4B1]" />

        {/* ── Action buttons ── */}
        <div className="absolute top-[369px] w-[250px] h-[30px] left-[calc(50%-125px+0.5px)] flex flex-row justify-between items-center gap-[20px]">
          <button
            onClick={handleClear}
            className="box-border w-[114px] h-[30px] bg-white border-[0.5px] border-brand-muted rounded-[2px] cursor-pointer flex justify-center items-center"
          >
            <span className="font-inter font-medium text-[14px] leading-[17px] text-brand-muted">Clear All</span>
          </button>
          <button
            onClick={handleApply}
            className="w-[114px] h-[30px] bg-brand-accent border-none rounded-[2px] cursor-pointer flex justify-center items-center"
          >
            <span className="font-inter font-medium text-[14px] leading-[17px] text-white">Apply filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
