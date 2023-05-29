import Cookies from "universal-cookie";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Link,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ResponseCheckoutOrderTypes } from "../../types/order";

const Checkout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams?.get("id");
  const cookies = new Cookies();
  const transactionDetail: ResponseCheckoutOrderTypes = cookies.get(
    `transactionOfOrder${id}`
  );

  const [transactionStatus, setTransactionData] = useState<
    ResponseCheckoutOrderTypes | string
  >(transactionDetail);

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
      .replace("pukul", "")
      .replace(".", ":")
      .concat(" WIB");
  };

  const expiryTime = getDate(transactionDetail?.expiry_time);
  useEffect(() => {
    console.log(transactionDetail);
  }, []);

  const handlePaymentLink = () => {
    cookies.remove(`transactionOfOrder${id}`);
    setTransactionData("success");
  };

  if (transactionStatus === "success") {
    return (
      <Container maxW="2xl" centerContent my={5}>
        <Alert
          maxW="6xl"
          status="success"
          variant="top-accent"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          colorScheme="green"
          borderRadius={10}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="md">
            Transaksi Berhasil
          </AlertTitle>
          <AlertDescription>
            Terima kasih telah berbelanja di YukJahit!
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  if (
    transactionDetail &&
    transactionDetail?.transaction_status === "pending"
  ) {
    return (
      <Container maxW="2xl" centerContent my={5}>
        <Text as="h2" fontSize="xl" fontWeight="semibold">
          Selesaikan pembayaran sebelum
        </Text>
        <Text mb={5}>{expiryTime}</Text>
        <Alert
          status="loading"
          variant="top-accent"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          colorScheme="green"
          borderRadius={10}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="md">
            Silahkan akses link berikut
          </AlertTitle>
          <AlertDescription>
            <Link
              href={transactionDetail?.actions[1].url}
              isExternal
              target="_blank"
              onClick={handlePaymentLink}
            >
              {transactionDetail.actions[1].url}
            </Link>
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Text>Pembayaran tidak ditemukan</Text>
    </>
  );
};

export default Checkout;
