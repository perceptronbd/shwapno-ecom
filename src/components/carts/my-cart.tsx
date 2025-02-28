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

  useEffect(() => {
    dispatch(initializeCart());
    setIsInitialized(true);
  }, [dispatch]);

  const { isLoading } = useGetCartQuery(sessionId!, {
    skip: !sessionId,
  });
  const cartItems = useAppSelector(selectCartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price.toString()) * item.quantity,
    0,
  );

  if (isLoading || !isInitialized) return <LoadingCart />;

  return cartItems.length === 0 ? (
    <EmptyCart />
  ) : (
    <main className="container mx-auto p-4">
      <header>
        <Text variant="titleLarge" weight="bold" className="mb-6">
          My Cart
        </Text>
      </header>

      <section className="space-y-2">
        {cartItems.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </section>

      <footer className="mt-8 flex items-center justify-between border-t pt-4">
        <Text variant="titleMedium" weight="bold">
          Total Price
        </Text>
        <output className="text-right">
          <Text variant="titleLarge" weight="bold">
            ৳ {totalPrice.toFixed(2)}
          </Text>
        </output>
      </footer>

      <nav className="mt-4">
        <Button className="w-full" size="lg">
          Place Order
        </Button>
      </nav>
    </main>
  );
};
