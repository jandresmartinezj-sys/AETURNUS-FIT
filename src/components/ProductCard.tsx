"use client";

import { useCart } from "./CartProvider";
import { CartIcon } from "./icons";
import { ProductImage } from "./ProductImage";
import { categoryName, discountPct, finalPrice, type Product } from "@/lib/products";
import { formatCOP } from "@/lib/site";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const pct = discountPct(product);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition hover:border-copper/60">
      <div className="relative aspect-square bg-gradient-to-b from-[#2e2e2e] to-[#1b1b1b]">
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          {pct > 0 && (
            <span className="rounded-full bg-sale px-2.5 py-0.5 text-[11px] font-bold text-white">
              -{pct}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full border border-copper bg-ink px-2.5 py-0.5 text-[11px] font-bold text-copper-light">
              ¡NUEVO!
            </span>
          )}
        </div>
        <div className="h-full w-full p-5 transition duration-300 group-hover:scale-105">
          <ProductImage product={product} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
          {categoryName(product.category)}
        </p>
        <h3 className="mt-1 text-sm font-bold uppercase leading-snug">
          {product.name}
          {product.size && <span className="text-muted"> · {product.size}</span>}
        </h3>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-base font-extrabold">
          {product.salePrice && (
            <span className="text-xs font-medium text-muted line-through">
              {formatCOP(product.price)}
            </span>
          )}
          <span className={product.salePrice ? "text-sale" : ""}>
            {formatCOP(finalPrice(product))}
          </span>
        </p>

        <div className="mt-auto flex gap-2 pt-4">
          {product.comingSoon ? (
            <span className="flex-1 rounded-lg border border-line py-2 text-center text-xs font-bold tracking-wide text-muted">
              MUY PRONTO
            </span>
          ) : (
            <>
              <button
                onClick={() => add(product.id, true)}
                className="flex-1 rounded-lg border border-copper py-2 text-xs font-bold tracking-wide text-copper-light transition hover:bg-copper hover:text-ink"
              >
                COMPRAR
              </button>
              <button
                onClick={() => add(product.id)}
                aria-label={`Añadir ${product.name} al carrito`}
                className="grid w-10 place-items-center rounded-lg bg-copper text-ink transition hover:bg-copper-light"
              >
                <CartIcon className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
