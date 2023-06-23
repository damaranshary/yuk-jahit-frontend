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
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { addProductToCart } from "../../api-call/products";
import { GetProductsById } from "../../lib/swr";

import { ChangeEvent, FormEvent, useState } from "react";

import { Link as RouterLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, products } = GetProductsById(id);
  const { _id, product_img, name, description, price } = products?.data || {};
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const token = localStorage.getItem("token");

  const handleAddToCart = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (token !== null && products) {
      await addProductToCart({ productId: products.data._id, quantity, token })
        .then((res) => {
          toast({
            duration: 500,
            id: "add-to-cart-success",
            description: `${res.products[0].name} x${quantity} berhasil ditambahkan ke keranjang`,
            status: "success",
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            duration: 500,
            id: "add-to-cart-error",
            description: err.message,
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      toast({
        duration: 1500,
        description: "Silahkan login terlebih dahulu",
        status: "warning",
        isClosable: true,
      });
      setIsSubmitting(false);
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

  if (!products)
    return (
      <Center>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Produk tidak ditemukan | YukJahit</title>
        </Helmet>
        Produk tidak ditemukan
      </Center>
    );
  if (isLoading) return <Center>Loading...</Center>;

  //create a page for showing product page in details

  return (
    <Container maxW="6xl" mt={5} minH="70vh">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{name} | YukJahit</title>
      </Helmet>
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

      <Flex
        as="form"
        flexDirection={{ base: "column", md: "row" }}
        gap={10}
        mt={8}
        onSubmit={handleAddToCart}
        alignItems="center"
      >
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
          maxW={{ base: "full", md: "2xl" }}
        >
          <Text as="h2" fontSize="xl" fontWeight="bold">
            {name}
          </Text>
          <Divider mb={3} />
          <Text as="p" fontSize={{ base: "sm", md: "md" }}>
            {description}
          </Text>
          <Text as="p" fontSize="lg" fontWeight="semibold" my={3}>
            Rp {price?.toLocaleString("id-ID")}
          </Text>
          <Center justifyContent="normal">
            <Text>Jumlah:</Text>
            <InputGroup maxW="150px" m={5}>
              <InputLeftAddon
                children="-"
                as="button"
                onClick={handleDecrement}
                type="button"
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
                type="button"
              />
            </InputGroup>
          </Center>
          <Button
            id="add-to-cart-button"
            isDisabled={quantity === 0}
            isLoading={isSubmitting}
            colorScheme="green"
            maxW={{ base: "full", md: "2xl" }}
            type="submit"
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
