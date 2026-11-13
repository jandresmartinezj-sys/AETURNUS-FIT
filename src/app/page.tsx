import { Catalog } from "@/components/Catalog";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Catalog />
      <Faq />
    </>
  );
}
