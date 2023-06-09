export interface ResponseProducts {
  data: ProductTypes[];
}

export interface ProductCards {
  product: ProductTypes;
  index: number;
}
export interface ProductTypes {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  product_img: string;
  cloudinary_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AddProductToCartTypes {
  productId: string;
  quantity: number;
  token: string;
}

export interface ResponseProductById {
  data: ProductTypes;
}
