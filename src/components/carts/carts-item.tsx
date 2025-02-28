import { Text } from "@/shared-components";
import { CartItem } from "@/stores/states/cart.state";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const CartItemRow = ({ item }: { item: CartItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

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

  return (
    <article className="flex items-center justify-between border-b py-4">
      <section className="flex items-center gap-4">
        <figure className="h-16 w-16 bg-neutral-200">
          {item.product.imgURL && (
            <Image
              src={item.product.imgURL}
              alt={item.product.name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          )}
        </figure>
        <header>
          <Text variant="bodyBase" weight="semi_bold">
            {item.product.name}
          </Text>
          <Text variant="bodySmall" className="text-neutral-500">
            {item.product.description?.substring(0, 30) || "something"}
          </Text>
          <Text variant="bodyBase" weight="semi_bold">
            ৳ {item.price}
          </Text>
        </header>
      </section>

      <section className="flex items-center gap-4">
        <fieldset className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="flex h-8 w-8 items-center justify-center rounded-md border"
          >
            −
          </button>
          <input
            type="text"
            value={quantity}
            onChange={handleInputChange}
            className="w-8 text-center"
          />
          <button
            onClick={handleIncrement}
            className="flex h-8 w-8 items-center justify-center rounded-md border"
          >
            +
          </button>
        </fieldset>
        <button className="text-red-400">
          <Trash2 size={20} />
        </button>
      </section>
    </article>
  );
};
