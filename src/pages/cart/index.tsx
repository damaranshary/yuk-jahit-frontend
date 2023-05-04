"use client";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { ResponseCart } from "../../types/cart";

import { useEffect, useState } from "react";

import { deleteProductFromCart, fetchCartData } from "../../api-call/cart";
import CartCard from "../../components/cartCard";

const Cart = () => {
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState<ResponseCart | null>(null);

  const getToken = () => {
    const token = localStorage.getItem("token");
    setToken(token);
  };

  useEffect(() => {
    getToken();
    const handleGetCartData = async () => {
      if (cart === null && token)
        await fetchCartData(token).then((res) => {
          setCart(res);
          console.log(res);
        });
    };
    handleGetCartData();
  }, [token, cart]);

  const handleDeleteCart = async (id: string) => {
    token &&
      deleteProductFromCart(token, id).then((res) => {
        setCart(res);
        console.log(res);
      });
  };

  return (
    <Container maxW="4xl">
      <Text as="h2" fontSize="2xl" fontWeight="bold" mt={5} mb={2}>
        Keranjang
      </Text>
      {cart ? (
        <VStack gap={2}>
          {cart.products.map((item) => (
            <CartCard
              key={item._id}
              product={item}
              handleDeleteCart={handleDeleteCart}
            />
          ))}
        </VStack>
      ) : (
        <p>no products</p>
      )}
      {cart && (
        <Box
          as={Flex}
          flexDirection="column"
          boxShadow="xl"
          maxH="4xl"
          my={10}
          borderRadius={10}
          p={5}
          borderColor="black"
        >
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <VStack alignItems="start" gap={0}>
              <Text as="h2" fontWeight="bold" fontSize="xl" mb={2}>
                Ringkasan belanja
              </Text>

              <Text as="p">
                Total Harga ({cart.products.length} Produk):{" "}
                <Text as="span" fontWeight="semibold">
                  {" "}
                  Rp. {cart.bill}
                </Text>
              </Text>
            </VStack>
            <Spacer />
            <Button colorScheme="green" my="auto">
              Checkout
            </Button>
          </Flex>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
