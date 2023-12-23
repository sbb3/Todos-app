import { Flex, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "src/components/layout/Header";
import useTitle from "src/hooks/useTitle";

const Layout = () => {
  useTitle("Todos");
  return (
    <Flex
      w={{ base: "full", sm: "460px", md: 780, lg: 980, xl: 1250 }}
      h="full"
      justify="center"
      align="start"
      p={2}
    >
      <Stack w="full" justify="start" align="center" spacing={2} p={2}>
        <Header />
        <Flex direction={"row"} w="full" justify="center" align="center" p={2}>
          <Outlet />
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Layout;
