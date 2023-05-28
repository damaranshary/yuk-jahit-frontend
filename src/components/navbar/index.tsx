import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  Link,
  InputGroup,
  InputLeftElement,
  Text,
  ButtonGroup,
  Button,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";

import { ChangeEvent, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [login, setLogin] = useState(false); // if login is true, show logout button
  const [searchValue, setSearchValue] = useState("");
  const token = localStorage.getItem("token");

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
    if (searchValue === "") {
      navigate("/products");
    } else {
      navigate("/search?q=" + searchValue);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/");
  };

  return (
    <Flex
      flexDirection="row"
      gap="4"
      alignItems="center"
      shadow="lg"
      boxShadow="base"
      p={4}
      mb={10}
      top={0}
      position="sticky"
      zIndex="sticky"
      bg="white"
    >
      <Link as={RouterLink} to="/" mr="4">
        <Text as="h1" fontSize="2xl" fontWeight="bold" color="green.500">
          Yuk
          <Text as="span">
            Jahit
          </Text>
        </Text>
      </Link>
      <Box flex="1">
        <form onSubmit={handleOnSubmit}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon />
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
          <Button as={RouterLink} variant="ghost" to="/login">
            Masuk
          </Button>
          <Button as={RouterLink} colorScheme="green" to="/register">
            Daftar
          </Button>
        </ButtonGroup>
      ) : (
        // if login is true
        <ButtonGroup>
          <Button as={RouterLink} to="/cart" variant="ghost" leftIcon={<FaShoppingCart />}>Keranjang</Button>
          <Menu>
            <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
              Akun
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">
                Profil
              </MenuItem>
              <MenuItem as={RouterLink} to="/order">
                Pembelian
              </MenuItem>
              <MenuDivider />
              <MenuItem as={Button} onClick={handleLogout}>
                Keluar
              </MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      )}
    </Flex>
  );
};

export default Navbar;
