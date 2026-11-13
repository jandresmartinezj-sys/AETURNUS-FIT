"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { CheckIcon, CloseIcon, WhatsAppIcon } from "./icons";
import { ProductImage } from "./ProductImage";
import { cartStore } from "@/lib/cart-store";
import { finalPrice, productById } from "@/lib/products";
import { formatCOP, site, whatsappUrl } from "@/lib/site";

export function CartDrawer() {
  const { items, open, setOpen, toast } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const lines = items.flatMap((i) => {
    const product = productById(i.id);
    return product ? [{ product, qty: i.qty }] : [];
  });
  const total = lines.reduce((sum, l) => sum + finalPrice(l.product) * l.qty, 0);

  const order = whatsappUrl(
    [
      `Hola ${site.name}, quiero hacer este pedido:`,
      ...lines.map(
        (l) =>
          `• ${l.qty} x ${l.product.name}${l.product.size ? ` (${l.product.size})` : ""} — ${formatCOP(finalPrice(l.product) * l.qty)}`,
      ),
      `Total: ${formatCOP(total)}`,
    ].join("\n"),
  );

  return (
    <>
      <div
        role="status"
        className={`pointer-events-none fixed left-1/2 top-24 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-copper px-4 py-2 text-sm font-bold text-ink shadow-lg transition ${
          toast ? "opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        {toast && (
          <>
            <CheckIcon className="h-4 w-4" /> Añadido al carrito
          </>
        )}
      </div>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/70 transition ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        aria-hidden={!open}
        inert={!open}
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-line bg-surface transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line p-4">
          <h2 className="text-lg font-extrabold uppercase tracking-wide">Tu carrito</h2>
          <button onClick={() => setOpen(false)} aria-label="Cerrar carrito">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center text-muted">
            Tu carrito está vacío.
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-4">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 py-4">
                  <span className="relative h-16 w-16 shrink-0 rounded-lg bg-card">
                    <ProductImage product={product} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold uppercase leading-tight">{product.name}</p>
                    {product.size && <p className="text-xs text-muted">{product.size}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-line">
                        <button
                          onClick={() => cartStore.setQty(product.id, qty - 1)}
                          aria-label="Quitar uno"
                          className="h-8 w-8 text-lg"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{qty}</span>
                        <button
                          onClick={() => cartStore.setQty(product.id, qty + 1)}
                          aria-label="Añadir uno"
                          className="h-8 w-8 text-lg"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-extrabold text-copper-light">
                        {formatCOP(finalPrice(product) * qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-line p-4">
              <p className="flex justify-between text-lg font-extrabold">
                <span>Total</span>
                <span>{formatCOP(total)}</span>
              </p>
              <a
                href={order}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25d366] py-3 text-sm font-extrabold uppercase tracking-wide text-ink transition hover:brightness-110"
              >
                <WhatsAppIcon className="h-5 w-5" /> Finalizar pedido por WhatsApp
              </a>
              <button
                onClick={() => cartStore.clear()}
                className="w-full text-center text-xs text-muted hover:text-cream"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
