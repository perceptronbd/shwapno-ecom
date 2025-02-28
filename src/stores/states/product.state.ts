export interface Product {
  id: string;
  barcode: string | null;
  name: string;
  description: string | null;
  price: string;
  imgURL: string | null;
  category: string | null;
}

export interface ProductResponse {
  success: boolean;
  code: number;
  data: Product[];
  message: string;
}
