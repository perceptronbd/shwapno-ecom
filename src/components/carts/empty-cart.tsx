import { Text } from "@/shared-components";
import { PackageOpen } from "lucide-react";

export const EmptyCart = () => {
  return (
    <section className="flex h-[60vh] flex-col items-center justify-center px-10">
      <PackageOpen size={150} strokeWidth={1.5} className="text-neutral-300" />
      <Text
        variant="titleLarge"
        weight="bold"
        className="my-4 text-neutral-900"
      >
        Your cart is empty
      </Text>
      <Text variant="bodyBase" className="text-center text-neutral-500">
        Add some products to your cart to see them here.
      </Text>
    </section>
  );
};
