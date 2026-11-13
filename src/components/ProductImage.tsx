import Image from "next/image";
import { useId } from "react";
import type { Product } from "@/lib/products";

// Muestra la foto del producto o, si aún no hay, un envase ilustrado con la marca.
export function ProductImage({ product }: { product: Product }) {
  // id único por instancia: el mismo producto puede pintarse varias veces en la página
  const uid = useId();
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-contain p-4"
      />
    );
  }
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label={product.name}>
      <defs>
        <linearGradient id={`tub-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#0d0d0d" />
          <stop offset="0.5" stopColor="#2b2b2b" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id={`lbl-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#9c6741" />
          <stop offset="0.5" stopColor="#e3ad85" />
          <stop offset="1" stopColor="#9c6741" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="178" rx="52" ry="7" fill="#000" opacity="0.35" />
      <rect x="62" y="22" width="76" height="20" rx="5" fill="#1a1a1a" stroke="#3a3a3a" />
      <rect x="52" y="40" width="96" height="136" rx="14" fill={`url(#tub-${uid})`} stroke="#3a3a3a" />
      <rect x="52" y="78" width="96" height="62" fill={`url(#lbl-${uid})`} />
      <path d="M100 86 86 116h6l8-18 8 18h6Z" fill="#161616" />
      <text x="100" y="131" textAnchor="middle" fontSize="9" fontWeight="800" letterSpacing="1.5" fill="#161616">
        AETURNUS
      </text>
      {product.size && (
        <text x="100" y="160" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a39b94">
          {product.size}
        </text>
      )}
    </svg>
  );
}
