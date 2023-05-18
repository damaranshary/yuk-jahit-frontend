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
    navigate("/search?q=" + searchValue);
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
    >
      <Link as={RouterLink} to="/" mr="4">
        <Text as="h1" fontSize="4xl" fontWeight="extrabold">
          Yuk
          <Text as="span" color="green">
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
          <Button as={RouterLink} to="/login">
            Masuk
          </Button>
          <Button as={RouterLink} colorScheme="green" to="/register">
            Daftar
          </Button>
        </ButtonGroup>
      ) : (
        // if login is true
        <ButtonGroup>
          <Link as={RouterLink} to="/cart">
            <Button>Keranjang</Button>
          </Link>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
