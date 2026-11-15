import { site } from "@/lib/site";

// Preguntas habituales en tiendas de suplementos. Ajusta las respuestas a tus
// políticas reales (tiempos, medios de pago, cambios).
const faqs = [
  {
    q: "¿Hacen envíos a toda Colombia?",
    a: "Sí. Despachamos a todas las ciudades y municipios del país por transportadora. El costo y el tiempo de entrega dependen de tu ubicación; te los confirmamos por WhatsApp antes de que pagues.",
  },
  {
    q: "¿Cómo hago mi pedido?",
    a: "Agrega los productos al carrito y pulsa «Finalizar pedido por WhatsApp». Nos llega tu lista con el total y un asesor te confirma disponibilidad, sabores, envío y forma de pago.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Al confirmar tu pedido por WhatsApp te compartimos los medios de pago disponibles para tu ciudad.",
  },
  {
    q: "¿Los productos son originales?",
    a: "Trabajamos con marcas reconocidas, nacionales e importadas. Si quieres verificar un producto antes de comprar, pídenos por WhatsApp fotos reales del envase, el lote y la fecha de vencimiento.",
  },
  {
    q: "¿Puedo elegir el sabor?",
    a: "Sí. La mayoría de proteínas, creatinas saborizadas y pre-entrenos vienen en varios sabores. Dinos cuál prefieres al hacer el pedido y te confirmamos si está disponible.",
  },
  {
    q: "¿Qué suplemento me conviene?",
    a: `Depende de tu objetivo: proteína para completar tu requerimiento diario y recuperarte, creatina para fuerza y rendimiento, ganadores de peso para etapas de volumen y pre-entrenos para energía al entrenar. Escríbenos y el equipo de ${site.name} te orienta.`,
  },
  {
    q: "¿Cómo debo tomar los suplementos?",
    a: "Sigue siempre la porción y las indicaciones de la etiqueta de cada producto. Los suplementos complementan la alimentación, no la reemplazan.",
  },
  {
    q: "¿Cualquier persona puede tomarlos?",
    a: "Si estás en embarazo o lactancia, eres menor de edad, tienes una condición médica o tomas medicamentos, consulta a tu médico antes de usar cualquier suplemento, en especial pre-entrenos y quemadores con cafeína.",
  },
  {
    q: "¿Qué pasa si mi pedido llega con algún problema?",
    a: "Revisa tu pedido al recibirlo. Si llegó incompleto, en mal estado o no corresponde a lo que pediste, escríbenos por WhatsApp con fotos y lo solucionamos.",
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
