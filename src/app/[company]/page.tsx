import Home from "@/components/root/home";
import { LoadingSkeleton } from "@/components/root/loading-home";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shwapno Quick Rentals (QR)",
  description: "Browse our wide range of products at Shwapno",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<LoadingSkeleton />}>
        <Home />
      </Suspense>
    </div>
  );
}
