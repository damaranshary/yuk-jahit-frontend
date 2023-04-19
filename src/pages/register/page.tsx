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
import { fetchRegisterData } from "../../api-call/users";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitted] = useState(false);

  const toast = useToast();

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
      });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <VStack w={{ base: "sm", md: "lg", lg: "2xl" }} gap={5}>
        <FormControl>
          <FormLabel>Nama</FormLabel>
          <Input
            type="text"
            name="name"
            value={registerData.name}
            onChange={handleOnChange}
          />
          <FormLabel>Alamat Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleOnChange}
          />
          <FormHelperText>We will never share your email.</FormHelperText>
          <FormLabel>Nomor HP</FormLabel>
          <Input
            type="number"
            name="phone"
            value={registerData.phone}
            onChange={handleOnChange}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={registerData.password}
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

export default Register;
