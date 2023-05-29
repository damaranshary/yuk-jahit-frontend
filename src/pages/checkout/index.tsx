import Cookies from "universal-cookie";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ResponseCheckoutOrderTypes } from "../../types/order";

const Checkout = () => {
  const [searchParams] = useSearchParams(); // this is the hook to get the query params
  const id = searchParams?.get("id"); // this is the query params
  const cookies = new Cookies(); // this is the cookies
  const transactionDetail: ResponseCheckoutOrderTypes = cookies.get(
    `transactionOfOrder${id}` // this is the transaction detail data
  );

  const [transactionStatus, setTransactionData] = useState<string | undefined>(
    transactionDetail?.transaction_status
  );

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
      .concat(" WIB"); // this is the format of the date that will be shown "DD Month YYYY | HH:MM WIB"
  };

  const expiryTime = getDate(transactionDetail?.expiry_time);

  const handlePaymentLink = () => {
    // this is the function to handle the payment link
    cookies.remove(`transactionOfOrder${id}`); // the cookies of transaction data will be removed after clicking the link
    setTransactionData("success");
  };

  if (transactionStatus === "success") {
    // you will be redirected to this page after you finish the payment
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
    // the sites will show you this after checkout and you haven't paid yet
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
