import { ProductTypes } from "../../types/products";

import { Center, Image, Text, LinkBox, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const ProductsCard = ({ _id, product_img, name, price }: ProductTypes) => {
  // this component is used for showing the product details in the products page
  return (
    <LinkBox
      as={RouterLink}
      key={_id}
      to={`/products/${_id}`}
      _hover={{
        cursor: "pointer",
        shadow: "lg",
      }}
      shadow="md"
      boxShadow="base"
      p={6}
      maxW={{ base: "full", md: "md", lg: "lg" }}
      borderRadius={10}
    >
      <Center>
        <Image
          src={product_img}
          alt={name}
          borderRadius={10}
          objectFit={{ base: "cover", md: "contain", lg: "contain" }}
          loading="lazy"
          w={{ base: "200px", md: "150px", lg: "100px" }}
          h={{ base: "200px", md: "150px", lg: "100px" }}
        />
      </Center>
      <Flex
        flexDirection="column"
        maxW="lg"
        mt="4"
        fontSize={{ base: "lg", sm: "md", md: "sm" }}
      >
        <Text as="h1" fontWeight="semibold">
          {name}
        </Text>
        <Text as="p" fontSize="sm">
          by{" "}
          <Text as="span" color="green" fontSize="sm">
            YukJahit
          </Text>
        </Text>
        <Text as="p" fontWeight="semibold" mt={2}>
          Rp {price.toLocaleString("id-ID")}
        </Text>
      </Flex>
    </LinkBox>
  );
};

export default ProductsCard;
