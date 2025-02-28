import { Text } from "@/shared-components";
import { Product } from "@/stores/states/product.state";
import { ImageOff } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="w-full break-inside-avoid-column rounded-md bg-white p-2 shadow-sm transition-shadow hover:shadow-md">
      <figure className="relative h-auto w-full pb-2">
        {product.imgURL ? (
          <Image
            src={product.imgURL}
            alt={product.name}
            width={800}
            height={600}
            className="h-auto w-full rounded-sm object-contain"
            sizes="100vw"
          />
        ) : (
          <ImageOff
            strokeWidth={1}
            className="h-auto w-full text-neutral-400"
          />
        )}
      </figure>

      <header className="flex items-start justify-between">
        <Text variant="bodyBase" weight="semi_bold">
          {product.name}
        </Text>
        <output className="flex min-w-fit items-start justify-center gap-2">
          <Text
            variant="bodyBase"
            weight="semi_bold"
            className="text-secondary-400"
          >
            ৳ {product.price}
          </Text>
        </output>
      </header>

      <footer>
        <Text
          variant="bodyXSmall"
          className="line-clamp-2 overflow-hidden text-ellipsis text-neutral-400"
        >
          {product.description}
        </Text>
      </footer>
    </article>
  );
};
