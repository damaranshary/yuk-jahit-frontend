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
import { Link as RouterLink } from "react-router-dom";

import ProductCard from "../../components/productCard";

import { GetAllProducts } from "../../lib/swr";
import { Helmet } from "react-helmet-async";

const AllProducts = () => {
  const { products, isError } = GetAllProducts();

  return (
    <Container maxW="6xl" mx="auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Semua Produk | YukJahit</title>
      </Helmet>
      <Text as="h2" fontSize="2xl" fontWeight="bold" mt={5} mb={1}>
        Semua Produk{" "}
      </Text>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink to="/" as={RouterLink}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink to="/products" as={RouterLink}>
            Semua Produk
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing="30px" my={8}>
        {/* this is the grid layout to shows the product card */}
        {products &&
          products.data.map((product, index) => {
            return <ProductCard product={product} key={product._id} index={index}/>;
          })}
      </SimpleGrid>
    </Container>
  );
};

export default AllProducts;
