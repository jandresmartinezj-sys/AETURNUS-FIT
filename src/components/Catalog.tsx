"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductImage } from "./ProductImage";
import { useCart } from "./CartProvider";
import { CloseIcon, FilterIcon, SearchIcon } from "./icons";
import {
  brands,
  categories,
  discountPct,
  finalPrice,
  priceRanges,
  products,
  type CategoryId,
} from "@/lib/products";
import { formatCOP } from "@/lib/site";

type Sort = "default" | "promos" | "cheap" | "expensive";
const sorts: { id: Sort; label: string }[] = [
  { id: "default", label: "Por defecto" },
  { id: "promos", label: "Promociones" },
  { id: "cheap", label: "Más económico" },
  { id: "expensive", label: "Mayor precio" },
];

const PAGE = 24;

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function Catalog() {
  const { add } = useCart();
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [range, setRange] = useState<string | null>(null);
  const [limit, setLimit] = useState(PAGE);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visible = useMemo(() => {
    const r = priceRanges.find((x) => x.id === range);
    const q = normalize(query.trim());
    const list = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!brand || p.brand === brand) &&
        (!r || (finalPrice(p) >= r.min && finalPrice(p) < r.max)) &&
        (!q || normalize(`${p.brand} ${p.name}`).includes(q)),
    );
    if (sort === "cheap") list.sort((a, b) => finalPrice(a) - finalPrice(b));
    if (sort === "expensive") list.sort((a, b) => finalPrice(b) - finalPrice(a));
    if (sort === "promos") list.sort((a, b) => discountPct(b) - discountPct(a));
    return list;
  }, [category, brand, range, query, sort]);

  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 5);
  const hasFilters = category || brand || range || query;
  const clear = () => {
    setCategory(null);
    setBrand(null);
    setRange(null);
    setQuery("");
    setLimit(PAGE);
  };
  // Cada cambio de filtro vuelve a la primera tanda de resultados.
  const pick = <T,>(set: (v: T) => void, value: T) => {
    set(value);
    setLimit(PAGE);
  };

  const row = (active: boolean) =>
    `flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
      active ? "bg-copper font-bold text-ink" : "text-cream/90 hover:bg-white/5"
    }`;
  const badge = (active: boolean) =>
    `rounded-full px-2 text-xs ${active ? "bg-ink/20" : "bg-white/10 text-muted"}`;

  return (
    <section id="productos" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-8">
      <h2 className="mb-6 text-center text-xl font-extrabold uppercase tracking-widest">
        Todos nuestros <span className="text-copper">productos</span>
      </h2>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside
          className={`${filtersOpen ? "block" : "hidden"} w-full shrink-0 space-y-4 lg:block lg:w-64`}
        >
          <div className="rounded-2xl border border-line bg-surface p-3">
            <h3 className="px-3 pb-2 pt-1 text-sm font-bold uppercase tracking-wide text-copper-light">
              Categorías
            </h3>
            {categories.map((c) => {
              const count = products.filter((p) => p.category === c.id).length;
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  aria-pressed={active}
                  onClick={() => pick(setCategory, active ? null : c.id)}
                  className={row(active)}
                >
                  {c.name}
                  <span className={badge(active)}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-line bg-surface p-3">
            <h3 className="px-3 pb-2 pt-1 text-sm font-bold uppercase tracking-wide text-copper-light">
              Marcas
            </h3>
            <div className="max-h-72 overflow-y-auto pr-1">
              {brands.map((b) => {
                const count = products.filter((p) => p.brand === b).length;
                const active = brand === b;
                return (
                  <button
                    key={b}
                    aria-pressed={active}
                    onClick={() => pick(setBrand, active ? null : b)}
                    className={row(active)}
                  >
                    {b}
                    <span className={badge(active)}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-3">
            <h3 className="px-3 pb-2 pt-1 text-sm font-bold uppercase tracking-wide text-copper-light">
              Precio
            </h3>
            {priceRanges.map((r) => {
              const count = products.filter(
                (p) => finalPrice(p) >= r.min && finalPrice(p) < r.max,
              ).length;
              const active = range === r.id;
              return (
                <button
                  key={r.id}
                  aria-pressed={active}
                  onClick={() => pick(setRange, active ? null : r.id)}
                  className={row(active)}
                >
                  {r.label}
                  <span className={badge(active)}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden rounded-2xl border border-line bg-surface p-3 lg:block">
            <h3 className="px-3 pb-2 pt-1 text-sm font-bold uppercase tracking-wide text-copper-light">
              Destacados
            </h3>
            {bestSellers.map((p) => (
              <button
                key={p.id}
                onClick={() => add(p.id, true)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-white/5"
              >
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                  <ProductImage product={p} />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase leading-tight">{p.name}</span>
                  <span className="text-xs text-copper-light">{formatCOP(finalPrice(p))}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface p-3">
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold lg:hidden"
            >
              <FilterIcon className="h-4 w-4" /> Filtros
            </button>
            <label className="flex min-w-40 flex-1 items-center gap-2 rounded-full bg-card px-4 py-2">
              <SearchIcon className="h-4 w-4 text-muted" />
              <input
                value={query}
                onChange={(e) => pick(setQuery, e.target.value)}
                placeholder="Buscar producto"
                aria-label="Buscar producto"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
            </label>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted">
              Ordenar
              <select
                value={sort}
                onChange={(e) => pick(setSort, e.target.value as Sort)}
                className="rounded-lg border border-line bg-card px-3 py-2 text-sm font-medium normal-case text-cream outline-none"
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-4 flex items-center justify-between text-sm text-muted">
            <span>
              {visible.length} {visible.length === 1 ? "producto" : "productos"}
            </span>
            {hasFilters && (
              <button onClick={clear} className="flex items-center gap-1 text-copper-light hover:underline">
                <CloseIcon className="h-3.5 w-3.5" /> Quitar filtros
              </button>
            )}
          </div>

          {visible.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {visible.slice(0, limit).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
              {visible.length > limit && (
                <button
                  onClick={() => setLimit((n) => n + PAGE)}
                  className="col-span-full mx-auto mt-4 rounded-xl border border-copper px-8 py-3 text-sm font-bold uppercase tracking-wide text-copper-light transition hover:bg-copper hover:text-ink"
                >
                  Ver más productos ({visible.length - limit})
                </button>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-line p-12 text-center text-muted">
              No encontramos productos con esos filtros.
              <button onClick={clear} className="mt-3 block w-full font-semibold text-copper-light hover:underline">
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
