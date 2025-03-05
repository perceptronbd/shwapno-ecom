export interface OrderCustomer {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: string;
  product: {
    id: string;
    name: string;
    imgURL?: string;
  };
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
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  customer: OrderCustomer;
  sessionId: string;
}
