import { Text } from "@/shared-components";
import { PackageOpen } from "lucide-react";

export const OrderNotFound = () => {
  return (
    <section className="flex h-[60vh] flex-col items-center justify-center px-10">
      <PackageOpen size={150} strokeWidth={1.5} className="text-neutral-300" />
      <Text
        variant="titleLarge"
        weight="bold"
        className="my-4 text-neutral-900"
      >
        No Orders Found
      </Text>
      <Text variant="bodyBase" className="text-center text-neutral-500">
        Please place an order to see it here.
      </Text>
    </section>
  );
};
