import { Product } from "./product.state";

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Cart {
  id: string;
  sessionId: string;
  createdAt: Date;
  updatedAt: Date;
  items: CartItem[];
}

export interface CartState {
  sessionId: string | null;
  customerId: string | null;
  items: CartItem[];
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  sessionId?: string;
}

export interface CartResponse {
  success: boolean;
  code: number;
  data?: Cart;
  message: string;
}

export interface UpdateCartItemRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartRequest {
  items: UpdateCartItemRequest[];
}
