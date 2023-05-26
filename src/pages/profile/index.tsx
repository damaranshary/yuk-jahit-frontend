import { GetUser } from "../../lib/swr";
import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../../components/editProfileModal";

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
    <Container maxW="4xl" minH="70vh">
      <Text as="h2" fontSize="2xl" fontWeight="bold" my={5}>
        Profil Saya
      </Text>
      <Flex flexDirection={{ base: "column", md: "row" }} gap={10} maxW="4xl">
        <Image
          src="/avatar-profile.jpg"
          width="200px"
          height="200px"
          alt="avatar"
          borderRadius="full"
        />
        <VStack alignItems="start" maxW="4xl" gap={3}>
          {" "}
          <Text as="h3" fontSize="larger" fontWeight="bold">
            {user?.name}
          </Text>
          <Box>
            <Text fontWeight="semibold">Email: </Text>
            <Text>{user?.email}</Text>
          </Box>
          <Box>
            <Text fontWeight="semibold">Nomor HP:</Text>
            <Text> {user?.phone}</Text>
          </Box>
          <Box>
            <Text fontWeight="semibold">Alamat:</Text>
            <Text>{user?.address}</Text>
          </Box>
          {user && token && (
            <EditProfileModal
              token={token}
              name={user.name}
              phone={user.phone}
              address={user.address}
            />
          )}
        </VStack>
      </Flex>
    </Container>
  );
};

export default Profile;
