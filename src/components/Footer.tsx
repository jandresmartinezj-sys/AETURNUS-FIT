import Link from "next/link";
import { categories } from "@/lib/products";
import { site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contacto" className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold tracking-widest text-copper-light">
            AETURNUS <span className="text-cream">FIT</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">{site.tagline}.</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide">Categorías</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-muted">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href="/productos" className="hover:text-copper-light">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide">Contacto</p>
          <a
            href={whatsappUrl(`Hola ${site.name}, quiero más información.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-muted hover:text-copper-light"
          >
            Escríbenos por WhatsApp
          </a>
          <p className="mt-1.5 text-sm text-muted">{site.shippingNote}</p>
        </div>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted">
        © 2026 {site.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
