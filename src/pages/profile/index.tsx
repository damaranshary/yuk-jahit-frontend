"use client";

import { GetUser } from "../../lib/swr";
import { Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Profile = () => {
  const [token, setToken] = useState<string | null>(null);

  const { user, isLoading } = GetUser(token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container maxW="2xl">
      <Text as="h1">Profile</Text>
      <Text as="p">This is the profile page</Text>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.phone}</Text>
    </Container>
  );
};

export default Profile;