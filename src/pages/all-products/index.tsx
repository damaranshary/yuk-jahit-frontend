"use client";

import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

// import Link from "next/link";

import ProductsList from "../../components/Product";

import { GetAllProducts } from "../../lib/swr";

const AllProducts = () => {
  const { products, isError } = GetAllProducts();

  return (
    <Container maxW="4xl" mx="auto" centerContent>
      <h1>Product</h1>
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
          <BreadcrumbLink href="/product">Products</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {products &&
        products.data.map((product) => {
          return (
            <li key={product._id}>
              <ProductsList {...product} />
            </li>
          );
        })}
    </Container>
  );
};

export default AllProducts;
