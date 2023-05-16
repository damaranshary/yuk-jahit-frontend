import axios from "axios";
import {
  CheckoutOrderTypes,
  OrderResponse,
  ResponseCheckoutOrderTypes,
} from "../types/order";

export const fetchOrderData = async (token: string): Promise<OrderResponse> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/order/user`, { headers: header })
    .catch((err) => err);
  return data.data;
};

export const checkoutOrderFromCart = async ({
  token,
  address,
  paymentMethod,
}: CheckoutOrderTypes): Promise<ResponseCheckoutOrderTypes> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };

  const data = await axios
    .post(
      `${import.meta.env.VITE_API_URL}/order/checkout`,
      {
        address,
        paymentMethod,
      },
      {
        headers: header,
      }
    )
    .catch((err) => err);

  return data.data;
};
