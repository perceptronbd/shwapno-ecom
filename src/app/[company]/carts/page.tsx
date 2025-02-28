import { LoadingCart } from "@/components/carts/loading-cart";
import { MyCart } from "@/components/carts/my-cart";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shwapno QR | My Cart",
  description: "My Cart",
};

const Carts = () => {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<LoadingCart />}>
        <MyCart />
      </Suspense>
    </div>
  );
};

export default Carts;
