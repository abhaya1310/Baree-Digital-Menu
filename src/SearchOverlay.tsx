import { useState, useEffect, useRef } from 'react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (text: string) => void;
  initialQuery?: string;
}

const ALL_POPULAR = [
  'Saffron biryani',
  'Paneer makhani',
  'Pizzas',
  'Dal bhukara',
  'Saffron biryani',
  'Dal makhani',
  'Dal tadka',
  'Dal fry',
];

// Arrow icon — rotated -30deg
function ArrowBold() {
  return (
    <svg
      width="13" height="13" viewBox="0 0 13 13" fill="none"
      className="-rotate-[30deg] shrink-0"
    >
      <path
        d="M2.5 6.5H10.5M7.5 3.5L10.5 6.5L7.5 9.5"
        stroke="rgba(85,85,85,0.8)"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

const SearchOverlay = ({ isOpen, onClose, onSearch, initialQuery = '' }: SearchOverlayProps) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => { inputRef.current?.focus(); }, 100);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const isTyping = query.length > 0;

  const suggestions = isTyping
    ? ALL_POPULAR.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : ALL_POPULAR.slice(0, 5);

  const handleSelect = (term: string) => {
    setQuery(term);
    onSearch(term);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-[rgba(124,63,32,0.3)] backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Search panel — 393×338, #FAF7F2, rounded bottom corners */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[393px] min-h-[200px] bg-brand-cream rounded-b-[10px] z-[70] flex flex-col items-start px-[13px] pt-[30px] pb-[30px] shadow-lg"
        style={{ animation: 'slideDown 0.22s ease' }}
      >
        {/* Frame 133: column gap:10 */}
        <div className="flex flex-col items-start gap-[10px] w-full">

          {/* Input row + Cancel */}
          <div className="flex flex-row justify-between items-center gap-[10px] w-[360px] h-[30px]">

            {/* Input pill */}
            <form
              onSubmit={handleSubmit}
              className={[
                'box-border relative h-[30px] bg-[#FAF7F2] border-[0.6px] border-[rgba(125,121,121,0.7)] rounded-[50px] transition-[width] duration-[180ms] ease-linear shrink-0',
                isTyping ? 'w-[298px]' : 'w-[360px]',
              ].join(' ')}
            >
              {/* Icon + text row */}
              <div
                className={[
                  'absolute left-[9px] top-[7px] flex flex-row items-center gap-[5px] h-[16px]',
                  isTyping ? 'w-[260px]' : 'w-[342px]',
                ].join(' ')}
              >
                {/* Search icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <circle cx="7" cy="7" r="4.3" stroke="#7C3F20" strokeWidth="1.5" />
                  <line x1="10.3" y1="10.3" x2="14" y2="14" stroke="#7C3F20" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                {/* Typed text display + separator */}
                {isTyping && (
                  <>
                    <span className="font-roboto font-normal text-[12px] leading-[14px] text-[rgba(22,43,57,0.6)] whitespace-nowrap">
                      {query}
                    </span>
                    <div className="w-px h-[14px] bg-brand-bg shrink-0" />
                  </>
                )}

                {/* Real input (always present) */}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={isTyping ? '' : 'Search items, categories.....'}
                  className={[
                    'bg-transparent border-none outline-none font-roboto font-normal text-[12px] leading-[14px] text-brand-muted w-full caret-brand-brown',
                    isTyping ? 'opacity-0 absolute pointer-events-auto' : 'opacity-100 static',
                  ].join(' ')}
                />
              </div>

              {/* Clear button — only when typing */}
              {isTyping && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                  className="absolute right-[7px] top-[7px] w-[16px] h-[16px] bg-transparent border-none p-0 cursor-pointer flex items-center justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" fill="#555555" />
                    <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                    <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </form>

            {/* Cancel — only when typing */}
            {isTyping && (
              <button
                onClick={onClose}
                className="bg-transparent border-none p-0 cursor-pointer font-roboto font-normal text-[14px] leading-[16px] text-black whitespace-nowrap w-[43px] h-[16px] shrink-0"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Suggestions section */}
          <div className="flex flex-col items-start gap-[15px] w-[360px]">

            {/* "Popular searches" heading — only when not typing */}
            {!isTyping && (
              <span className="font-playfair font-medium text-[16px] leading-[19px] text-brand-brown w-[360px]">
                Popular searches
              </span>
            )}

            {/* Suggestion rows */}
            <div className="flex flex-col items-start gap-[11px] w-[360px]">
              {suggestions.map((term, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(term)}
                  className="flex flex-row justify-between items-center w-[360px] h-[17.76px] cursor-pointer"
                >
                  <span className="font-playfair font-normal text-[13px] leading-[16px] text-brand-muted">
                    {term}
                  </span>
                  <ArrowBold />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-100%); }
          to   { transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default SearchOverlay;
