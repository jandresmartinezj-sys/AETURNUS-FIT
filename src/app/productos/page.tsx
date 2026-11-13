import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = { title: "Productos" };

export default function Productos() {
  return (
    <>
      <Catalog />
      <Faq />
    </>
  );
}
