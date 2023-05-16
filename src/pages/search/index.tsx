import ProductsList from "../../components/productCard";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { ChangeEvent } from "react";

import { GetProductsByQuery } from "../../lib/swr";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams?.get("q");
  const { products } = GetProductsByQuery(query);

  const navigate = useNavigate();

  const handleSearch = async () => {
    console.log(products);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/serach?q=" + query);
    query !== undefined && handleSearch();
  };

  return (
    <Container maxW="4xl">
      <Text as="h2" fontSize="2xl" fontWeight="bold" mt={5} mb={1}>
        Pencarian produk "{query}"
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
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="30px" my={8}>
          {products && products.data.length > 0 ? (
            products.data.map((product) => {
              return <ProductsList {...product} key={product._id} />;
            })
          ) : (
            <h1>no products</h1>
          )}
        </SimpleGrid>
      </form>
    </Container>
  );
};

export default Search;
