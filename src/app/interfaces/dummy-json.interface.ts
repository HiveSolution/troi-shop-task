export interface DummyJsonResponse {
  limit: number;
  skip: number;
  total: number;
  products: DummyJsonProduct[];
}

export interface DummyJsonProduct {
  [key: string]: string | number | string[];
  id: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  discountPrice: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}