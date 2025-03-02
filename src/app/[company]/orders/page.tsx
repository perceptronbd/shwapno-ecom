import { LoadingOrdersSkeleton } from "@/components/orders/loading-orders";
import { Orders } from "@/components/orders/order";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shwapno QR | Orders",
  description: "See your orders",
};

export default function OrderPage() {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<LoadingOrdersSkeleton />}>
        <Orders />
      </Suspense>
    </div>
  );
}
