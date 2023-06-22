import { Container, Text, useToast } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OrderCard from "../../components/orderCard";
import { fetchOrderData } from "../../api-call/order";
import { OrderResponse } from "../../types/order";

const Order = () => {
  const [orderData, setOrderData] = useState<OrderResponse | undefined>(
    undefined
  );

  const toast = useToast();
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
      setOrderData(undefined);
      toast({
        description: "Silahkan login terlebih dahulu",
        status: "warning",
        isClosable: true,
        duration: 3000,
      });
      navigate("/");
    }
  }, [token, orderData]);

  return (
    <Container maxW="6xl">
      <Text as="h2" fontSize="2xl" fontWeight="bold" my={5}>
        Daftar Transaksi
      </Text>
      {orderData &&
        orderData.orders.map((item, index) => {
          return <OrderCard {...item} key={item._id} index={index} />;
        })}
    </Container>
  );
};

export default Order;
