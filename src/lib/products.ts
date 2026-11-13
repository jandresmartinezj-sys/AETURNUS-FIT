// Catálogo de ejemplo. Reemplaza nombres, precios e imágenes por los reales.
// Para usar una foto propia: súbela a /public/productos y pon su ruta en `image`.

export const categories = [
  { id: "proteinas", name: "Proteínas" },
  { id: "creatinas", name: "Creatinas" },
  { id: "pre-entrenos", name: "Pre-entrenos y energía" },
  { id: "ganadores", name: "Ganadores de peso" },
  { id: "control-peso", name: "Control de peso" },
  { id: "bienestar", name: "Vitaminas y bienestar" },
  { id: "snacks", name: "Snacks proteicos" },
  { id: "accesorios", name: "Accesorios" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // precio normal en COP
  salePrice?: number; // precio con descuento
  isNew?: boolean;
  bestSeller?: boolean;
  comingSoon?: boolean;
  size?: string;
  image?: string;
};

export const products: Product[] = [
  { id: "whey-classic-vainilla-3lb", name: "Whey Classic Vainilla", size: "3 LB", category: "proteinas", price: 319000, bestSeller: true },
  { id: "whey-classic-chocolate-2lb", name: "Whey Classic Chocolate", size: "2 LB", category: "proteinas", price: 239000 },
  { id: "whey-classic-cookies-2lb", name: "Whey Classic Cookies & Cream", size: "2 LB", category: "proteinas", price: 239000, salePrice: 215100 },
  { id: "iso-pure-vainilla-2lb", name: "Iso Pure Vainilla", size: "2 LB", category: "proteinas", price: 289000, isNew: true, bestSeller: true },
  { id: "vegan-protein-mocca", name: "Vegan Protein Mocca", size: "400 G", category: "proteinas", price: 64900 },
  { id: "whey-sachet-display", name: "Whey Classic Display x12", size: "12 sobres", category: "proteinas", price: 119000 },
  { id: "creatina-mono-300", name: "Creatina Monohidratada", size: "300 G", category: "creatinas", price: 129900, bestSeller: true },
  { id: "creatina-mono-500", name: "Creatina Monohidratada", size: "500 G", category: "creatinas", price: 189900, salePrice: 170910 },
  { id: "creatina-sachets", name: "Creatina Sachets x30", size: "30 sobres", category: "creatinas", price: 114900 },
  { id: "pre-ignis-frutos-rojos", name: "Ignis Pre-Workout Frutos Rojos", size: "300 G", category: "pre-entrenos", price: 94900, bestSeller: true },
  { id: "pre-ignis-mango", name: "Ignis Pre-Workout Mango", size: "300 G", category: "pre-entrenos", price: 94900, isNew: true },
  { id: "bcaa-limon", name: "BCAA 2:1:1 Limón", size: "250 G", category: "pre-entrenos", price: 84900 },
  { id: "glutamina", name: "Glutamina Pura", size: "300 G", category: "pre-entrenos", price: 79900 },
  { id: "energy-drink-12", name: "Energy Drink Caja x12", size: "12 latas", category: "pre-entrenos", price: 99900, salePrice: 89910, comingSoon: true },
  { id: "mass-titan-3lb", name: "Mass Titan Vainilla", size: "3 LB", category: "ganadores", price: 114900 },
  { id: "mass-titan-6lb", name: "Mass Titan Chocolate", size: "6 LB", category: "ganadores", price: 209900 },
  { id: "mass-titan-10lb", name: "Mass Titan Vainilla", size: "10 LB", category: "ganadores", price: 299900, salePrice: 269910 },
  { id: "lean-protein", name: "Lean Protein Vainilla", size: "2 LB", category: "control-peso", price: 245000 },
  { id: "thermo-caps", name: "Thermo Caps", size: "60 cápsulas", category: "control-peso", price: 134900, salePrice: 114665 },
  { id: "l-carnitina", name: "L-Carnitina Líquida", size: "480 ML", category: "control-peso", price: 89900 },
  { id: "colageno", name: "Colágeno Hidrolizado", size: "300 G", category: "bienestar", price: 96900, isNew: true },
  { id: "multivitaminico", name: "Multivitamínico Diario", size: "60 tabletas", category: "bienestar", price: 49900, bestSeller: true },
  { id: "omega-3", name: "Omega 3", size: "90 softgels", category: "bienestar", price: 59900 },
  { id: "vitamina-c", name: "Vitamina C + Zinc", size: "60 tabletas", category: "bienestar", price: 34900 },
  { id: "magnesio", name: "Citrato de Magnesio", size: "60 cápsulas", category: "bienestar", price: 44900 },
  { id: "barra-proteica-12", name: "Barra Proteica Caja x12", size: "12 unidades", category: "snacks", price: 84000, salePrice: 67200 },
  { id: "pancakes-proteicos", name: "Pancakes Proteicos", size: "500 G", category: "snacks", price: 54900, isNew: true },
  { id: "avena-proteica", name: "Avena Proteica Overnight", size: "600 G", category: "snacks", price: 69900 },
  { id: "shaker", name: "Shaker Aeturnus", size: "700 ML", category: "accesorios", price: 29900 },
  { id: "morral", name: "Morral Aeturnus", size: "25 L", category: "accesorios", price: 159900 },
];

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
