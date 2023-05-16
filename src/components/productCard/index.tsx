import { ProductTypes } from "../../types/products";

import { Center, Card, Image, Stack, Text, LinkBox } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProductsCard = ({ _id, product_img, name, price }: ProductTypes) => {
  const navigate = useNavigate();

  const handleOnClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Card
      as={LinkBox}
      key={_id}
      onClick={() => handleOnClick(_id)}
      _hover={{
        cursor: "pointer",
        shadow: "xl",
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
        <Text as="h1" fontSize="xl" fontWeight="semibold">
          {name}
        </Text>
        <Text as="p">
          by{" "}
          <Text as="span" color="green">
            YukJahit
          </Text>
        </Text>
        <Text as="p" fontSize="xl" fontWeight="bold">
          Rp. {price}
        </Text>
      </Stack>
    </Card>
  );
};

export default ProductsCard;
