"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useGetBranchProductsQuery } from "@/stores/services/products/product.service";
import {
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared-components";
import { Loader2, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BRANCH_ID } from "@/lib/constants";
import Image from "next/image";
import { Product } from "@/lib/types/products";

const Root = () => {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetBranchProductsQuery(BRANCH_ID);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Get unique categories from products
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = new Set(
      products.map((product) => product.category),
    );
    return ["all", ...Array.from(uniqueCategories)];
  }, [products]);

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesSearch =
        !debouncedSearch ||
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearch, activeCategory]);

  // Filter products based on search term
  const searchResults: Product[] =
    products?.filter((product) => {
      if (!debouncedSearch) return false;
      return product.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    }) || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        clearSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="p-4" ref={searchContainerRef}>
      <div className="relative max-w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {productsLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <Input
          className="w-full pl-10 pr-10"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      {productsError && (
        <div className="mt-4 text-sm text-red-500">
          {productsError instanceof Error
            ? productsError.message
            : "Failed to load products"}
        </div>
      )}
      {debouncedSearch && searchResults.length > 0 && (
        <div className="absolute z-10 mt-2 w-[calc(100vw-30px)] rounded border bg-white shadow-md">
          {searchResults.map((product) => (
            <div key={product.id} className="rounded border p-2">
              <div className="flex items-center gap-4">
                {product.imgURL && (
                  <Image
                    src={product.imgURL}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                )}
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">৳{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {debouncedSearch && searchResults.length === 0 && (
        <div className="mt-4 text-sm text-gray-500">
          No products found matching &quot;{debouncedSearch}&quot;
        </div>
      )}

      <section className="mt-8">
        <Tabs defaultValue="all" onValueChange={setActiveCategory}>
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category ?? ""}
                className="capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category ?? ""}>
              {productsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="flex w-full flex-wrap gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {!productsLoading && filteredProducts.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No products found
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {product.imgURL && (
        <div className="relative mb-4 aspect-square">
          <Image
            src={product.imgURL}
            alt={product.name}
            fill
            className="rounded-md object-cover"
          />
        </div>
      )}
      <h3 className="mb-2 font-medium">{product.name}</h3>
      <p className="text-sm text-gray-600">৳{product.price}</p>
    </section>
  );
};

export default Root;
