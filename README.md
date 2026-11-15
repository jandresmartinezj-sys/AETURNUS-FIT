# AETURNUS FIT

Tienda web de suplementos deportivos. Next.js (App Router) + Tailwind CSS.

## Uso

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # compilación de producción
```

## Qué editar

| Qué | Dónde |
| --- | --- |
| Productos, precios, descripciones | `src/lib/products.json` |
| Número de WhatsApp y textos de marca | `src/lib/site.ts` |
| Preguntas frecuentes | `src/components/Faq.tsx` |
| Colores | `src/app/globals.css` |
| Fotos de producto | `public/productos/` + campo `image` del producto |

El carrito se guarda en el navegador y el pedido se envía por WhatsApp.
El catálogo (138 productos) está en `src/lib/products.json`.
