"use client";

import { BRANCH_ID } from "@/lib/constants";
import { useGetBranchProductsQuery } from "@/stores/services/product.service";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Drawer,
} from "@/shared-components";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProduct";
import { SearchBar } from "./search-bar";
import { ProductCard } from "./product-card";
import { useEffect, useState } from "react";
import { ProductCardDrawer } from "./product-card-drawer";
import { Product } from "@/stores/states/product.state";
import { useAppDispatch } from "@/stores/hook";
import { initializeCart } from "@/stores/slices/cart.slice";

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetBranchProductsQuery(BRANCH_ID);

  const {
    searchTerm,
    setSearchTerm,
    setActiveCategory,
    categories,
    filteredProducts,
    // searchResults,
    // debouncedSearch,
  } = useProducts(products);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearSearch={() => setSearchTerm("")}
        isLoading={productsLoading}
      />

      {productsError && (
        <div className="mt-4 text-sm text-red-500">
          {productsError instanceof Error
            ? productsError.message
            : "Failed to load products"}
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
                <div className="columns-2 space-y-4">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="w-full cursor-pointer text-left"
                      aria-label={`View details for ${product.name}`}
                    >
                      <ProductCard product={product} />
                    </button>
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
      <Drawer
        isOpen={isOpen}
        onClose={handleCloseDrawer}
        className="h-[90%]"
        isCrossVisible={false}
      >
        {selectedProduct && <ProductCardDrawer product={selectedProduct} />}
      </Drawer>
    </>
  );
};

export default Home;
