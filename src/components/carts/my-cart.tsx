"use client";

import { Button, Text } from "@/shared-components";
import { CartItemRow } from "./carts-item";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { useGetCartQuery } from "@/stores/services/cart.service";
import {
  initializeCart,
  selectCartItems,
  selectCartSessionId,
} from "@/stores/slices/cart.slice";
import { EmptyCart } from "./empty-cart";
import { useEffect, useState } from "react";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { LoadingCartSkeleton } from "./loading-cart";

export const MyCart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const sessionId = useAppSelector(selectCartSessionId);
  const { isLoading } = useGetCartQuery(sessionId!, {
    skip: !sessionId,
  });
  const cartItems = useAppSelector(selectCartItems);

  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    dispatch(initializeCart());
    setIsInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    const quantities: Record<string, number> = {};
    cartItems.forEach((item) => {
      quantities[item.id] = item.quantity;
    });
    setItemQuantities(quantities);
  }, [cartItems]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const quantity = itemQuantities[item.id] || item.quantity;
    return total + parseFloat(item.price.toString()) * quantity;
  }, 0);

  const handlePlaceOrder = () => {
    router.push(ROUTES.CHECKOUT);
  };

  if (isLoading || !isInitialized) return <LoadingCartSkeleton />;

  return cartItems.length === 0 ? (
    <EmptyCart />
  ) : (
    <section className="relative">
      <aside>
        <header>
          <Text variant="titleLarge" weight="bold" className="mb-6">
            My Cart
          </Text>
        </header>

        <section className="space-y-2">
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              quantity={itemQuantities[item.id] || item.quantity}
              onQuantityChange={(newQuantity) =>
                handleQuantityChange(item.id, newQuantity)
              }
            />
          ))}

          <div className="h-24 w-full" />
        </section>
      </aside>

      <footer className="fixed bottom-0 left-0 flex w-full items-center justify-between rounded-t-md border bg-white p-4">
        <div>
          <Text
            variant="titleMedium"
            weight="semi_bold"
            className="text-neutral-400"
          >
            Total Price
          </Text>
          <output className="text-right">
            <Text variant="titleLarge" weight="bold">
              ৳ {totalPrice.toFixed(2)}
            </Text>
          </output>
        </div>
        <nav>
          <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </nav>
      </footer>
    </section>
  );
};
