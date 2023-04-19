"use client";
import { Container, VStack } from "@chakra-ui/react";

import { ResponseCart } from "../../types/cart";

import { useEffect, useState } from "react";

import { deleteProductFromCart, fetchCartData } from "../../api-call/cart";

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
    <Container centerContent maxW="4xl">
      <h1>Cart</h1>
      <VStack>
        {cart ? (
          cart.products.map((item) => (
            <div key={item.productId}>
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <button onClick={() => handleDeleteCart(item.productId)}>
                delete
              </button>
            </div>
          ))
        ) : (
          <p>no products</p>
        )}
      </VStack>
    </Container>
  );
};

export default Cart;
