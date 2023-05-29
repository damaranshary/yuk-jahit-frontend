import axios from "axios";
import {
  CancelOrderResponseTypes,
  CancelOrderTypes,
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
  notes,
  paymentMethod,
}: CheckoutOrderTypes): Promise<ResponseCheckoutOrderTypes> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };

  const data = await axios
    .post(
      `${import.meta.env.VITE_API_URL}/order/checkout`,
      {
        notes,
        paymentMethod,
      },
      {
        headers: header,
      }
    )
    .catch((err) => err);

  return data.data;
};

export const cancelOrder = async ({
  token,
  orderId,
}: CancelOrderTypes): Promise<CancelOrderResponseTypes> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };

  const data = await axios
    .post(
      `${import.meta.env.VITE_API_URL}/order/cancel/${orderId}`,
      {},
      {
        headers: header,
      }
    )
    .catch((err) => err);

  return data.data;
};
