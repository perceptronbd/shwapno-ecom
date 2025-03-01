import { Checkout } from "@/components/carts/checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shwapno QR | Checkout",
  description: "Place Orders",
};

const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-4">
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
