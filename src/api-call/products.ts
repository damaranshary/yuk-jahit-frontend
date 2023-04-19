import axios from "axios";
import {
  AddProductToCartTypes,
  ResponseProducts,
  ProductTypes,
  ResponseProductById,
} from "../types/products";

import { ResponseCart } from "../types/cart";

export const fetchAllProducts = async (): Promise<ResponseProducts> => {
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/product/?name=`)
    .catch((err) => err);
  return data.data;
};

export const fetchProductById = async (id: string): Promise<ResponseProductById> => {
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/product/${id}`)
    .catch((err) => err);
  return data.data;
};

export const fetchProductsByQuery = async (query: string): Promise<ResponseProducts> => {
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/product/filter/?name=${query}&priceMin=0&priceMax=1000000&category=`)
    .catch((err) => err);
  return data.data;
};

export const addProductToCart = async ({
  productId,
  quantity,
  token
}: AddProductToCartTypes): Promise<ResponseCart> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .post(
      `${import.meta.env.VITE_API_URL}/cart`,
      {
        productId,
        quantity,
      },
      {
        headers: header,
      }
    )
    .catch((err) => err);
  return data.data;
};
