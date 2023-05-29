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

import { ResponseCart } from "../../types/cart";

import { FormEvent, useEffect, useState } from "react";

import { deleteProductFromCart, fetchCartData } from "../../api-call/cart";
import CartCard from "../../components/cartCard";
import { useNavigate } from "react-router";
import { checkoutOrderFromCart } from "../../api-call/order";
import { Link as RouterLink } from "react-router-dom";
import AlertDialogCartCard from "../../components/alertDialogCartCard";
import Cookies from "universal-cookie";

const Cart = () => {
  const [cart, setCart] = useState<ResponseCart | null>(null);
  const [notes, setNotes] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const cookies = new Cookies();
  const toast = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleGetCartData = async () => {
      if (cart === null && token)
        await fetchCartData(token).then((res) => {
          setCart(res);
        });
    };
    handleGetCartData();
  }, [token, cart]);

  useEffect(() => {
    if (!token) {
      setCart(null);
      navigate("/login");
      toast({
        description: "Silahkan login terlebih dahulu",
        status: "warning",
        isClosable: true,
      });
    }
  }, [token, cart]);

  const handleDeleteCart = async (id: string) => {
    token &&
      deleteProductFromCart(token, id).then((res) => {
        setCart(res);
      });
  };

  const handleCheckout = async (e: FormEvent) => {
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
            expires: new Date(Date.now() + 1000* 60 * 15),
          });
          navigate(`/checkout?id=${res.order_id}`);
        })
        .catch((err) => {
        });
    } else {
      setIsSubmitting(false);
      toast({
        description: "Alamat pengiriman tidak boleh kosong",
        status: "warning",
        isClosable: true,
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  return (
    <Container maxW="6xl">
      <Text as="h2" fontSize="2xl" fontWeight="bold" mt={5} mb={2}>
        Keranjang
      </Text>
      {cart ? (
        <VStack gap={2}>
          {cart.products.map((item) => (
            <CartCard
              key={item._id}
              product={item}
              handleDeleteCart={handleDeleteCart}
            />
          ))}
        </VStack>
      ) : (
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
      )}
      {cart && (
        <Box
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
      )}
    </Container>
  );
};

export default Cart;
