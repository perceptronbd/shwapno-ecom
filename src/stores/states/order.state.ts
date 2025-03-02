import { Product } from "./product.state";

export interface OrderCustomer {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  imgURL?: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Order {
  id: string;
  customerId: string;
  branchId: string;
  orderDate: string;
  totalAmount: string;
  status:
    | "PENDING"
    | "PROCESSING"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED"
    | "RETURNED";
  customer: OrderCustomer;
  items: OrderItem[];
}

export interface CreateOrderRequest {
  customer: {
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
  };
  sessionId: string;
}

export interface OrderResponse {
  success: boolean;
  code: number;
  data?: Order;
  message: string;
}
// ... existing interfaces ...

export interface CustomerOrdersResponse {
  success: boolean;
  code: number;
  data: Order[];
  message: string;
}
