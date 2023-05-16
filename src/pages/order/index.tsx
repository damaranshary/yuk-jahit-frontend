import { Container, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OrderCard from "../../components/orderCard";
import { fetchOrderData } from "../../api-call/order";
import { OrderResponse } from "../../types/order";

const Order = () => {
  const [orderData, setOrderData] = useState<OrderResponse | undefined>(
    undefined
  );

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleGetOrderData = async () => {
      if (orderData === undefined && token) {
        await fetchOrderData(token).then((res) => {
          setOrderData(res);
        });
      }
    };
    handleGetOrderData();
  }, [orderData, token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setOrderData(undefined);
    }
  }, [token, orderData]);

  return (
    <Container maxW="4xl">
      <Text as="h2" fontSize="2xl" fontWeight="bold" my={5}>
        Daftar Transaksi
      </Text>
      {orderData &&
        orderData.orders.map((item) => {
          return <OrderCard {...item} key={item._id} />;
        })}
    </Container>
  );
};

export default Order;
