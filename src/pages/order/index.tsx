import { Center, Container, Text, useToast } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OrderCard from "../../components/orderCard";
import { fetchOrderData } from "../../api-call/order";
import { OrderResponse } from "../../types/order";
import { Helmet } from "react-helmet-async";

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
        duration: 1500,
      });
      navigate("/");
    }
    console.log(orderData);
  }, [token, orderData]);

  return (
    <Container maxW="6xl">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Daftar Transaksi | YukJahit</title>
      </Helmet>
      <Text as="h2" fontSize="2xl" fontWeight="bold" my={5}>
        Daftar Transaksi
      </Text>
      {orderData && orderData.orders.length > 0 ? (
        orderData.orders.map((item, index) => {
          return <OrderCard {...item} key={item._id} index={index} />;
        })
      ) : (
        <Center>
          <Text>Belum ada transaksi</Text>
        </Center>
      )}
    </Container>
  );
};

export default Order;
