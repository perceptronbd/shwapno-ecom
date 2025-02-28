import { Button, Input, Text } from "@/shared-components";
import { CartItem } from "@/stores/states/cart.state";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemRowProps {
  item: CartItem;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const CartItemRow = ({
  item,
  quantity,
  onQuantityChange,
}: CartItemRowProps) => {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      onQuantityChange(value);
    }
  };

  return (
    <article className="flex items-center justify-between rounded-md bg-white p-2">
      <section className="flex h-full items-start gap-4">
        <figure className="size-22 rounded-sm bg-neutral-200">
          {item.product.imgURL && (
            <div className="aspect-square size-full rounded-md">
              <Image
                src={item.product.imgURL}
                alt={item.product.name}
                width={100}
                height={100}
                className="size-full rounded-sm object-cover"
              />
            </div>
          )}
        </figure>
        <header className="flex h-full flex-col items-start justify-between">
          <Text variant="bodySmall" weight="semi_bold">
            {item.product.name}
          </Text>

          <Text variant="bodyBase" weight="semi_bold">
            ৳ {item.price}
          </Text>
        </header>
      </section>

      <section className="flex h-full flex-col items-end justify-between gap-4">
        <button className="text-red-400">
          <Trash2 size={20} />
        </button>
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
      </section>
    </article>
  );
};
