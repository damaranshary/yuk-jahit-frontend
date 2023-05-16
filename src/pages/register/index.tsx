"use client";
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
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchRegisterData } from "../../api-call/users";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitted] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

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
    console.log(registerData);
    setIsSubmitted(true);

    await fetchRegisterData(registerData)
      .then((res) => {
        toast({
          description: "Registrasi Berhasil",
          status: "success",
          isClosable: true,
        });
        setIsSubmitted(true);
        console.log(res.token);
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
      });
  };

  return (
    <Container
      as="form"
      maxW="xl"
      my={5}
      centerContent
      onSubmit={handleOnSubmit}
    >
      <VStack w={{ base: "sm", md: "lg", lg: "xl" }} gap={5}>
        <FormControl>
          <Center>
            <Text as="h2" fontSize="4xl" fontWeight="bold" mx="auto">
              Daftar
            </Text>
          </Center>
          <FormLabel>Nama</FormLabel>
          <Input
            type="text"
            name="name"
            value={registerData.name}
            onChange={handleOnChange}
          />
          <FormLabel mt={3}>Alamat Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleOnChange}
          />
          <FormHelperText>We will never share your email.</FormHelperText>
          <FormLabel mt={3}>Nomor HP</FormLabel>
          <Input
            type="number"
            name="phone"
            value={registerData.phone}
            onChange={handleOnChange}
          />
          <FormLabel mt={3}>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleOnChange}
          />
          <Center p={6} mt={5}>
            <Button
              type="submit"
              w={{ base: "full", md: "200px" }}
              colorScheme="blue"
              borderRadius="30px"
              isLoading={isSubmitting}
              loadingText="Submitting"
            >
              Daftar
            </Button>
          </Center>
        </FormControl>
      </VStack>
    </Container>
  );
};

export default Register;
