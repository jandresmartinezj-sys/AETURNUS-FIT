// Carrito guardado en localStorage, expuesto como store externo para React.
export type CartItem = { id: string; qty: number };

const KEY = "aeturnus-cart";
const EMPTY: CartItem[] = [];
let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (Array.isArray(raw)) items = raw;
  } catch {
    items = EMPTY;
  }
}

function commit(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // almacenamiento no disponible: el carrito vive solo en memoria
  }
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    load();
    return items;
  },
  getServerSnapshot() {
    return EMPTY;
  },
  add(id: string) {
    load();
    const found = items.find((i) => i.id === id);
    commit(
      found
        ? items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        : [...items, { id, qty: 1 }],
    );
  },
  setQty(id: string, qty: number) {
    load();
    commit(
      qty <= 0
        ? items.filter((i) => i.id !== id)
        : items.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  },
  clear() {
    commit(EMPTY);
  },
};
