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
  Link,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { fetchLoginData } from "../../api-call/users";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { error } from "console";

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
      .then(
        (res) => {
          toast({
            description: "Login Berhasil",
            status: "success",
            isClosable: true,
          });
          setIsSubmitting(true);
          localStorage.setItem("token", res.token);
          navigate("/");
        }
      )
      .catch((err) => {
        toast({
          title: "Login Gagal",
          description: "Email atau Password salah",
          status: "error",
          isClosable: true,
        });
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container maxW="xl" centerContent my={5}>
      <VStack
        as="form"
        w={{ base: "full", md: "full", lg: "xl" }}
        onSubmit={handleOnSubmit}
      >
        <Text as="h1" fontSize="4xl" fontWeight="extrabold">
          Yuk
          <Text as="span" color="green">
            Jahit
          </Text>
        </Text>
        <Center as={VStack}>
          <Text as="h2" fontSize="4xl" fontWeight="bold" mx="auto">
            Masuk
          </Text>
        </Center>
        <FormControl>
          <FormLabel mt={3}>Alamat Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel mt={3}>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
          />
        </FormControl>
        <Center p={6} mt={2} as={VStack} gap={3}>
          <Text>
            Belum punya akun? silahkan{" "}
            <Link as={RouterLink} to="/register" color="green">
              daftar{" "}
            </Link>
            disini
          </Text>
          <Button
            type="submit"
            w={{ base: "full", md: "200px" }}
            colorScheme="green"
            borderRadius="30px"
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Masuk
          </Button>
        </Center>
      </VStack>
    </Container>
  );
};

export default Login;
