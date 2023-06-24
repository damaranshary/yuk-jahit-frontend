import Cookies from "universal-cookie";
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

import { OrderDataTypes } from "../../types/order";
import { cancelOrder } from "../../api-call/order";

import DetailOrderModal from "../detailOrderModal";
import AlertDialogCancelOrder from "../alertDialogCancelOrder";

const OrderCard = (props: OrderDataTypes) => {
  // this component is used for showing the order details in the order history page
  const token = localStorage.getItem("token");
  const cookies = new Cookies();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const getDate = (something: string) => {
    // this is the function to get the date
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
      .concat(" WIB"); // this is the format of the date that will be shown "DD Month YYYY | HH:MM WIB"
  };

  const { updatedAt, _id, products, status, bill, index } = props; // destructuring the props

  const toast = useToast();

  const dateUpdated = getDate(updatedAt); // this is the date that will be shown

  const handleCancelOrder = async (e: FormEvent) => {
    // this is the function to cancel the order
    e.preventDefault(); // prevent the default behavior of the form
    setIsSubmitting(true); // set the loading button to true
    token &&
      (await cancelOrder({ token, orderId: _id })
        .then((res) => {
          const message = "Pesanan " + res.order_id + " dibatalkan";
          toast({
            id: "cancel-order-success",
            title: message,
            description: "Status akan diupdate dalam beberapa saat",
            status: "success",
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            id: "cancel-order-failed",
            title: "Gagal membatalkan pesanan",
            description: err.message,
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
          cookies.remove(`transactionOfOrder${_id}`); // remove the cookies after canceling the order
        }));
  };

  return (
    <Container
      as={Card}
      maxW="6xl"
      key={_id}
      shadow="md"
      p={5}
      my={5}
      id={`order-card-${index + 1}`}
    >
      <Flex gap={3} maxW="6xl" mt={2} alignItems="center">
        <Text as="h3" fontWeight="semibold">
          Belanja
        </Text>
        <Spacer />
        {status === "settlement" && (
          <Text
            id="order-status"
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
            id="order-status"
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
            id="order-status"
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
            id="order-status"
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
        {/* Showing the first image of the products in the order */}
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

        {/* Showing the details of the products in the order with modal */}
        <DetailOrderModal {...props} />

        {/* Showing the cancel button if the status is pending */}
        <AlertDialogCancelOrder
          index={props.index}
          status={status}
          handleCancelOrder={handleCancelOrder}
          isSubmitting={isSubmitting}
        />
      </Flex>
    </Container>
  );
};

export default OrderCard;
