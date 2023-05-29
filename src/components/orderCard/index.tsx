import {
  Box,
  Card,
  Container,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import Cookies from "universal-cookie";

import { OrderDataTypes } from "../../types/order";
import { cancelOrder } from "../../api-call/order";

import DetailOrderModal from "../detailOrderModal";
import AlertDialogCancelOrder from "../alertDialogCancelOrder";

const OrderCard = (props: OrderDataTypes) => {
  const token = localStorage.getItem("token");
  const cookies = new Cookies();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const getDate = (something: string) => {
    const date = new Date(something);
    return date
      .toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      .replace("pukul", "|")
      .replace(".", ":")
      .concat(" WIB");
  };

  const { updatedAt, _id, products, status, bill } = props;

  const toast = useToast();

  const dateUpdated = getDate(updatedAt);

  const handleCancelOrder = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    token &&
      (await cancelOrder({ token, orderId: _id })
        .then((res) => {
          const message = "Pesanan " + res.order_id + " dibatalkan";
          toast({
            title: message,
            description: "Status akan diupdate dalam beberapa saat",
            status: "success",
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "Gagal membatalkan pesanan",
            description: err.message,
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
          cookies.remove(`transactionOfOrder${_id}`);
        }));
  };

  return (
    <Container as={Card} maxW="6xl" key={_id} shadow="md" p={5} my={5} id={_id}>
      <Flex gap={3} maxW="6xl" mt={2} alignItems="center">
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
      <Flex gap={3} maxW="6xl" mt={2} mb={4} alignItems="center">
        <Text as="p" fontSize="sm">
          {dateUpdated}
        </Text>
        <Spacer />
        <Text as="p" fontSize="sm">
          {_id}
        </Text>
      </Flex>

      <Flex
        flexDirection={{ base: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
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
        <Box as={Flex} alignItems="center" flexDirection="column">
          <Text>Total Belanja</Text>
          <Text fontWeight="bold">Rp {bill.toLocaleString("id-ID")}</Text>
        </Box>
      </Flex>
      <Flex alignItems="end" gap={3}>
        <Spacer />
        <DetailOrderModal {...props} />
        <AlertDialogCancelOrder
          status={status}
          handleCancelOrder={handleCancelOrder}
          isSubmitting={isSubmitting}
        />
      </Flex>
    </Container>
  );
};

export default OrderCard;
