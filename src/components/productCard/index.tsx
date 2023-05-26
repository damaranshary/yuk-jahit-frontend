import { ProductTypes } from "../../types/products";

import { Center, Image, Stack, Text, LinkBox } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const ProductsCard = ({ _id, product_img, name, price }: ProductTypes) => {
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
      <Stack direction="column" maxW="lg" mt="4">
        <Text as="h1" fontSize="md" fontWeight="semibold">
          {name}
        </Text>
        <Text as="p">
          by{" "}
          <Text as="span" color="green">
            YukJahit
          </Text>
        </Text>
        <Text as="p" fontSize="md" fontWeight="semibold">
          Rp. {price}
        </Text>
      </Stack>
    </LinkBox>
  );
};

export default ProductsCard;
