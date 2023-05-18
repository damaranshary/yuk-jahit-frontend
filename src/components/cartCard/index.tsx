import {
  Button,
  Card,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CartCardTypes } from "../../types/cart";
import { FaTrash } from "react-icons/fa";

const CartCard = ({ product, handleDeleteCart }: CartCardTypes) => {
  const { product_img, name, price, quantity, productId, _id } = product;
  return (
    <Container
      as={Card}
      maxW="4xl"
      key={productId}
      _hover={{
        cursor: "pointer",
        shadow: "xl",
      }}
      p={5}
    >
      <Flex
        flexDirection={{ base: "column", sm: "row" }}
        alignItems="center"
        gap={5}
      >
        <Image
          src={product_img}
          alt={name}
          maxW="200px"
          maxH="100px"
          loading="lazy"
          borderRadius={10}
        />
        <VStack alignItems="start" gap={0}>
          <Text as="h3" fontSize="lg" fontWeight="semibold">
            {name}
          </Text>
          <Text fontWeight="bold">Rp. {price}</Text>
          <Text as="p">
            by Yuk
            <Text as="span" color="green">
              Jahit
            </Text>
          </Text>
        </VStack>
        <Spacer />
        <HStack gap={2}>
          <VStack alignItems="start">
            <Text as="p">Jumlah: {quantity}</Text>
            {/* <Text as="p">Rp. <Text as="span" color="green">{quantity * price}</Text></Text> */}
          </VStack>
          <IconButton
            onClick={() => handleDeleteCart(productId)}
            borderRadius="full"
            aria-label="delete cart"
            colorScheme="red"
            icon={<FaTrash />}
          ></IconButton>
        </HStack>
      </Flex>
    </Container>
  );
};

export default CartCard;
