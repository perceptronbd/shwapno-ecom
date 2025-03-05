import { ApiResponse } from "@/lib/types/api";
import { Product } from "./product.state";

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: string; // Changed to string to match backend
  product: Product;
}

export interface Cart {
  id: string;
  sessionId: string;
  customerId: string | null;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export type CartResponse = ApiResponse<Cart>;
export type DeleteCartItemResponse = ApiResponse<null>;

// Update request types
export interface AddToCartRequest {
  productId: string;
  quantity: number;
  sessionId?: string;
}

export interface UpdateCartItemRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartRequest {
  items: UpdateCartItemRequest[];
}
