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
import { LoadingCart } from "./loading-cart";
import { EmptyCart } from "./empty-cart";
import { useEffect, useState } from "react";

export const MyCart = () => {
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

  if (isLoading || !isInitialized) return <LoadingCart />;

  return cartItems.length === 0 ? (
    <EmptyCart />
  ) : (
    <section className="flex h-[calc(100dvh-100px)] flex-col justify-between">
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
        </section>
      </aside>

      <footer className="mt-8 flex items-center justify-between border-t pt-4">
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
        <nav className="mt-4">
          <Button className="w-full" size="lg">
            Place Order
          </Button>
        </nav>
      </footer>
    </section>
  );
};
