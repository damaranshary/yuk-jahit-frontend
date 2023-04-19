import useSWR from "swr";

import { fetchUserData } from "../api-call/users";
import { deleteProductFromCart, fetchCartData } from "../api-call/cart";
import { fetchAllProducts, fetchProductById, fetchProductsByQuery } from "../api-call/products";

// this is a SWR function to get a user data
export const GetUser = (token: string | null) => {
  const { data, error, isLoading } = useSWR(token, (token) =>
    fetchUserData(token)
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
};

//this is a SWR function to get a cart data
// export const GetCart = (token: string | null) => {
//   const { data, error, isLoading } = useSWR(token, (token) =>
//     fetchCartData(token)
//   );

//   return {
//     cart: data,
//     isLoading,
//     isError: error,
//   };
// };

// export const DeleteProductFromCart = (token: string, productId: string) => {
//   const { data, error, isLoading } = useSWR(
//     [token, productId],
//     ([token, productId]) => deleteProductFromCart(token, productId)
//   );
//   return {
//     cart: data,
//     isLoading,
//     isError: error,
//   };
// };

//this is a SWR function to get a products data
export const GetProductsByQuery = (query: string | null) => {
  const { data, error, isLoading } = useSWR(query, (query) =>
    fetchProductsByQuery(query)
  );

  return {
    products: data,
    isLoading,
    isError: error,
  };
};

export const GetAllProducts = () => {
  const { data, error, isLoading } = useSWR("getallproducts", () =>
    fetchAllProducts()
  );

  return {
    products: data,
    isLoading,
    isError: error,
  };
};

export const GetProductsById = (id: string | undefined) => {
  const { data, error, isLoading } = useSWR(id, (id) =>
    fetchProductById(id)
  );

  return {
    products: data,
    isLoading,
    isError: error,
  };
}
