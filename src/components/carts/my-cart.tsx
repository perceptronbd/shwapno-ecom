"use client";
import { Button, cn, Text } from "@/shared-components";
import { CartItemRow } from "./carts-item";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import {
  useGetCartQuery,
  useUpdateCartMutation,
} from "@/stores/services/cart.service";
import {
  initializeCart,
  selectCartItems,
  selectCartSessionId,
} from "@/stores/slices/cart.slice";
import { EmptyCart } from "./empty-cart";
import { useEffect, useState, useCallback } from "react";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { LoadingCartSkeleton } from "./loading-cart";
import { selectBranchName } from "@/stores/slices/branch.slice";

export const MyCart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const branchName = useAppSelector(selectBranchName);

  const [isInitialized, setIsInitialized] = useState(false);
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>(
    {},
  );
  const [hasQuantityChanged, setHasQuantityChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [updateCart] = useUpdateCartMutation();
  const sessionId = useAppSelector(selectCartSessionId);
  const { data: cartData, isLoading } = useGetCartQuery(sessionId!, {
    skip: !sessionId,
  });
  const cartItems = useAppSelector(selectCartItems);

  // Initialize cart and sync with server data
  useEffect(() => {
    dispatch(initializeCart());
    setIsInitialized(true);
  }, [dispatch]);

  // Update local quantities when cart data changes
  useEffect(() => {
    if (cartData?.data) {
      const initialQuantities = cartData.data.items.reduce(
        (acc, item) => {
          acc[item.id] = item.quantity;
          return acc;
        },
        {} as Record<string, number>,
      );
      setItemQuantities(initialQuantities);
      setHasQuantityChanged(false);
    }
  }, [cartData]);

  const saveCartChanges = useCallback(async () => {
    if (!sessionId || !hasQuantityChanged) return;

    setIsSaving(true);
    try {
      const updatedItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: itemQuantities[item.id],
      }));

      // Use unwrap to get the actual response
      const response = await updateCart({
        sessionId,
        data: { items: updatedItems },
      }).unwrap();

      // Update local state with the response data immediately
      if (response.data?.items) {
        const updatedQuantities = response.data.items.reduce(
          (acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
          },
          {} as Record<string, number>,
        );

        setItemQuantities(updatedQuantities);
        setHasQuantityChanged(false);
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
    } finally {
      setIsSaving(false);
    }
  }, [sessionId, cartItems, itemQuantities, hasQuantityChanged, updateCart]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) return;

    setItemQuantities((prev) => {
      if (prev[itemId] === newQuantity) return prev;
      return { ...prev, [itemId]: newQuantity };
    });

    setHasQuantityChanged(true);
  };

  const handlePlaceOrder = async () => {
    if (hasQuantityChanged) {
      await saveCartChanges();
    }

    router.push(ROUTES.CHECKOUT(branchName));
  };

  const totalPrice =
    cartItems?.reduce((total, item) => {
      // Check if item.price exists and is valid
      const price = item?.price ? parseFloat(item.price.toString()) : 0;
      return total + price;
    }, 0) || 0; // Fallback if cartItems is undefined

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
              key={item.productId}
              item={item}
              quantity={itemQuantities[item.id] ?? 1}
              onQuantityChange={(newQuantity) =>
                handleQuantityChange(item.id, newQuantity)
              }
            />
          ))}
          <div className="h-24 w-full" />
        </section>
      </aside>

      <footer className="fixed bottom-0 left-0 flex w-full items-center justify-between rounded-t-md border bg-white p-4">
        <div className="flex items-center gap-4">
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
        </div>
        <nav>
          <Button
            className={cn("w-full", {
              "bg-wite border border-secondary-400 text-secondary-400 shadow-lg shadow-secondary-400/10":
                hasQuantityChanged,
            })}
            size="lg"
            onClick={hasQuantityChanged ? saveCartChanges : handlePlaceOrder}
            disabled={isSaving}
            loading={isSaving}
          >
            {hasQuantityChanged ? "Save Changes " : "Place Order"}
          </Button>
        </nav>
      </footer>
    </section>
  );
};
