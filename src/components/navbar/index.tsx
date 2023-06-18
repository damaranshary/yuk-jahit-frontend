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
  const [login, setLogin] = useState(false); // this is the state for the login status
  const [searchValue, setSearchValue] = useState(""); // this is the state for the search value
  const token = localStorage.getItem("token"); // this is the state for the token

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
      navigate("/products"); // the sites will go to products page if the search value is empty
    } else {
      navigate("/search?q=" + searchValue); // the sites will go to search page if the search value is not empty
    }
  };

  const handleLogout = () => {
    // this is the function to logout
    localStorage.removeItem("token"); // token will be removed from the local storage
    setLogin(false); // login status will be false
    navigate("/"); // the sites will go to home page
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
      <Link id="logo-link" as={RouterLink} to="/" mr="4">
        <Text as="h1" fontSize="2xl" fontWeight="bold" color="green.500">
          Yuk
          <Text as="span">Jahit</Text>
        </Text>
      </Link>
      <Box flex="1">
        {/*this is the search form*/}
        <form onSubmit={handleOnSubmit}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon />
            </InputLeftElement>
            <Input
              id="nav-search-input"
              placeholder="Cari sesuatu disini..."
              variant="outline"
              value={searchValue}
              onChange={handleOnChange}
            />
          </InputGroup>
        </form>
      </Box>
      {!login ? ( //the menu if login is false
        <ButtonGroup>
          <Button
            id="nav-login-button"
            as={RouterLink}
            variant="ghost"
            to="/login"
          >
            Masuk
          </Button>
          <Button
            id="nav-register-button"
            as={RouterLink}
            colorScheme="green"
            to="/register"
          >
            Daftar
          </Button>
        </ButtonGroup>
      ) : (
        // the menu if login is true
        <ButtonGroup>
          <Button
            id="nav-cart-button"
            as={RouterLink}
            to="/cart"
            variant="ghost"
            leftIcon={<FaShoppingCart />}
          >
            Keranjang
          </Button>
          <Menu>
            <MenuButton
              id="nav-account-button"
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
            >
              Akun
            </MenuButton>
            <MenuList>
              <MenuItem id="nav-profile-button" as={RouterLink} to="/profile">
                Profil
              </MenuItem>
              <MenuItem id="nav-order-button" as={RouterLink} to="/order">
                Pembelian
              </MenuItem>
              <MenuDivider />
              <MenuItem
                id="nav-logout-button"
                as={Button}
                onClick={handleLogout}
              >
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
