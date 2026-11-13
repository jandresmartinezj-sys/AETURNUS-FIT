import { site } from "@/lib/site";

// Textos de ejemplo: ajusta ciudades, medios de pago y tiempos reales.
const faqs = [
  {
    q: "¿Hacen envíos a toda Colombia?",
    a: "Sí. Despachamos a todo el país con transportadora. El tiempo de entrega depende de tu ciudad y te lo confirmamos al hacer el pedido.",
  },
  {
    q: "¿Qué medios de pago puedo usar?",
    a: "Al finalizar tu pedido por WhatsApp te compartimos los medios de pago disponibles.",
  },
  {
    q: "¿Cómo hago mi pedido?",
    a: "Agrega los productos al carrito y pulsa «Finalizar pedido por WhatsApp». Un asesor confirma disponibilidad, envío y pago.",
  },
  {
    q: "¿Me asesoran para elegir el suplemento?",
    a: `Claro. Escríbenos por WhatsApp y el equipo de ${site.name} te orienta según tu objetivo.`,
  },
];

export function Faq() {
  return (
    <section id="preguntas" className="mx-auto w-full max-w-3xl scroll-mt-24 px-4 py-12">
      <h2 className="mb-6 text-center text-xl font-extrabold uppercase tracking-widest">
        Preguntas <span className="text-copper">frecuentes</span>
      </h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details
            key={f.q}
            open={i === 0}
            className="group rounded-2xl border border-line bg-surface px-5 py-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold">
              {f.q}
              <span className="text-xl text-copper transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
