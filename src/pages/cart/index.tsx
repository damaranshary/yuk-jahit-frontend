import Cookies from "universal-cookie";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Spacer,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { FormEvent, useEffect, useState } from "react";

import { deleteProductFromCart, fetchCartData } from "../../api-call/cart";
import { checkoutOrderFromCart } from "../../api-call/order";
import { ResponseCart } from "../../types/cart";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import CartCard from "../../components/cartCard";
import AlertDialogCartCard from "../../components/alertDialogCartCard";

const Cart = () => {
  const [cart, setCart] = useState<ResponseCart | null>(null);
  const [notes, setNotes] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const cookies = new Cookies();
  const toast = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // this is the function to get the cart data overtime the cart state changes
    const handleGetCartData = async () => {
      if (cart === null && token)
        await fetchCartData(token).then((res) => {
          setCart(res);
        });
    };
    handleGetCartData();
  }, [token, cart]);

  useEffect(() => {
    // this is the function to check if the user is logged in or not
    if (!token) {
      setCart(null);
      toast({
        description: "Silahkan login terlebih dahulu",
        status: "warning",
        isClosable: true,
        duration: 1500,
      });
      navigate("/login");
    }
  }, [token, cart]);

  const handleDeleteCart = async (id: string) => {
    // this is the function to delete the cart
    token &&
      deleteProductFromCart(token, id).then((res) => {
        setCart(res);
      });
  };

  const handleCheckout = async (e: FormEvent) => {
    // this is the function to checkout the cart
    e.preventDefault();
    setIsSubmitting(true);
    if (token && notes !== undefined) {
      await checkoutOrderFromCart({
        token: token,
        notes: notes,
        paymentMethod: "gopay",
      })
        .then((res) => {
          cookies.set(`transactionOfOrder${res.order_id}`, res, {
            expires: new Date(Date.now() + 1000 * 60 * 15), // this is the expiration time of the cookies data (15 minutes) for payment details
          });
          navigate(`/checkout?id=${res.order_id}`); // this is the function to navigate to the checkout page
        })
        .catch(() => {});
    } else {
      setIsSubmitting(false);
      toast({
        id: "notes-error",
        description: "Alamat pengiriman tidak boleh kosong",
        status: "warning",
        isClosable: true,
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  if (cart) {
    // this will be rendered if the cart is not empty
    return (
      <Container maxW="6xl">
        <Helmet>
          <title>Keranjang | YukJahit</title>
        </Helmet>
        <Text as="h2" fontSize="2xl" fontWeight="bold" mt={5} mb={2}>
          Keranjang
        </Text>
        <VStack gap={2}>
          {cart.products.map((item, index) => (
            <CartCard
              index={index}
              key={item._id}
              product={item}
              handleDeleteCart={handleDeleteCart}
            />
          ))}
        </VStack>
        <Box
          id="cart-summary"
          as={Flex}
          flexDirection="column"
          boxShadow="xl"
          maxH="4xl"
          my={10}
          borderRadius={10}
          p={5}
          borderColor="black"
        >
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <VStack alignItems="start" gap={0}>
              <Text as="h2" fontWeight="bold" fontSize="lg" mb={2}>
                Ringkasan belanja
              </Text>

              <Text as="p" fontSize="sm">
                Total Harga ({cart.products.length} Produk):{" "}
                <Text as="span" fontWeight="semibold">
                  {" "}
                  Rp {cart.bill.toLocaleString("id-ID")}
                </Text>
              </Text>
              <FormControl isRequired>
                <FormLabel fontSize="sm">
                  Catatan (Ukuran, Jahitan, etc.):{" "}
                </FormLabel>
                <Textarea
                  id="notes-textarea"
                  value={notes}
                  onChange={handleOnChange}
                  required
                ></Textarea>
                <FormHelperText fontSize="sm">*wajib diisi</FormHelperText>
              </FormControl>
            </VStack>
            <Spacer />
            <AlertDialogCartCard
              isSubmitting={isSubmitting}
              notes={notes}
              handleCheckout={handleCheckout}
            />
          </Flex>
        </Box>
      </Container>
    );
  }

  return (
    // this will be rendered if the cart is empty
    <Container maxW="6xl">
      <Text as="h2" fontSize="2xl" fontWeight="bold" mt={5} mb={2}>
        Keranjang
      </Text>
      <Center>
        <Box maxW="sm">
          <Image src="empty-cart.jpg" />
          <Center as={VStack}>
            <Text fontWeight="semibold">Keranjangmu kosong</Text>
            <Text mb={5}>Yuk, isi dengan barang-barang impianmu</Text>
            <Button as={RouterLink} colorScheme="green" to="/products">
              Mulai Belanja
            </Button>
          </Center>
        </Box>
      </Center>
    </Container>
  );
};

export default Cart;
