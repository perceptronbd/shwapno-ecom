"use client";

import { BRANCH_ID } from "@/lib/constants";
import {
  CheckoutFormData,
  checkoutSchema,
} from "@/lib/validations/checkout.schema";
import { Button, FloatingLabelInput, Text } from "@/shared-components";
import { useAppSelector } from "@/stores/hook";
import { useCreateOrderMutation } from "@/stores/services/order.service";
import { selectCartSessionId } from "@/stores/slices/cart.slice";
import { ROUTES } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const Checkout = () => {
  const router = useRouter();
  const sessionId = useAppSelector(selectCartSessionId);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (!sessionId) {
      console.error("No session ID found");
      return;
    }

    try {
      const [firstName, ...lastNameParts] = data.name.trim().split(" ");
      const lastName = lastNameParts.join(" ") || firstName;

      const result = await createOrder({
        branchId: BRANCH_ID,
        data: {
          customer: {
            firstName,
            lastName,
            email: data.email,
            mobile: data.mobile,
            address: data.address,
          },
          sessionId,
        },
      }).unwrap();

      if (result.success) {
        router.push(
          `${ROUTES.ORDERS}/${result.data?.id}?orderData=${encodeURIComponent(JSON.stringify(result.data))}`,
        );
      }
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  return (
    <main>
      <header>
        <Text variant="titleLarge" weight="bold" className="mb-6">
          Check Out
        </Text>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative h-full space-y-4"
      >
        <div>
          <FloatingLabelInput
            label="Full Name"
            placeholder="Enter your full name"
            errorMessage={errors.name?.message}
            {...register("name")}
          />
        </div>

        <div>
          <FloatingLabelInput
            label="Mobile Number"
            placeholder="01XXXXXXXXX"
            errorMessage={errors.mobile?.message}
            {...register("mobile")}
          />
        </div>

        <div>
          <FloatingLabelInput
            type="email"
            label="Email Address"
            placeholder="example@email.com"
            errorMessage={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div>
          <FloatingLabelInput
            label="Delivery Address"
            placeholder="Enter your full address"
            errorMessage={errors.address?.message}
            {...register("address")}
          />
        </div>

        <Button
          type="submit"
          className="fixed bottom-4 right-1/2 w-[calc(100%-16px)] translate-x-1/2"
          loading={isLoading}
        >
          Place Order
        </Button>
      </form>
    </main>
  );
};
