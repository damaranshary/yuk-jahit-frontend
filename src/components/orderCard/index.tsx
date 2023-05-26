import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { OrderDataTypes } from "../../types/order";
import DetailOrderModal from "../detailOrderModal";

const OrderCard = (props: OrderDataTypes) => {
  const { updatedAt, _id, products, status, bill } = props;
  const getDate = (something: string) => {
    const date = new Date(something);
    return date
      .toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      .concat(" WIB");
  };
  const dateCreated = getDate(updatedAt);

  return (
    <Container as={Card} maxW="4xl" key={_id} shadow="md" p={5} my={5}>
      <Flex gap={3} maxW="4xl" mt={2} alignItems="center">
        <Text as="h3" fontWeight="semibold">
          Belanja
        </Text>
        <Spacer />
        {status === "settlement" && (
          <Text
            as="p"
            fontSize="sm"
            color="white"
            display="block"
            bgColor="green"
            px={2}
            py={1}
            borderRadius={5}
          >
            Selesai
          </Text>
        )}
        {status === "pending" && (
          <Text
            as="p"
            fontSize="sm"
            color="white"
            display="block"
            bgColor="yellow.400"
            px={2}
            py={1}
            borderRadius={5}
          >
            Belum dibayar
          </Text>
        )}
        {status === "expire" && (
          <Text
            as="p"
            fontSize="sm"
            color="white"
            display="block"
            bgColor="gray"
            px={2}
            py={1}
            borderRadius={5}
          >
            Kedaluwarsa
          </Text>
        )}
        {status === "cancel" && (
          <Text
            as="p"
            fontSize="sm"
            color="white"
            display="block"
            bgColor="red"
            px={2}
            py={1}
            borderRadius={5}
          >
            Dibatalkan
          </Text>
        )}
      </Flex>
      <Flex gap={3} maxW="4xl" mt={2} mb={4} alignItems="center">
        <Text as="p" fontSize="sm">
          {dateCreated}
        </Text>
        <Spacer />
        <Text as="p" fontSize="sm">
          {_id}
        </Text>
      </Flex>

      <Flex alignItems="center" justifyContent="space-between">
        <Image
          src={products[0].product_img}
          alt={products[0].name}
          maxW="100px"
          maxH="100px"
          loading="lazy"
          borderRadius={10}
          mx={5}
        />
        {products.length > 1 ? (
          <VStack>
            <Text as="h3" fontSize="md" fontWeight="semibold">
              {products[0].name} dan {products.length - 1} produk lainnya
            </Text>
          </VStack>
        ) : (
          <Text as="h3" fontSize="md" fontWeight="semibold">
            {products[0].name}
          </Text>
        )}
        <Spacer />
        <VStack>
          <Text>Total Belanja</Text>
          <Text fontWeight="bold">Rp. {bill}</Text>
        </VStack>
      </Flex>
      <DetailOrderModal {...props} />
    </Container>
  );
};

export default OrderCard;
