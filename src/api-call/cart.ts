import axios from "axios";

import { ResponseCart } from "../types/cart"; // you can see the response body in types/cart.ts

export const fetchCartData = async (
  // api call for getting cart data
  token: string
): Promise<ResponseCart | null> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: header,
    })
    .catch((err) => err);
  if (data.data === "cart empty") {
    return null;
  }
  return data.data;
};

export const deleteProductFromCart = async (
  //api call for deleting product from cart
  token: string,
  productId: string
): Promise<ResponseCart | null> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .delete(`${import.meta.env.VITE_API_URL}/cart/product/${productId}`, {
      headers: header,
    })
    .catch((err) => err);

  if (data.data.products.length === 0) {
    return null;
  }
  return data.data;
};
