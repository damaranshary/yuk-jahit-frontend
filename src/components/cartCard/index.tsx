import {
  Card,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CartCardTypes } from "../../types/cart";
import { FaTrash } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const CartCard = ({ index, product, handleDeleteCart }: CartCardTypes) => {
  // this component is used for showing the product details in the cart
  const { product_img, name, price, quantity, productId, _id } = product; // destructuring
  return (
    <Container
      as={Card}
      maxW="6xl"
      key={productId}
      _hover={{
        cursor: "pointer",
        shadow: "xl",
      }}
      p={5}
    >
      <Flex
        flexDirection={{ base: "column", sm: "row" }}
        alignContent={{ base: "start", sm: "center" }}
        alignItems={{ base: "start", sm: "center" }}
        gap={5}
      >
        <Center>
          <Image
            src={product_img}
            alt={name}
            maxW="200px"
            maxH="100px"
            loading="lazy"
            borderRadius={10}
          />
        </Center>
        <Flex
          flexDirection="column"
          alignItems="start"
          gap={0}
          fontSize={{ base: "lg", sm: "md", md: "sm" }}
          flex="1"
        >
          <Link
            id={`product-in-cart-link-${index + 1}`}
            as={RouterLink}
            fontSize="lg"
            fontWeight="semibold"
            to={`/products/${productId}`}
          >
            {name}
          </Link>
          <Text as="p" fontSize="sm">
            by Yuk
            <Text as="span" color="green">
              Jahit
            </Text>
          </Text>
          <Text fontWeight="bold" mt={2}>
            Rp {price.toLocaleString("id-ID")}
          </Text>
        </Flex>
        <HStack gap={2}>
          <VStack alignItems="start">
            <Text as="p">Jumlah: {quantity}</Text>
          </VStack>
          <IconButton
            id={`delete-cart-button-${index + 1}`}
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
