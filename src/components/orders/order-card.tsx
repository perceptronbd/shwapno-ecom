"use client";
import { cn, Text } from "@/shared-components";
import { Order } from "@/stores/states/order.state";
import { ROUTES } from "@/utils/routes";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();

  return (
    <button
      key={order.id}
      disabled={order.status === "CANCELLED" || order.status === "RETURNED"}
      className={cn("w-full cursor-pointer transition-colors", {
        "cursor-not-allowed opacity-60":
          order.status === "CANCELLED" || order.status === "RETURNED",
      })}
      onClick={() => router.push(ROUTES.ORDER_TRACK(order.id))}
    >
      <article className="rounded-md bg-white p-4 hover:bg-neutral-50">
        <header className="mb-4 flex items-center justify-between">
          <Text variant="bodySmall" className="text-neutral-400">
            Order Date: {new Date(order.orderDate).toLocaleString()}
          </Text>
          <div
            className={cn(
              "flex w-fit items-center justify-center rounded-full border px-2 text-xs",
              {
                "border-yellow-400 bg-yellow-100 text-yellow-400":
                  order.status === "PENDING",
                "border-blue-400 bg-blue-100 text-blue-400":
                  order.status === "PROCESSING",
                "border-purple-400 bg-purple-100 text-purple-400":
                  order.status === "DELIVERED",
                "border-green-400 bg-green-100 text-green-400":
                  order.status === "COMPLETED",
                "border-red-400 bg-red-100 text-red-400":
                  order.status === "CANCELLED",
                "border-orange-400 bg-orange-100 text-orange-400":
                  order.status === "RETURNED",
              },
            )}
          >
            {order.status}
          </div>
        </header>

        <div className="space-y-2">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <div className="flex gap-2">
                <figure className="relative aspect-square size-14">
                  {item.product.imgURL ? (
                    <Image
                      src={item.product.imgURL}
                      alt={item.product.name}
                      fill
                      className="rounded-sm object-contain"
                    />
                  ) : (
                    <ImageOff
                      strokeWidth={1}
                      className="h-auto w-full text-neutral-400"
                    />
                  )}
                </figure>
                <div>
                  <Text weight="semi_bold">{item.product.name}</Text>
                  <Text className="text-neutral-500" variant="bodyXSmall">
                    Quantity: {item.quantity}
                  </Text>
                </div>
              </div>
              <Text>৳{item.price}</Text>
            </div>
          ))}
        </div>

        <footer className="mt-4 flex justify-between">
          <Text className="text-neutral-400">Total:</Text>
          <Text weight="semi_bold" className="text-secondary-400">
            ৳ {order.totalAmount}
          </Text>
        </footer>
      </article>
    </button>
  );
};
