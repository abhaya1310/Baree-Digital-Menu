// ── Types matching the public menu API response ──────────────────────────────

export interface Filter {
    group: string;
    value: string;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    veg: boolean;
    image: string;
    prepTime: number | null;
    recommended: boolean;
    filters: Filter[];
    available: true;
}

export interface Category {
    id: string;
    name: string;
    items: MenuItem[];
}

export interface MenuData {
    accessPointId: string;
    outlet: {
        id: string;
        name: string;
        address: string;
        brand: {
            id: string;
            name: string;
            logo: string;
        };
    };
    template: string;
    categories: Category[];
    /** Present when menu is inactive or loading */
    status?: 'inactive' | 'loading';
    message?: string;
}

export interface PublicMenuResponse {
    success: boolean;
    data: MenuData;
    error?: string;
}

// ── API base URL (configure via env variable or default) ─────────────────────

const API_BASE =
    (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:3001';

// ── Fetch public menu ────────────────────────────────────────────────────────

export async function fetchMenu(qrSlug: string): Promise<PublicMenuResponse> {
    const res = await fetch(`${API_BASE}/public/menu/${qrSlug}`);

    if (res.status === 404) {
        return { success: false, data: {} as MenuData, error: 'Menu not found' };
    }

    if (!res.ok) {
        return {
            success: false,
            data: {} as MenuData,
            error: `Server error (${res.status})`,
        };
    }

    return res.json();
}
