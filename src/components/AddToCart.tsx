"use client";

import { useCart } from "./CartProvider";
import { CartIcon } from "./icons";

export function AddToCart({ id }: { id: string }) {
  const { add } = useCart();
  return (
    <div className="flex gap-3">
      <button
        onClick={() => add(id, true)}
        className="flex-1 rounded-xl bg-copper py-3 text-sm font-extrabold uppercase tracking-widest text-ink transition hover:bg-copper-light"
      >
        Comprar
      </button>
      <button
        onClick={() => add(id)}
        aria-label="Añadir al carrito"
        className="grid w-12 place-items-center rounded-xl border border-copper text-copper-light transition hover:bg-copper hover:text-ink"
      >
        <CartIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
