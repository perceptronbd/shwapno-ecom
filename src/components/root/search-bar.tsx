"use client";

import { Input } from "@/shared-components";
import { Loader2, Search, X } from "lucide-react";
import { useRef } from "react";
import { useClickOutside } from "@/shared-components/src/hooks/useClickOutside";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  isLoading?: boolean;
}

export const SearchBar = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  isLoading,
}: SearchBarProps) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  useClickOutside(searchContainerRef, onClearSearch);

  return (
    <div className="relative max-w-full" ref={searchContainerRef}>
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
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button
          onClick={onClearSearch}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};
