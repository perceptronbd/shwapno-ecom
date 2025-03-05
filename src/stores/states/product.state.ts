import { ApiResponse } from "@/lib/types/api";

export interface Product {
  id: string;
  barcode: string | null;
  name: string;
  imgURL: string | null;
  imgPublicId: string | null;
  description: string;
  price: string;
  category: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ProductResponse = ApiResponse<Product[]>;
