import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Container,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import { Link as RouterLink, useSearchParams } from "react-router-dom";

import ProductCard from "../../components/productCard";
import { GetProductsByQuery } from "../../lib/swr";
import { Helmet } from "react-helmet-async";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams?.get("q");
  const { products } = GetProductsByQuery(query);

  return (
    <Container maxW="6xl" minH="70vh">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Pencarian produk "${query}"`} | YukJahit</title>
      </Helmet>
      <Text as="h2" fontSize="2xl" fontWeight="bold" mt={5} mb={1}>
        {`Pencarian produk "${query}"`}
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
          <BreadcrumbLink to={`/search?q=${query}`} as={RouterLink}>
            Pencarian
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {products && products.data.length > 0 ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing="30px" my={8}>
          {products &&
            products.data.map((product) => {
              return <ProductCard {...product} key={product._id} />;
            })}
        </SimpleGrid>
      ) : (
        <Center>
          <Box maxW="sm">
            <Image src="products-not-found.png" />
            <Center>
              <Text fontWeight="semibold">Produk tidak ditemukan</Text>
            </Center>
          </Box>
        </Center>
      )}
    </Container>
  );
};

export default Search;
