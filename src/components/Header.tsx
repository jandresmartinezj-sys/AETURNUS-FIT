"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { CartIcon, CloseIcon, MenuIcon } from "./icons";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Comprar" },
  { href: "/#preguntas", label: "Preguntas" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <p className="bg-copper py-1 text-center text-[11px] font-bold uppercase tracking-widest text-ink">
        {site.shippingNote}
      </p>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <button
          className="md:hidden"
          onClick={() => setMenu((v) => !v)}
          aria-label="Menú"
          aria-expanded={menu}
        >
          {menu ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={40}
            height={37}
            className="h-10 w-10 rounded-lg object-cover"
            priority
          />
          <span className="text-lg font-extrabold tracking-widest text-copper-light">
            AETURNUS <span className="text-cream">FIT</span>
          </span>
        </Link>
        <nav className="ml-auto hidden gap-7 text-sm font-semibold md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-copper-light">
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen(true)}
          aria-label={`Abrir carrito (${count})`}
          className="relative ml-auto grid h-10 w-10 place-items-center rounded-full border border-line transition hover:border-copper md:ml-0"
        >
          <CartIcon className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-copper px-1 text-[11px] font-bold text-ink">
              {count}
            </span>
          )}
        </button>
      </div>
      {menu && (
        <nav className="flex flex-col border-t border-line px-4 py-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenu(false)}
              className="py-3 text-sm font-semibold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
