import type { MenuData, MenuSpecialState } from '../types/api';

// ── Configuration ───────────────────────────────────────────────────────────
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// ── Error types ─────────────────────────────────────────────────────────────

export type MenuErrorCode =
  | 'MENU_NOT_FOUND'
  | 'MENU_UNAVAILABLE'
  | 'MENU_INACTIVE'
  | 'MENU_LOADING'
  | 'RATE_LIMITED'
  | 'NETWORK_ERROR';

export class MenuFetchError extends Error {
  code: MenuErrorCode;
  constructor(code: MenuErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'MenuFetchError';
  }
}

// ── Type guard to distinguish special states from real menu data ────────────

function isSpecialState(data: unknown): data is MenuSpecialState {
  return (
    typeof data === 'object' &&
    data !== null &&
    'status' in data &&
    ((data as MenuSpecialState).status === 'inactive' ||
      (data as MenuSpecialState).status === 'loading')
  );
}

// ── Shared response handler ─────────────────────────────────────────────────

function handleMenuResponse(response: Response, result: unknown): MenuData {
  // Handle explicit error responses { success: false, error: "..." }
  if (typeof result === 'object' && result !== null && (result as any).success === false) {
    if (response.status === 404 || (result as any).error?.toLowerCase().includes('not found')) {
      throw new MenuFetchError('MENU_NOT_FOUND', 'This menu link is not valid. Please scan a valid QR code.');
    }
    if (response.status === 429) {
      throw new MenuFetchError('RATE_LIMITED', 'Too many requests. Please wait a moment and try again.');
    }
    if (response.status === 410) {
      throw new MenuFetchError('MENU_UNAVAILABLE', 'This menu is currently unavailable. Please try again later.');
    }
    throw new MenuFetchError('NETWORK_ERROR', (result as any).error || 'Failed to load menu. Please try again.');
  }

  // Handle special states: { status: 'inactive' | 'loading', message: '...' }
  if (isSpecialState(result)) {
    if (result.status === 'inactive') {
      throw new MenuFetchError('MENU_INACTIVE', "This restaurant's menu is currently not available. Please contact staff.");
    }
    if (result.status === 'loading') {
      throw new MenuFetchError('MENU_LOADING', 'Please wait while we prepare your menu...');
    }
  }

  return result as MenuData;
}

// ── Fetch by brand/outlet/access-point slugs (primary) ──────────────────────

export async function fetchMenuBySlug(
  brandSlug: string,
  outletSlug: string,
  accessPointSlug: string,
): Promise<MenuData> {
  const url = `${API_BASE_URL}/public/menu/${encodeURIComponent(brandSlug)}/${encodeURIComponent(outletSlug)}/${encodeURIComponent(accessPointSlug)}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    throw new MenuFetchError('NETWORK_ERROR', 'Unable to load menu. Please check your internet connection and try again.');
  }

  const result = await response.json();
  return handleMenuResponse(response, result);
}

// ── Legacy: Fetch by QR slug ────────────────────────────────────────────────

export async function fetchPublicMenu(qrSlug: string): Promise<MenuData> {
  const url = `${API_BASE_URL}/public/menu/${encodeURIComponent(qrSlug)}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    throw new MenuFetchError('NETWORK_ERROR', 'Unable to load menu. Please check your internet connection and try again.');
  }

  const result = await response.json();
  return handleMenuResponse(response, result);
}
