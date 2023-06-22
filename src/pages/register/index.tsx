import {
  Button,
  Center,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Text,
  useToast,
  VStack,
  Container,
  Alert,
  AlertIcon,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchRegisterData } from "../../api-call/users";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const { name, email, password, confirmPassword, phone, address } =
    registerData;
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      toast({
        title: "Kamu sudah login",
        description: "Silahkan logout terlebih dahulu",
        status: "warning",
        isClosable: true,
      });
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (confirmPassword === password) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [password, confirmPassword]);

  const handleOnChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    !passwordError &&
      (await fetchRegisterData({ name, email, password, phone, address })
        .then((res) => {
          if (res !== undefined) {
            setRegisterData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone: "",
              address: "",
            });
            toast({
              description: "Registrasi Berhasil",
              status: "success",
              isClosable: true,
            });
            setIsSubmitting(true);
            navigate("/login");
          } else {
            setRegisterData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone: "",
              address: "",
            });
            toast({
              description: "Registrasi Gagal",
              status: "error",
              isClosable: true,
            });
          }
        })
        .catch((err) =>
          toast({
            title: err.message,
            description: err.msg,
            status: "error",
            isClosable: true,
          })
        )
        .finally(() => {
          setIsSubmitting(false);
        }));
  };

  return (
    <Container maxW="xl" my={5} centerContent>
      <Text as="h1" fontSize="4xl" fontWeight="extrabold">
        Yuk
        <Text as="span" color="green">
          Jahit
        </Text>
      </Text>
      <Center>
        <Text as="h2" fontSize="4xl" fontWeight="bold" mx="auto">
          Daftar
        </Text>
      </Center>
      <Flex
        as="form"
        flexDirection="column"
        w={{ base: "sm", md: "lg", lg: "xl" }}
        onSubmit={handleOnSubmit}
        mt={3}
        gap={2}
        alignItems="center"
      >
        <FormControl isRequired>
          <FormLabel>Nama</FormLabel>
          <Input
            id="register-name-input"
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Alamat Email</FormLabel>
          <Input
            id="register-email-input"
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
          />
          <FormHelperText>We will never share your email.</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            id="register-password-input"
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            minLength={8}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Konfirmasi Password</FormLabel>
          <Input
            id="register-confirm-password-input"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            minLength={8}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Nomor HP</FormLabel>
          <Input
            id="register-phone-input"
            type="number"
            name="phone"
            value={phone}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Alamat Lengkap</FormLabel>
          <Textarea
            id="register-address-input"
            name="address"
            value={address}
            onChange={handleOnChange}
          />
        </FormControl>

        {passwordError && (
          <Alert id="alert-password-not-match" status="error" borderRadius={10}>
            <AlertIcon />
            Password tidak sama
          </Alert>
        )}
        <Button
          id="register-submit-button"
          type="submit"
          w={{ base: "full", md: "200px" }}
          mt={5}
          colorScheme="green"
          borderRadius="30px"
          isLoading={isSubmitting}
          loadingText="Submitting"
        >
          Daftar
        </Button>
      </Flex>
    </Container>
  );
};

export default Register;
