import { LoadingCartSkeleton } from "@/components/carts/loading-cart";
import { MyCart } from "@/components/carts/my-cart";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shwapno QR | My Cart",
  description: "My Cart",
};

const CartsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<LoadingCartSkeleton />}>
        <MyCart />
      </Suspense>
    </div>
  );
};

export default CartsPage;
