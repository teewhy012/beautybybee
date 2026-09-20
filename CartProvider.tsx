"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { getProductBySlug } from "@/lib/products";

export type CartLine = {
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "beautybybee:cart";

const CartContext = createContext<CartContextValue | null>(null);

type StoredItem = { slug: string; qty: number };

const EMPTY_CART: StoredItem[] = [];

let snapshot: StoredItem[] = EMPTY_CART;
const listeners = new Set<() => void>();

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getSnapshot(): StoredItem[] {
  return snapshot;
}

function getServerSnapshot(): StoredItem[] {
  return EMPTY_CART;
}

function updateSnapshot(next: StoredItem[]) {
  snapshot = next.length === 0 ? EMPTY_CART : next;
  listeners.forEach((listener) => listener());
}

function readStorage(): StoredItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is StoredItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as StoredItem).slug === "string" &&
        typeof (item as StoredItem).qty === "number",
    );
  } catch {
    return [];
  }
}

function writeStorage(items: StoredItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable (private mode, quota) — cart stays in memory
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    updateSnapshot(readStorage());
  }, []);

  useEffect(() => {
    writeStorage(items);
  }, [items]);

  const add = useCallback((slug: string, qty = 1) => {
    const current = getSnapshot();
    const existing = current.find((item) => item.slug === slug);
    if (existing) {
      updateSnapshot(
        current.map((item) =>
          item.slug === slug
            ? { ...item, qty: Math.min(item.qty + qty, 99) }
            : item,
        ),
      );
    } else {
      updateSnapshot([...current, { slug, qty: Math.min(qty, 99) }]);
    }
    setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    updateSnapshot(getSnapshot().filter((item) => item.slug !== slug));
  }, []);

  const updateQty = useCallback((slug: string, qty: number) => {
    if (qty <= 0) {
      updateSnapshot(getSnapshot().filter((item) => item.slug !== slug));
      return;
    }
    updateSnapshot(
      getSnapshot().map((item) =>
        item.slug === slug ? { ...item, qty: Math.min(qty, 99) } : item,
      ),
    );
  }, []);

  const clear = useCallback(() => {
    updateSnapshot([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = items.flatMap((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return [];
      return [
        {
          slug: product.slug,
          name: product.name,
          image: product.image,
          priceCents: product.priceCents,
          qty: item.qty,
        },
      ];
    });
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const total = lines.reduce(
      (sum, line) => sum + line.priceCents * line.qty,
      0,
    );
    return {
      lines,
      count,
      total,
      isOpen,
      openCart,
      closeCart,
      add,
      remove,
      updateQty,
      clear,
    };
  }, [items, isOpen, add, remove, updateQty, clear, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}