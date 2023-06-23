import {
  Center,
  Image,
  Text,
  Button,
  Container,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { GetProductsByCategory } from "../../lib/swr";
import ProductsCard from "../../components/productCard";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { products } = GetProductsByCategory("Baru");

  return (
    <Container maxW="7xl" centerContent>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | YukJahit</title>
      </Helmet>
      <Box>
        <Image src="carousel-asset.jpg" rounded={10} />
        <Text fontWeight="bold" fontSize="xl" mt={8} mb={4}>
          Produk Terbaru
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing="16px">
          {products &&
            products.data.map((product) => {
              return <ProductsCard {...product} key={product._id} />;
            })}
        </SimpleGrid>
        <Center>
          <Button
            id="see-all-products-button"
            as={RouterLink}
            variant="outline"
            colorScheme="green"
            rounded={10}
            to="/products"
            mt={8}
          >
            Lihat semua
          </Button>
        </Center>
      </Box>
    </Container>
  );
};

export default Home;
