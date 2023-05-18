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

const Home = () => {
  const { products } = GetProductsByCategory("Baru");

  return (
    <Container maxW="4xl" centerContent>
      <Image src="carousel-asset.jpg" rounded={10} my={5} />
      <Box>
        <Text fontWeight="semibold" fontSize="2xl" my={5}>
          Produk Terbaru
        </Text>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing="15px" my={8}>
          {products &&
            products.data.map((product) => {
              return <ProductsCard {...product} key={product._id} />;
            })}
        </SimpleGrid>
        <Center>
          <Button
            as={RouterLink}
            variant="outline"
            colorScheme="green"
            rounded={10}
            to="/products"
          >
            Lihat semua
          </Button>
        </Center>
      </Box>
    </Container>
  );
};

export default Home;
