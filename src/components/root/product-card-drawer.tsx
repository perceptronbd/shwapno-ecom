"use client";
import { Product } from "@/lib/types/products";
import { Button, Input, Text } from "@/shared-components";
import { ImageOff, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export const ProductCardDrawer = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const totalAmount = quantity * parseFloat(product.price);
  return (
    <article className="flex h-full flex-col gap-4 p-4">
      <figure className="relative min-h-60 w-full">
        {product.imgURL ? (
          <Image
            src={product.imgURL}
            alt={product.name}
            width={800}
            height={600}
            className="rounded-md object-cover"
          />
        ) : (
          <aside className="flex h-full items-center justify-center rounded-md bg-neutral-100">
            <ImageOff className="h-12 w-12 text-neutral-400" />
          </aside>
        )}
      </figure>

      <header>
        <hgroup className="flex items-start justify-between">
          <Text
            variant="titleLarge"
            weight="bold"
            className="text-secondary-400"
          >
            {product.name}
          </Text>

          <output className="flex min-w-fit items-baseline">
            <Text
              variant="bodyLarge"
              weight="bold"
              className="text-neutral-900"
            >
              ৳ {product.price} BDT
            </Text>
          </output>
        </hgroup>

        {product.category && (
          <Text variant="bodySmall" className="capitalize text-neutral-400">
            Category: {product.category}
          </Text>
        )}
        {product.description && (
          <Text variant="bodySmall" className="text-neutral-900">
            {product.description}
          </Text>
        )}
      </header>

      <footer className="mt-auto space-y-4">
        <section className="flex items-center justify-between">
          <fieldset className="flex items-center gap-4">
            <Button
              aria-label="Decrease quantity"
              onClick={handleDecrement}
              variant="outline"
              className="rounded-full"
              size="icon"
            >
              <Minus size={16} />
            </Button>
            <Input
              type="number"
              min="0"
              value={quantity}
              onChange={handleInputChange}
              className="h-10 w-16 text-center"
            />
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              aria-label="Increase quantity"
              onClick={handleIncrement}
            >
              <Plus size={16} />
            </Button>
          </fieldset>
          <output className="flex flex-col items-end">
            <Text variant="bodyXSmall" className="text-neutral-400">
              Total Amount:
            </Text>
            <Text
              variant="titleLarge"
              weight="bold"
              className="text-neutral-900"
            >
              ৳{" "}
              <span className="text-secondary-400">
                {totalAmount.toFixed(2)}
              </span>{" "}
              BDT
            </Text>
          </output>
        </section>
        <nav className="grid grid-cols-2 gap-4">
          <Button>Buy Now</Button>
          <Button variant="outline">Add to Cart</Button>
        </nav>
      </footer>
    </article>
  );
};
