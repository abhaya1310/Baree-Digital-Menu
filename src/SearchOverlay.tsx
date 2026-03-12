import { useState, useEffect, useRef, useCallback } from 'react';
import { useMenu } from './context/MenuContext';

interface SearchItem {
  name: string;
  category?: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (text: string) => void;
  initialQuery?: string;
  items?: SearchItem[];
}

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

const SearchOverlay = ({ isOpen, onClose, onSearch, initialQuery = '', items: propItems }: SearchOverlayProps) => {
  const { allItems, menu } = useMenu();
  // Use allItems from context if propItems not provided or empty
  const items: SearchItem[] = (propItems && propItems.length > 0)
    ? propItems.map(item => ({ name: item.name, category: (item as any).category }))
    : allItems.map(item => ({ name: item.name }));

  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logoUrl = menu?.outlet?.brand?.logo;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setHighlightedIndex(-1);
      setTimeout(() => { inputRef.current?.focus(); }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Sync internal query with initialQuery when it changes (e.g. cleared from parent)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Reset highlight when query changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query]);

  // Cancel: clear everything and close
  const handleCancel = useCallback(() => {
    setQuery('');
    onSearch('');
    setHighlightedIndex(-1);
    onClose();
  }, [onSearch, onClose]);

  if (!isOpen) return null;

  const isTyping = query.length > 0;

  // Generate unique suggestions from real data
  const getSuggestions = () => {
    const uniqueNames = Array.from(new Set(items.map(item => item.name)));
    const uniqueCategories = Array.from(new Set(items.map(item => item.category).filter(Boolean))) as string[];

    const allOptions = [...uniqueNames, ...uniqueCategories];

    if (!isTyping) {
      // Show first 8 items as "popular"
      return allOptions.slice(0, 8);
    }

    const lowerQuery = query.toLowerCase();
    return allOptions
      .filter(s => s.toLowerCase().includes(lowerQuery))
      .sort((a, b) => {
        // Boost matches that start with the query
        const aStart = a.toLowerCase().startsWith(lowerQuery);
        const bStart = b.toLowerCase().startsWith(lowerQuery);
        if (aStart && !bStart) return -1;
        if (!aStart && bStart) return 1;
        return a.length - b.length;
      })
      .slice(0, 10);
  };

  const suggestions = getSuggestions();

  const handleSelect = (term: string) => {
    setQuery(term);
    onSearch(term);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If a suggestion is highlighted, select it
    if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
      handleSelect(suggestions[highlightedIndex]);
      return;
    }
    onSearch(query);
    onClose();
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => {
          const next = prev < suggestions.length - 1 ? prev + 1 : 0;
          // Scroll highlighted item into view
          setTimeout(() => {
            suggestionsRef.current?.children[next]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }, 0);
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => {
          const next = prev > 0 ? prev - 1 : suggestions.length - 1;
          setTimeout(() => {
            suggestionsRef.current?.children[next]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }, 0);
          return next;
        });
        break;
      case 'Escape':
        e.preventDefault();
        handleCancel();
        break;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-[rgba(124,63,32,0.3)] backdrop-blur-[2px]"
        onClick={handleCancel}
      />

      {/* Overlay panel — mobile responsive */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[393px] max-w-[100vw] max-h-[80vh] bg-brand-cream rounded-b-[10px] z-[70] flex flex-col items-start px-[13px] pt-[30px] pb-[30px] shadow-lg overflow-y-auto scrollbar-hide"
        style={{ animation: 'slideDown 0.22s ease', paddingTop: 'max(30px, env(safe-area-inset-top))' }}
      >
        {/* Logo */}
        <div className="flex justify-center w-full mb-[15px]">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-[100px] h-[35px] object-contain" />
          ) : (
            <img src="/logo.png" alt="Logo" className="w-[100px] h-[35px] object-contain" />
          )}
        </div>

        <div className="flex flex-col items-start gap-[10px] w-full">
          <div className="flex flex-row justify-between items-center gap-[10px] w-full h-[30px]">
            <form
              onSubmit={handleSubmit}
              className={[
                'box-border relative h-[30px] bg-[#FAF7F2] border-[0.6px] border-[rgba(125,121,121,0.7)] rounded-[50px] transition-all duration-[180ms] ease-linear shrink-0',
                isTyping ? 'w-[298px]' : 'w-full',
              ].join(' ')}
            >
              <div className="absolute left-[9px] top-[7px] flex flex-row items-center gap-[5px] h-[16px] w-[calc(100%-40px)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <circle cx="7" cy="7" r="4.3" stroke="#7C3F20" strokeWidth="1.5" />
                  <line x1="10.3" y1="10.3" x2="14" y2="14" stroke="#7C3F20" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                <input
                  ref={inputRef}
                  type="search"
                  inputMode="search"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  value={query}
                  onChange={e => {
                    const val = e.target.value;
                    setQuery(val);

                    // Show loading state when typing
                    setIsLoading(true);

                    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

                    searchTimeoutRef.current = setTimeout(() => {
                      setIsLoading(false);
                      // Proactive search as you type
                      if (val.length > 2) {
                        onSearch(val);
                      } else if (val.length === 0) {
                        onSearch('');
                      }
                    }, 500);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search items..."
                  className="bg-transparent border-none outline-none font-roboto font-normal text-[12px] leading-[14px] text-brand-muted w-full caret-brand-brown appearance-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                />
              </div>

              {isTyping && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); onSearch(''); setHighlightedIndex(-1); inputRef.current?.focus(); }}
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

            {/* Cancel button — always visible when typing, clears search completely */}
            {isTyping && (
              <button
                onClick={handleCancel}
                className="bg-transparent border-none p-0 cursor-pointer font-roboto font-normal text-[14px] leading-[16px] text-black whitespace-nowrap w-[43px] h-[16px] shrink-0 active:opacity-60 transition-opacity"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="flex flex-col items-start gap-[15px] w-full mt-4">
            <div className="flex flex-row items-center gap-[10px]">
              <span className="font-playfair font-medium text-[16px] leading-[19px] text-brand-brown">
                {isTyping ? 'Suggestions' : 'Popular searches'}
              </span>
              {isLoading && (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1 h-1 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1 h-1 bg-brand-accent rounded-full animate-bounce"></div>
                </div>
              )}
            </div>

            {/* Suggestions list with keyboard highlight support */}
            <div ref={suggestionsRef} className="flex flex-col items-start gap-[2px] w-full" role="listbox">
              {suggestions.map((term, idx) => (
                <div
                  key={idx}
                  role="option"
                  aria-selected={highlightedIndex === idx}
                  onClick={() => handleSelect(term)}
                  className={[
                    'flex flex-row justify-between items-center w-full min-h-[44px] border-b border-[rgba(0,0,0,0.05)] cursor-pointer px-2 rounded-[4px] transition-colors duration-100',
                    highlightedIndex === idx
                      ? 'bg-[rgba(124,63,32,0.08)]'
                      : 'hover:bg-[rgba(0,0,0,0.02)] active:bg-[rgba(124,63,32,0.06)]',
                  ].join(' ')}
                >
                  <span className="font-playfair font-normal text-[13px] leading-[16px] text-brand-muted capitalize">
                    {term}
                  </span>
                  <ArrowBold />
                </div>
              ))}
              {isTyping && suggestions.length === 0 && (
                <span className="font-roboto font-normal text-[13px] text-brand-muted italic py-2">
                  No matches found for "{query}"
                </span>
              )}
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
