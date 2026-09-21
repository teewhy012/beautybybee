import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { ShopGrid } from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop clean, cruelty-free skincare, makeup and body care from Beauty by Bee. Free shipping over ₦50.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="The shop"
        title="Products worth buzzing about"
        description="Cleanly formulated, small-batch and cruelty-free. Free shipping on orders over ₦60, with easy 30-day returns."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <ShopGrid />
      </section>
    </>
  );
}