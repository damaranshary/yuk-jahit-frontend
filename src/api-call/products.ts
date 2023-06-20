import axios from "axios";
import {
  AddProductToCartTypes,
  ResponseProducts,
  ResponseProductById,
} from "../types/products"; // you can see the response body in types/products.ts

import { ResponseCart } from "../types/cart";

export const fetchAllProducts = async (): Promise<ResponseProducts> => {
  // api call for getting all products
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/product/?name=`)
    .catch((err) => err);
  return data.data;
};

export const fetchProductById = async (
  // api call for getting product by id
  id: string
): Promise<ResponseProductById> => {
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/product/${id}`)
    .catch((err) => err);
  return data.data;
};

export const fetchProductsByQuery = async (
  // api call for getting products by query
  query: string
): Promise<ResponseProducts> => {
  const data = await axios
    .get(
      `${
        import.meta.env.VITE_API_URL
      }/product/filter/?name=${query}&priceMin=0&priceMax=1000000&category=` // the api itself needs the priceMin and priceMax query, so we just put it like this
    )
    .catch((err) => err);
  return data.data;
};

export const fetchProductsByCategory = async (
  // api call for getting products by category
  category: string
): Promise<ResponseProducts> => {
  const data = await axios
    .get(
      `${
        import.meta.env.VITE_API_URL
      }/product/filter/?name=&priceMin=0&priceMax=1000000&category=${category}` // same thing here
    )
    .catch((err) => err);
  return data.data;
};

export const addProductToCart = async ({
  // api call for adding product to cart
  productId,
  quantity,
  token, // you need a token to do this, therefore you need to login first
}: AddProductToCartTypes): Promise<ResponseCart> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .post(
      `${import.meta.env.VITE_API_URL}/cart`,
      {
        productId, // each product has its own id
        quantity, // you need the quantity of the product more than zero
      },
      {
        timeout: 10000,
        headers: header,
      }
    )
    .catch((err) => err);
  return data.data;
};
