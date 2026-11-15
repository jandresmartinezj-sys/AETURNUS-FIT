import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { WhatsAppIcon } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { categoryName, productById, products } from "@/lib/products";
import { formatCOP, site, whatsappUrl } from "@/lib/site";

type Props = PageProps<"/productos/[id]">;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = productById((await params).id);
  if (!product) return {};
  return {
    title: `${product.name} ${product.brand}`,
    description: product.what,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = productById((await params).id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .sort((a, b) => Number(b.brand === product.brand) - Number(a.brand === product.brand))
    .slice(0, 4);

  const details = [
    { title: "¿Qué es?", text: product.what },
    { title: "¿Para qué sirve?", text: product.benefits },
    { title: "Ideal para", text: product.idealFor },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/productos" className="hover:text-copper-light">
          Productos
        </Link>{" "}
        / {categoryName(product.category)}
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-white">
          <ProductImage product={product} />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper">{product.brand}</p>
          <h1 className="mt-2 text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-extrabold text-copper-light">{formatCOP(product.price)}</p>
          {product.flavors && (
            <p className="mt-3 text-sm text-cream/80">
              <span className="font-bold">Sabores:</span> {product.flavors}
            </p>
          )}

          <div className="mt-6 max-w-md">
            <AddToCart id={product.id} />
            <a
              href={whatsappUrl(
                `Hola ${site.name}, quiero información sobre ${product.brand} ${product.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-line py-3 text-sm font-semibold transition hover:border-[#25d366] hover:text-[#25d366]"
            >
              <WhatsAppIcon className="h-5 w-5" /> Preguntar por este producto
            </a>
          </div>

          <dl className="mt-8 space-y-5">
            {details.map((d) => (
              <div key={d.title}>
                <dt className="text-sm font-bold uppercase tracking-wide text-copper-light">
                  {d.title}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-cream/85">{d.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            Los suplementos complementan la alimentación; no son medicamentos ni reemplazan una
            dieta equilibrada. Sigue las indicaciones de la etiqueta.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-lg font-extrabold uppercase tracking-widest">
            También te puede <span className="text-copper">interesar</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
