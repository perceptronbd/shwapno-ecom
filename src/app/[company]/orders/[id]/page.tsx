"use client";

import { Button, cn, Text } from "@/shared-components";
import { Order } from "@/stores/states/order.state";
import { ROUTES } from "@/utils/routes";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  useEffect(() => {
    const orderData = searchParams.get("orderData");
    if (orderData) {
      setOrderDetails(JSON.parse(orderData));
    }
  }, [searchParams]);

  if (!orderDetails) return null;

  const handleOK = () => {
    router.replace(ROUTES.HOME);
  };

  return (
    <main className="relative space-y-6 p-4">
      <header>
        <Text variant="titleLarge" weight="bold">
          Order Details
        </Text>
      </header>

      <section className="space-y-6">
        <div className="relative w-full rounded-md border border-secondary-300 p-4">
          <div className="absolute -top-3 left-4 rounded-full border border-secondary-300 bg-white px-2">
            <Text
              variant="bodySmall"
              weight="semi_bold"
              className="text-secondary-300"
            >
              Customer Information
            </Text>
          </div>
          <div className="mt-2 grid grid-cols-3">
            <Text className="text-neutral-400">Name</Text>{" "}
            <Text weight="medium" className="col-span-2">
              : {orderDetails.customer.firstName}{" "}
              {orderDetails.customer.lastName}
            </Text>
            <Text className="text-neutral-400">Email</Text>
            <Text weight="medium" className="col-span-2">
              : {orderDetails.customer.email}
            </Text>
            <Text className="text-neutral-400">Mobile</Text>
            <Text weight="medium" className="col-span-2">
              : {orderDetails.customer.mobile}
            </Text>
            <Text className="text-neutral-400">Address</Text>
            <Text weight="medium" className="col-span-2 break-words">
              : {orderDetails.customer.address}
            </Text>
          </div>
        </div>

        <div className="w-full">
          <div className="mb-4">
            <Text
              variant="bodySmall"
              weight="semi_bold"
              className="text-secondary-300"
            >
              Order Summary
            </Text>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex">
              <Text variant="bodyXSmall" className="text-neutral-400">
                Date
              </Text>
              <Text variant="bodyXSmall" weight="medium">
                : {new Date(orderDetails.orderDate).toLocaleString()}
              </Text>
            </div>
            <div className="flex items-start justify-end">
              <div
                className={cn(
                  "flex w-fit items-center justify-center rounded-full border px-2 text-xs",
                  {
                    "border-yellow-400 bg-yellow-100 text-yellow-400":
                      orderDetails.status === "PENDING",
                    "border-blue-400 bg-blue-100 text-blue-400":
                      orderDetails.status === "PROCESSING",
                    "border-purple-400 bg-purple-100 text-purple-400":
                      orderDetails.status === "DELIVERED",
                    "border-green-400 bg-green-100 text-green-400":
                      orderDetails.status === "COMPLETED",
                    "border-red-400 bg-red-100 text-red-400":
                      orderDetails.status === "CANCELLED",
                    "border-orange-400 bg-orange-100 text-orange-400":
                      orderDetails.status === "RETURNED",
                  },
                )}
              >
                {orderDetails.status}
              </div>
            </div>
            <div className="col-span-3">
              {orderDetails.items.map((item) => (
                <div
                  key={item?.productId}
                  className="flex items-center justify-between rounded-md border p-2"
                >
                  <div className="flex gap-2">
                    <figure className="relative aspect-square size-14">
                      {item.product.imgURL ? (
                        <Image
                          src={item.product.imgURL}
                          alt={item.product.name}
                          width={20}
                          height={20}
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
            <Text className="text-neutral-400">Total:</Text>{" "}
            <Text
              weight="semi_bold"
              className="col-end-4 flex justify-end text-secondary-400"
            >
              ৳ {orderDetails.totalAmount}
            </Text>
          </div>
        </div>
      </section>
      <footer>
        <Button
          className="fixed bottom-2 right-1/2 w-[calc(100%-16px)] translate-x-1/2"
          onClick={handleOK}
        >
          OK
        </Button>
      </footer>
    </main>
  );
}
