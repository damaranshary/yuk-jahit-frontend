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
  const [isSubmitting, setIsSubmitted] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
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
    setIsSubmitted(true);
    !passwordError &&
      (await fetchRegisterData({ name, email, password, phone, address })
        .then(() => {
          toast({
            description: "Registrasi Berhasil",
            status: "success",
            isClosable: true,
          });
          setIsSubmitted(true);
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
          setIsSubmitted(false);
          navigate("/login");
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
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Alamat Email</FormLabel>
          <Input
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
            type="number"
            name="phone"
            value={phone}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Alamat Lengkap</FormLabel>
          <Textarea name="address" value={address} onChange={handleOnChange} />
        </FormControl>

        {passwordError && (
          <Alert status="error" borderRadius={10}>
            <AlertIcon />
            Password tidak sama
          </Alert>
        )}
        <Button
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
