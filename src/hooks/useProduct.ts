import { useDebounce } from "./useDebounce";
import { useState, useMemo } from "react";
import { Product } from "@/lib/types/products";

export const useProducts = (products: Product[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = new Set(
      products.map((product) => product.category),
    );
    return ["all", ...Array.from(uniqueCategories)];
  }, [products]);

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

  const searchResults = useMemo(() => {
    if (!products || !debouncedSearch) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [products, debouncedSearch]);

  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    categories,
    filteredProducts,
    searchResults,
    debouncedSearch,
  };
};
