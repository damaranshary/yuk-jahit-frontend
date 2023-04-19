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
    navigate("/search?query=" + searchValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin(false);
  };

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className="navbar">
        <Flex flexDirection="row" gap="4" p="4" justifyContent="center">
          <Link as={Link} href="/" mr="4">
            <Text fontSize="2xl" as="h1">
              YukJahit
            </Text>
          </Link>
          <form onSubmit={handleOnSubmit}>
            <InputGroup flex="1" maxW="4xl">
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
            <>
              <Link as={RouterLink} to="/cart">
                <Button> Cart</Button>
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
              <Link as={RouterLink} to="/profile">
                <Button>Profile</Button>
              </Link>
            </>
          )}
        </Flex>
      </nav>
    </section>
  );
};

export default Navbar;
