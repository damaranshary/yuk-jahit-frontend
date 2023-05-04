import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { addProductToCart } from "../../api-call/products";
import { GetProductsById } from "../../lib/swr";

import { ChangeEvent, useState } from "react";

import { Link as RouterLink, useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, products } = GetProductsById(id);
  const { _id, product_img, name, description, price, sizes } =
    products?.data || {};
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (token !== null && products) {
      await addProductToCart({ productId: products.data._id, quantity, token })
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

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!Number.isNaN(newValue)) {
      setQuantity(newValue);
    }
  };

  if (!products) return <p>Product not found</p>;
  if (isLoading) return <p>Loading...</p>;

  //create a page for showing product page in details

  return (
    <Container maxW="4xl" mt={5}>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/products">
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={RouterLink} to={`/products/${_id}`}>
            {name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex flexDirection={{ base: "column", md: "row" }} gap={10} mt={8}>
        <Image
          src={product_img}
          alt={name}
          maxW="300px"
          loading="lazy"
          borderRadius={10}
          mx={{ base: "auto", md: "50px" }}
        />
        <Box
          as={Flex}
          flexDirection="column"
          maxW={{ base: "full", md: "300px" }}
        >
          <Text as="h2" fontSize="2xl" fontWeight="bold">
            {name}
          </Text>
          <Divider mb={5} />
          <Text as="p" fontSize={{ base: "sm", md: "md" }}>
            {description}
          </Text>
          <Spacer />
          <Text as="p" fontSize="2xl" fontWeight="semibold" mb={1}>
            Rp. {price}
          </Text>
          <Text>Ukuran: </Text>

          <RadioGroup onChange={setSize} value={size}>
            <Stack direction="row">
              {sizes && sizes.map((size) => <Radio value={size}>{size}</Radio>)}
            </Stack>
          </RadioGroup>
          <Center justifyContent="normal">
            <Text>Jumlah:</Text>
            <InputGroup maxW="150px" m={5}>
              <InputLeftAddon
                children="-"
                as="button"
                onClick={handleDecrement}
              />
              <Input
                type="number"
                name="quantity"
                textAlign="center"
                value={quantity}
                onChange={handleOnChange}
              />
              <InputRightAddon
                children="+"
                as="button"
                onClick={handleIncrement}
              />
            </InputGroup>
          </Center>
          <Button
            colorScheme="green"
            maxW={{ base: "full", md: "md" }}
            onClick={handleAddToCart}
            mb={5}
          >
            Add to Cart
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default Product;
