import axios from "axios";

import { ResponseCart, ProductInCartTypes } from "../types/cart";

export const fetchCartData = async (
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
