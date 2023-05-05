import { Container, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OrderCard from "../../components/orderCard";
import { fetchOrderData } from "../../api-call/order";
import { OrderDataTypes } from "../../types/order";
import { GetOrder } from "../../lib/swr";

const Order = () => {
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  const { order, isLoading } = GetOrder(token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/login");
    }
  }, [token]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container maxW="4xl">
      <Text as="h2" fontSize="2xl" fontWeight="bold" my={5}>
        Daftar Transaksi
      </Text>
      {order &&
        order.orders.map((item) => {
          return <OrderCard {...item} key={item._id} />;
        })}
    </Container>
  );
};

export default Order;
