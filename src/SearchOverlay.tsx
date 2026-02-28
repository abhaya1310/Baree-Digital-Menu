import { useState, useEffect, useRef, useCallback } from 'react';

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

const SearchOverlay = ({ isOpen, onClose, onSearch, initialQuery = '', items = [] }: SearchOverlayProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== term.toLowerCase());
      const updated = [term, ...filtered].slice(0, 5);
      localStorage.setItem('recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

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

  // Generate unique suggestions from real data with fuzzy-like matching
  const getSuggestions = () => {
    if (!isTyping) {
      // Show recent searches if available, else popular items
      return recentSearches.length > 0 
        ? recentSearches 
        : Array.from(new Set(items.map(item => item.name))).slice(0, 8);
    }

    const lowerQuery = query.toLowerCase().trim();
    const queryWords = lowerQuery.split(/\s+/);

    const uniqueNames = Array.from(new Set(items.map(item => item.name)));
    const uniqueCategories = Array.from(new Set(items.map(item => item.category).filter(Boolean))) as string[];

    const allOptions = [...uniqueNames, ...uniqueCategories];

    return allOptions
      .filter(s => {
        const lowerS = s.toLowerCase();
        // Match all query words (fuzzy-ish)
        return queryWords.every(word => lowerS.includes(word));
      })
      .sort((a, b) => {
        const lowerA = a.toLowerCase();
        const lowerB = b.toLowerCase();
        
        // Exact match boost
        if (lowerA === lowerQuery) return -1;
        if (lowerB === lowerQuery) return 1;

        // "Starts with" boost
        const aStart = lowerA.startsWith(lowerQuery);
        const bStart = lowerB.startsWith(lowerQuery);
        if (aStart && !bStart) return -1;
        if (!aStart && bStart) return 1;

        // Word-level "starts with" boost
        const aWordStart = lowerA.split(/\s+/).some(w => w.startsWith(lowerQuery));
        const bWordStart = lowerB.split(/\s+/).some(w => w.startsWith(lowerQuery));
        if (aWordStart && !bWordStart) return -1;
        if (!aWordStart && bWordStart) return 1;

        return a.length - b.length;
      })
      .slice(0, 10);
  };

  const suggestions = getSuggestions();

  const handleSelect = (term: string) => {
    saveRecentSearch(term);
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
          <img src="/logo.png" alt="CSAT" className="w-[100px] h-[35px] object-contain" />
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
                  placeholder="Search drinks, brands, flavors..."
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
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-[10px]">
                <span className="font-playfair font-medium text-[16px] leading-[19px] text-brand-brown">
                  {isTyping ? 'Search results' : (recentSearches.length > 0 ? 'Recent searches' : 'Popular items')}
                </span>
                {isLoading && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1 h-1 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-brand-accent rounded-full animate-bounce"></div>
                  </div>
                )}
              </div>
              {!isTyping && recentSearches.length > 0 && (
                <button 
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem('recent_searches');
                  }}
                  className="bg-transparent border-none p-0 cursor-pointer font-roboto font-normal text-[11px] text-brand-accent hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Suggestions list with keyboard highlight support */}
            <div ref={suggestionsRef} className="flex flex-col items-start gap-[2px] w-full" role="listbox">
              {suggestions.map((term, idx) => {
                const isSuggestionRecent = recentSearches.includes(term);
                return (
                  <div
                    key={idx}
                    role="option"
                    aria-selected={highlightedIndex === idx}
                    onClick={() => handleSelect(term)}
                    className={[
                      'flex flex-row justify-between items-center w-full min-h-[44px] border-b border-[rgba(0,0,0,0.05)] cursor-pointer px-2 rounded-[4px] transition-all duration-150',
                      highlightedIndex === idx
                        ? 'bg-[rgba(124,63,32,0.12)] translate-x-1'
                        : 'hover:bg-[rgba(124,63,32,0.04)] active:bg-[rgba(124,63,32,0.08)]',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      {!isTyping && isSuggestionRecent ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-muted opacity-60">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-60">
                          <circle cx="7" cy="7" r="4.3" stroke="currentColor" strokeWidth="1.2" />
                          <line x1="10.3" y1="10.3" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      )}
                      <span className="font-playfair font-normal text-[14px] leading-[18px] text-brand-brown capitalize">
                        {term}
                      </span>
                    </div>
                    <ArrowBold />
                  </div>
                );
              })}
              {isTyping && suggestions.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full py-10 gap-3 opacity-80">
                  <div className="w-12 h-12 rounded-full bg-brand-cream border border-brand-divider flex items-center justify-center shadow-inner">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3F20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-playfair font-medium text-[16px] text-brand-brown m-0">No matches found</p>
                    <p className="font-roboto font-light text-[13px] text-brand-muted mt-1">
                      We couldn't find anything for "{query}"
                    </p>
                  </div>
                  <button 
                    onClick={() => { setQuery(''); onSearch(''); inputRef.current?.focus(); }}
                    className="mt-2 px-4 py-2 bg-brand-brown text-white rounded-full font-roboto text-[12px] uppercase tracking-wider active:scale-95 transition-transform"
                  >
                    Clear search
                  </button>
                </div>
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
