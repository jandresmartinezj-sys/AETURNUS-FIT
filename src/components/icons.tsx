type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const CartIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h9.3a1 1 0 0 0 1-.8L20.5 7H6" />
  </svg>
);
export const SearchIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
export const CloseIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const MenuIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const FilterIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);
export const CheckIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m5 12 5 5 9-10" />
  </svg>
);
export const WhatsAppIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.200 8.200 0 0 1-4.200-1.150l-.3-.18-3 .78.800-2.900-.200-.300A8.200 8.200 0 1 1 12 20.200Zm4.500-6.100c-.250-.120-1.460-.720-1.690-.800-.220-.080-.390-.120-.550.120-.160.250-.630.800-.780.970-.140.160-.290.180-.530.060a6.700 6.700 0 0 1-3.350-2.930c-.250-.430.250-.400.720-1.340.080-.160.040-.300-.020-.430-.060-.120-.550-1.330-.760-1.820-.200-.480-.400-.410-.550-.420h-.470a.900.900 0 0 0-.650.300 2.750 2.750 0 0 0-.860 2.040c0 1.200.880 2.370 1 2.530.120.160 1.730 2.640 4.190 3.700 1.560.670 2.170.730 2.950.610.470-.070 1.460-.600 1.670-1.170.200-.580.200-1.070.140-1.170-.060-.110-.220-.170-.470-.290Z" />
  </svg>
);
