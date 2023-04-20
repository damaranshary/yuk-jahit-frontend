"use client";

import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

// import Link from "next/link";

import ProductCard from "../../components/productCard";

import { GetAllProducts } from "../../lib/swr";

const AllProducts = () => {
  const { products, isError } = GetAllProducts();

  return (
    <Container maxW="4xl" mx="auto" centerContent>
      <Text as="h2" fontSize="4xl" fontWeight="bold" mt={5} mb={1}>
        Semua Produk{" "}
      </Text>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="30px" my={8}>
        {products &&
          products.data.map((product) => {
            return <ProductCard {...product} key={product._id} />;
          })}
      </SimpleGrid>
    </Container>
  );
};

export default AllProducts;
