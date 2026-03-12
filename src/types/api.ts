// ── API Response Types ──────────────────────────────────────────────────────
// Matches the GET /public/menu/:qrSlug response from the backend.

export interface Filter {
  group: string;
  value: string;
}

export interface AddonGroup {
  id: string;
  name: string;
  freeLimit: number;
  maxLimit: number;
  addons: { id: string; name: string; price: number; isVeg: boolean }[];
}

export interface VariantGroup {
  id: string;
  name: string;
  variants: { id: string; name: string; priceOffset: number }[];
}

export interface ApiMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  veg: boolean;
  image: string;
  thumbnail: string;
  prepTime: number | null;
  recommended: boolean;
  inStock: boolean;
  packingCharges: number;
  addonGroups: AddonGroup[];
  variantGroups: VariantGroup[];
  filters: Filter[];
  available: true;
}

export interface ApiCategory {
  id: string;
  name: string;
  items: ApiMenuItem[];
}

export interface OutletBrand {
  id: string;
  name: string;
  logo: string;
}

export interface Outlet {
  id: string;
  name: string;
  address: string;
  brand: OutletBrand;
}

export interface MenuData {
  accessPointId: string;
  outlet: Outlet;
  template: string;
  categories: ApiCategory[];
}

// Special states returned when the menu isn't ready
export interface MenuSpecialState {
  status: 'inactive' | 'loading';
  message: string;
}

export interface PublicMenuSuccessResponse {
  success: true;
  data: MenuData;
}

export interface PublicMenuSpecialResponse {
  success: true;
  data: MenuSpecialState;
}

export interface PublicMenuErrorResponse {
  success: false;
  error: string;
}

export type PublicMenuResponse =
  | PublicMenuSuccessResponse
  | PublicMenuSpecialResponse
  | PublicMenuErrorResponse;
