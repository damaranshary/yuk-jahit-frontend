import axios from "axios";
import { OrderResponse } from "../types/order";

export const fetchOrderData = async (token: string): Promise<OrderResponse> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/order/user`, { headers: header })
    .catch((err) => err);
  return data.data;
};
