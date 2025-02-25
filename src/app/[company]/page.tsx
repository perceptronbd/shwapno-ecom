"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/shared-components";
import { Loader2, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Root = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

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
    setSearchResults([]);
    setError(null);
  };

  useEffect(() => {
    const searchProducts = async () => {
      if (!debouncedSearch) {
        setSearchResults([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Replace with your actual API endpoint
        const response = await fetch(
          `/api/products/search?q=${debouncedSearch}`,
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    searchProducts();
  }, [debouncedSearch]);

  return (
    <div className="p-4" ref={searchContainerRef}>
      <div className="relative max-w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {isLoading ? (
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

      {error && <div className="mt-4 text-sm text-red-500">{error}</div>}

      {searchResults.length > 0 && (
        <div className="mt-4 space-y-2">
          {searchResults.map((result: any) => (
            <div key={result.id} className="rounded border p-2">
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Root;
