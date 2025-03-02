"use client";

import { cn, Text } from "@/shared-components";
import { useGetCustomerOrdersQuery } from "@/stores/services/order.service";
import { useParams } from "next/navigation";

const orderStatuses = [
  "PENDING",
  "PROCESSING",
  "DELIVERED",
  "COMPLETED",
] as const;

export default function TrackOrderPage() {
  const { id } = useParams();
  const { data: orders } = useGetCustomerOrdersQuery(
    localStorage.getItem("customerId") ?? "",
    {
      skip: !localStorage.getItem("customerId"),
    },
  );

  const order = orders?.find((o) => o.id === id);

  if (!order) return null;

  return (
    <main className="p-4">
      <header className="mb-6">
        <Text variant="titleLarge" weight="bold">
          Track Order
        </Text>
      </header>

      <section className="relative space-y-6">
        <div className="absolute left-3 top-3 h-[calc(100%-24px)] w-0.5 bg-neutral-200" />

        {orderStatuses.map((status) => (
          <div key={status} className="flex items-center gap-4">
            <div
              className={cn("relative z-10 size-6 rounded-full border-2", {
                "animate-pulse border-secondary-400 bg-secondary-400":
                  order.status === status,
                "border-neutral-200 bg-white": order.status !== status,
              })}
            />
            <Text
              className={cn({
                "text-secondary-400": order.status === status,
                "text-neutral-400": order.status !== status,
              })}
            >
              Your order is {status.charAt(0) + status.slice(1).toLowerCase()}
            </Text>
          </div>
        ))}
      </section>
    </main>
  );
}
