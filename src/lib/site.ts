// Datos de la marca. Edita aquí el WhatsApp y los textos generales.
export const site = {
  name: "AETURNUS FIT",
  tagline: "Suplementos para una fuerza que perdura",
  // Número en formato internacional, sin "+" ni espacios (57 = Colombia).
  whatsapp: "573164135586",
  shippingNote: "Envíos a toda Colombia",
};

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const formatCOP = (value: number) =>
  "$" + value.toLocaleString("es-CO", { maximumFractionDigits: 0 });
