import axios from "axios";
import {
  CancelOrderResponseTypes,
  CancelOrderTypes,
  CheckoutOrderTypes,
  OrderResponse,
  ResponseCheckoutOrderTypes,
} from "../types/order"; // you can see the response body in types/order.ts

export const fetchOrderData = async (token: string): Promise<OrderResponse> => {
  // api call for getting order data
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/order/user`, { headers: header })
    .catch((err) => err);
  return data.data;
};

export const checkoutOrderFromCart = async ({
  // api call for checking out order from cart
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
        notes, // the api needs notes and paymentMethod, so we just put it like this
        paymentMethod, // as of now, the payment method is only accepting gopay
      },
      {
        headers: header,
      }
    )
    .catch((err) => err);

  return data.data;
};

export const cancelOrder = async ({
  // api call for cancelling an order
  token,
  orderId, // you need to login and pass the orderId to cancel the order
}: CancelOrderTypes): Promise<CancelOrderResponseTypes> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };

  const data = await axios
    .post(
      `${import.meta.env.VITE_API_URL}/order/cancel/${orderId}`,
      {}, // since the api doesn't need any body, we just put an empty object
      {
        headers: header,
      }
    )
    .catch((err) => err);

  return data.data;
};
