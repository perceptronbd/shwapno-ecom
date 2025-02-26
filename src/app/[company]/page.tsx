import Home from "@/components/root/home";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products | Shwapno",
  description: "Browse our wide range of products at Shwapno",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Loading products..</div>}>
        <Home />
      </Suspense>
    </div>
  );
}
