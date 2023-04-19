"use client";

import { addProductToCart } from "../api-call/products";
import {
  AddProductToCartTypes,
  ProductTypes,
  ResponseProducts,
} from "../types/products";
import { useState } from "react";
import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProductsList = ({
  _id,
  product_img,
  name,
  description,
  price,
}: ProductTypes) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      await addProductToCart({ productId: _id, quantity, token })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Please login first");
    }
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Box as={Flex} gap="10" p="5" mt="5" key={_id}>
      {product_img && (
        <Image src={product_img} alt={name} w="200px" h="200px" />
      )}
      <Stack direction="column" gap="5" maxW="lg">
        <Text as="h1" fontSize="xl" fontWeight="bold">
          {name}
        </Text>
        <Text as="p">{description}</Text>
        <Text as="p" fontSize="xl" fontWeight="bold">
          Rp. {price}
        </Text>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        <Button onClick={() => handleIncrement(_id)}>+</Button>
      </Stack>
    </Box>
  );
};

export default ProductsList;
