export interface ResponseCart {
  _id: string;
  owner: string;
  products: ProductInCartTypes[];
  bill: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductInCartTypes {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  _id: string;
  product_img: string;
}

export interface CartCardTypes {
  index: number;
  product: ProductInCartTypes;
  handleDeleteCart: (id: string) => void;
}
