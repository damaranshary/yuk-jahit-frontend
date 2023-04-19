"use client";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";

import { fetchLoginData } from "../../api-call/users";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  // const router = useRouter();
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
        // router.push("/");\
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
    <form onSubmit={handleOnSubmit}>
      <VStack w={{ base: "sm", md: "lg", lg: "2xl" }} gap={5}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
          />
          <FormHelperText>We will never share your email.</FormHelperText>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
          />
          <Button
            type="submit"
            w={{ base: "full", md: "200px" }}
            p={6}
            colorScheme="whatsapp"
            bg="success"
            borderRadius="30px"
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </FormControl>
      </VStack>
    </form>
  );
};

export default Login;
