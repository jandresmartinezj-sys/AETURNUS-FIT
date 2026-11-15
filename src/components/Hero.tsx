import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const perks = ["Envíos a toda Colombia", "Asesoría por WhatsApp", "Pedido fácil y rápido"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <Image
        src="/brand/aeturnus-fit.jpg"
        alt="Logo de Aeturnus Fit sobre una pared de gimnasio"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/30" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-copper">Nutrición deportiva</p>
        <h1 className="mt-3 max-w-xl text-4xl font-extrabold uppercase leading-tight sm:text-5xl">
          {site.tagline.split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-copper-light">{site.tagline.split(" ").slice(-2).join(" ")}</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80">
          Proteínas, creatinas, pre-entrenos y vitaminas de las mejores marcas nacionales e importadas.
        </p>
        <Link
          href="/productos"
          className="mt-8 inline-block rounded-xl bg-copper px-8 py-3 text-sm font-extrabold uppercase tracking-widest text-ink transition hover:bg-copper-light"
        >
          Comprar ahora
        </Link>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-cream/80">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-copper" /> {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
