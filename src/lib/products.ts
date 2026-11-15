// Catálogo real. Los productos viven en products.json (nombre, marca, precio,
// descripciones e imagen). Para cambiar un precio o agregar un producto, edita ese archivo.
import data from "./products.json";

export const categories = [
  { id: "proteinas", name: "Proteínas" },
  { id: "creatinas", name: "Creatinas" },
  { id: "pre-entrenos", name: "Pre-entrenos y energía" },
  { id: "ganadores", name: "Ganadores de peso" },
  { id: "aminoacidos", name: "Aminoácidos" },
  { id: "control-peso", name: "Quemadores" },
  { id: "bienestar", name: "Vitaminas y bienestar" },
  { id: "snacks", name: "Snacks proteicos" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number; // precio normal en COP
  salePrice?: number; // precio con descuento (opcional)
  isNew?: boolean;
  bestSeller?: boolean;
  comingSoon?: boolean;
  flavors?: string;
  image?: string;
  what: string; // ¿Qué es?
  benefits: string; // ¿Para qué sirve?
  idealFor: string; // Ideal para
};

export const products = data as Product[];

export const brands = [...new Set(products.map((p) => p.brand))].sort((a, b) =>
  a.localeCompare(b, "es"),
);

export const priceRanges = [
  { id: "lt50", label: "Menos de $50.000", min: 0, max: 50000 },
  { id: "50-100", label: "$50.000 a $100.000", min: 50000, max: 100000 },
  { id: "100-200", label: "$100.000 a $200.000", min: 100000, max: 200000 },
  { id: "gt200", label: "$200.000 o más", min: 200000, max: Infinity },
] as const;

export const finalPrice = (p: Product) => p.salePrice ?? p.price;

export const discountPct = (p: Product) =>
  p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0;

export const categoryName = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.name ?? id;

export const productById = (id: string) => products.find((p) => p.id === id);
