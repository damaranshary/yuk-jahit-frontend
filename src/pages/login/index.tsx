"use client";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
  Container,
  Text,
  Center,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { fetchLoginData } from "../../api-call/users";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const toast = useToast();
  const navigate = useNavigate();

  const handleOnChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(loginData);
    setIsSubmitting(true);

    await fetchLoginData(loginData)
      .then((res) => {
        toast({
          description: "Login Berhasil",
          status: "success",
          isClosable: true,
        });
        setIsSubmitting(true);
        localStorage.setItem("token", res.token);
        navigate("/");
        console.log(res.token);
      })
      .catch((err) =>
        toast({
          title: err.msg,
          description: err.msg,
          status: "error",
          isClosable: true,
        })
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container
      as="form"
      maxW="xl"
      centerContent
      my={5}
      onSubmit={handleOnSubmit}
    >
      <VStack w={{ base: "full", md: "full", lg: "xl" }} gap={3}>
        <FormControl>
          <Center>
            <Text as="h2" fontSize="4xl" fontWeight="bold" mx="auto">
              Masuk
            </Text>
          </Center>
          <FormLabel mt={3}>Alamat Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
          />
          <FormLabel mt={3}>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
          />
          <Center p={6} mt={3}>
            <Button
              type="submit"
              w={{ base: "full", md: "200px" }}
              colorScheme="blue"
              borderRadius="30px"
              isLoading={isSubmitting}
              loadingText="Submitting"
            >
              Masuk
            </Button>
          </Center>
        </FormControl>
      </VStack>
    </Container>
  );
};

export default Login;
