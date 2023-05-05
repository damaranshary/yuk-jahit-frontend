import { GetUser } from "../../lib/swr";
import { Button, Container, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchOrderData } from "../../api-call/order";
import { OrderDataTypes } from "../../types/order";
import OrderCard from "../../components/orderCard";

const Profile = () => {
  const [token, setToken] = useState<string | null>(null);

  const { user, isLoading } = GetUser(token);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/login");
    }
  }, [token]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container maxW="4xl">
      <Text as="h2" fontSize="2xl" fontWeight="bold" my={5}>
        Profile
      </Text>
      <Flex flexDirection={{ base: "column", md: "row" }} gap={10} maxW="4xl">
        <Image
          src="/avatar-profile.jpg"
          width="200px"
          height="200px"
          alt="avatar"
          borderRadius="full"
        />
        <VStack alignItems="start" maxW="4xl">
          {" "}
          <Text as="h3" fontSize="lg" fontWeight="semibold">
            {user?.name}
          </Text>
          <Text>Email: {user?.email}</Text>
          <Text>Nomor HP: {user?.phone}</Text>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Profile;
