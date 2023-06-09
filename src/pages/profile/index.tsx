import { GetUser } from "../../lib/swr";
import {
  Box,
  Center,
  Container,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import EditProfileModal from "../../components/editProfileModal";
import { fetchUserData } from "../../api-call/users";
import { User } from "../../types/users";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    const getUserData = async () => {
      token &&
        (await fetchUserData(token)
          .then((res) => {
            setUser(res);
          })
          .catch((res) => {
            toast({
              description: res.message,
              status: "error",
              isClosable: true,
              duration: 1500,
            });
          }));
    };
    getUserData(); // this is the function to fetch user data
  }, [token, user]);

  useEffect(() => {
    if (!token) {
      toast({
        description: "Silahkan login terlebih dahulu",
        status: "warning",
        isClosable: true,
        duration: 1500,
      });
      navigate("/");
    }
  }, [token]);

  return (
    <Container maxW="6xl" minH="70vh">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profil | YukJahit</title>
      </Helmet>
      <Text as="h2" fontSize="2xl" fontWeight="bold" my={5}>
        Profil Saya
      </Text>
      <Center>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "center", md: "start" }}
          gap={10}
          maxW="4xl"
        >
          <Image
            src="/user-avatar.png"
            width="200px"
            height="200px"
            alt="avatar"
            borderRadius="full"
          />

          <Flex flexDirection="column" alignItems="start" maxW="lg" gap={3}>
            {" "}
            <Text id="user-name" as="h3" fontWeight="bold">
              {user?.name}
            </Text>
            <Box>
              <Text fontWeight="semibold">Email: </Text>
              <Text id="user-email">{user?.email}</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold">Nomor HP:</Text>
              <Text id="user-phone"> {user?.phone}</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold">Alamat:</Text>
              <Text id="user-address">{user?.address}</Text>
            </Box>
            {user && token && (
              <EditProfileModal
                token={token}
                name={user.name}
                phone={user.phone}
                address={user.address}
              />
            )}
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
};

export default Profile;
