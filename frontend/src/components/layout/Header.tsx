import {
  Box,
  Container,
  Flex,
  Icon,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import store from "src/app/store";
import { useSelector } from "react-redux";
import { AuthState } from "src/interfaces";
import authApi from "src/features/auth/authApi";

const Header = () => {
  const { user } = useSelector((state: { auth: AuthState }) => state.auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();
  const sendLogout = async () => {
    try {
      await store.dispatch(authApi.endpoints.logout.initiate({})).unwrap();
      navigate("/", { replace: true });
    } catch (err: any) {
      // console.error(err.message);
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.lg" p={2}>
      <Flex
        justify="space-between"
        align="center"
        w="full"
        p={2}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing={1}
        >
          Organize Your Work & Life
        </Text>
        <Flex
          w={{ base: "full", md: "auto" }}
          justify={{ base: "space-between", md: "flex-end" }}
          align="center"
        >
          <Text
            fontSize="md"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing={1}
            mr={4}
            maxW="180px"
            isTruncated
            color={colorMode === "light" ? "gray.600" : "gray.400"}
          >
            {user?.name}
          </Text>

          <Flex justify="center" align="center">
            <Box
              p={3}
              borderRadius="full"
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              cursor="pointer"
            >
              <Icon
                as={colorMode === "light" ? MdDarkMode : MdLightMode}
                boxSize={7}
              />
            </Box>
            <Box
              p={3}
              borderRadius="full"
              aria-label="Logout"
              onClick={sendLogout}
              cursor="pointer"
            >
              <Icon as={CgLogOut} boxSize={7} colorScheme="purple" />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
