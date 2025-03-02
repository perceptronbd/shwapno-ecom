"use client";

import { Text } from "@/shared-components";
import { useGetCustomerOrdersQuery } from "@/stores/services/order.service";
import { useEffect, useState } from "react";
import { OrderCard } from "./order-card";
import { LoadingOrdersSkeleton } from "./loading-orders";
import { OrderNotFound } from "./order-not-found";

export const Orders = () => {
  const [customerId, setCustomerId] = useState<string | null>(null);

  useEffect(() => {
    const storedCustomerId = localStorage.getItem("customerId");
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
  }, []);

  const { data: orders, isLoading } = useGetCustomerOrdersQuery(
    customerId ?? "",
    {
      skip: !customerId,
    },
  );

  if (isLoading) return <LoadingOrdersSkeleton />;
  // !orders?.length
  return !orders?.length ? (
    <OrderNotFound />
  ) : (
    <main className="space-y-4">
      <Text variant="titleLarge" weight="bold">
        My Orders
      </Text>
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </main>
  );
};
