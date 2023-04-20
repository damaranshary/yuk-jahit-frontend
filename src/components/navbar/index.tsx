import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  Link,
  InputGroup,
  InputLeftElement,
  Text,
  ButtonGroup,
  Button,
  Spacer,
  Box,
} from "@chakra-ui/react";

import { ChangeEvent, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [login, setLogin] = useState(false); // if login is true, show logout button
  const [searchValue, setSearchValue] = useState("");
  const token = localStorage.getItem("token");

  // const router = useRouter();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLogin(true);
    }
  }, [login, token]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/search?q=" + searchValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin(false);
  };

  return (
    <Flex
      flexDirection="row"
      gap="4"
      alignItems="center"
      shadow="lg"
      boxShadow="base"
      p={4}
    >
      <Link as={Link} href="/" mr="4">
        <Text  as="h1" fontSize="4xl" fontWeight="extrabold">
          Yuk<Text as="span" color="green">Jahit</Text>
        </Text>
      </Link>
      <Box flex="1">
        <form onSubmit={handleOnSubmit}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon />{" "}
            </InputLeftElement>
            <Input
              placeholder="Cari sesuatu disini..."
              variant="outline"
              value={searchValue}
              onChange={handleOnChange}
            />
          </InputGroup>
        </form>
      </Box>
      {!login ? ( // if login is false
        <ButtonGroup>
          <Button>
            <Link as={RouterLink} to="/login">
              Login{" "}
            </Link>
          </Button>
          <Button colorScheme="blue">
            <Link as={RouterLink} to="/register">
              Register{" "}
            </Link>
          </Button>
        </ButtonGroup>
      ) : (
        // if login is true
        <ButtonGroup>
          <Link as={RouterLink} to="/cart">
            <Button> Cart</Button>
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
          <Link as={RouterLink} to="/profile">
            <Button>Profile</Button>
          </Link>
        </ButtonGroup>
      )}
    </Flex>
  );
};

export default Navbar;
